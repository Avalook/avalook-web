/* eslint-disable react-hooks/rules-of-hooks -- useSession is a TanStack server util, not a React hook */
// Server-side CMS actions: password auth (sealed session cookie) + git-based
// publish (commits the CMS state to src/content/cms.json on GitHub, which
// triggers a Vercel rebuild so the live site picks up the new content).
//
// Required env vars (set in Vercel → Project → Settings → Environment Variables):
//   DASHBOARD_PASSWORD  the login password
//   SESSION_SECRET      ≥32 random chars used to encrypt the session cookie
//   GITHUB_TOKEN        a fine-grained PAT with "Contents: read & write" on the repo
//   GITHUB_REPO         e.g. "Avalook/avalook-web" (optional, defaults to this repo)
//   GITHUB_BRANCH       e.g. "main" (optional, defaults to "main")

import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { generateClientTokenFromReadWriteToken } from "@vercel/blob/client";
import type { CmsState } from "@/components/cms/types";

type SessionData = { authed?: boolean };

const SESSION_PASSWORD = (
  process.env.SESSION_SECRET ?? "avalook-cms-dev-session-secret-change-me"
).padEnd(32, "x");

function cmsSession() {
  return useSession<SessionData>({ name: "avalook_cms", password: SESSION_PASSWORD });
}

export const getSessionFn = createServerFn().handler(async () => {
  const session = await cmsSession();
  return { authed: Boolean(session.data.authed) };
});

export const loginFn = createServerFn({ method: "POST" })
  .validator((d: { password: string }) => d)
  .handler(async ({ data }) => {
    const expected = process.env.DASHBOARD_PASSWORD ?? "";
    if (!expected) {
      return { ok: false as const, error: "Server chưa cấu hình DASHBOARD_PASSWORD." };
    }
    if (data.password !== expected) {
      return { ok: false as const, error: "Sai mật khẩu." };
    }
    const session = await cmsSession();
    await session.update({ authed: true });
    return { ok: true as const };
  });

export const logoutFn = createServerFn({ method: "POST" }).handler(async () => {
  const session = await cmsSession();
  await session.clear();
  return { ok: true as const };
});

// Content types accepted for direct uploads (images + common web video).
const UPLOAD_CONTENT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/avif",
  "image/svg+xml",
  "video/mp4",
  "video/webm",
  "video/quicktime",
];

// Mint a short-lived client token so the browser can upload a file straight to
// Vercel Blob (bypassing the 4.5 MB serverless body limit — needed for video).
// Requires BLOB_READ_WRITE_TOKEN (Vercel → Storage → Blob → connect to project).
export const blobUploadTokenFn = createServerFn({ method: "POST" })
  .validator((d: { pathname: string }) => d)
  .handler(async ({ data }) => {
    const session = await cmsSession();
    if (!session.data.authed) {
      return { ok: false as const, error: "Chưa đăng nhập." };
    }
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      return { ok: false as const, error: "Server chưa cấu hình BLOB_READ_WRITE_TOKEN." };
    }
    try {
      const clientToken = await generateClientTokenFromReadWriteToken({
        token,
        pathname: data.pathname,
        addRandomSuffix: true,
        allowedContentTypes: UPLOAD_CONTENT_TYPES,
        maximumSizeInBytes: 1024 * 1024 * 1024, // 1 GB ceiling
        validUntil: Date.now() + 60 * 60 * 1000, // 1h — long enough for big videos
      });
      return { ok: true as const, clientToken };
    } catch (e) {
      return {
        ok: false as const,
        error: `Không tạo được token upload: ${String(e).slice(0, 200)}`,
      };
    }
  });

export const publishFn = createServerFn({ method: "POST" })
  .validator((d: { state: CmsState }) => d)
  .handler(async ({ data }) => {
    const session = await cmsSession();
    if (!session.data.authed) {
      return { ok: false as const, error: "Chưa đăng nhập." };
    }
    return commitContentToGitHub(data.state);
  });

// ---------------------------------------------------------------------------
function base64Utf8(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}

async function commitContentToGitHub(state: CmsState) {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO ?? "Avalook/avalook-web";
  const branch = process.env.GITHUB_BRANCH ?? "main";
  const path = "src/content/cms.json";

  if (!token) {
    return { ok: false as const, error: "Server chưa cấu hình GITHUB_TOKEN." };
  }

  const apiBase = `https://api.github.com/repos/${repo}/contents/${path}`;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "avalook-cms",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  // Look up the current file SHA (required to update an existing file).
  let sha: string | undefined;
  try {
    const getRes = await fetch(`${apiBase}?ref=${encodeURIComponent(branch)}`, { headers });
    if (getRes.ok) {
      const current = (await getRes.json()) as { sha?: string };
      sha = current.sha;
    }
  } catch {
    /* first publish — file may not exist yet */
  }

  const body = JSON.stringify({
    message: `chore(cms): publish content`,
    content: base64Utf8(JSON.stringify(state, null, 2)),
    branch,
    ...(sha ? { sha } : {}),
  });

  const putRes = await fetch(apiBase, {
    method: "PUT",
    headers: { ...headers, "Content-Type": "application/json" },
    body,
  });

  if (!putRes.ok) {
    const text = await putRes.text();
    return { ok: false as const, error: `GitHub API ${putRes.status}: ${text.slice(0, 300)}` };
  }

  const result = (await putRes.json()) as { commit?: { html_url?: string } };
  return { ok: true as const, commit: result.commit?.html_url };
}
