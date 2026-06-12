// Direct browser → Vercel Blob upload. The server mints a short-lived client
// token (auth-gated); the browser then PUTs the file straight to Blob storage,
// so large files (video) never hit the serverless body limit.

import { put } from "@vercel/blob/client";
import { blobUploadTokenFn } from "@/lib/cms-server";

/**
 * Make an upload pathname HTTP-safe. Vercel Blob drops the pathname straight
 * into the request URL, and fetch() rejects spaces / non-ASCII ("Invalid
 * value"), so Vietnamese filenames must be slugified first. addRandomSuffix
 * (server side) keeps the final name unique, so collisions aren't a concern.
 */
function safePathname(name: string): string {
  const dot = name.lastIndexOf(".");
  const hasExt = dot > 0 && dot < name.length - 1;
  const base = hasExt ? name.slice(0, dot) : name;
  const ext = hasExt ? name.slice(dot + 1) : "";
  const clean = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "") // strip diacritics (á → a)
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-zA-Z0-9._-]+/g, "-") // spaces / symbols → hyphen
      .replace(/-+/g, "-")
      .replace(/^[-.]+|[-.]+$/g, "");
  const safeBase = clean(base).toLowerCase() || "file";
  const safeExt = ext.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  return safeExt ? `${safeBase}.${safeExt}` : safeBase;
}

/** Upload a file and return its public Blob URL. Throws on failure. */
export async function uploadToBlob(
  file: File,
  onProgress?: (pct: number) => void,
): Promise<string> {
  const pathname = safePathname(file.name);
  const res = await blobUploadTokenFn({ data: { pathname } });
  if (!res.ok) throw new Error(res.error);

  const blob = await put(pathname, file, {
    access: "public",
    token: res.clientToken,
    contentType: file.type || undefined,
    multipart: file.size > 8 * 1024 * 1024, // stream large files in parallel parts
    onUploadProgress: ({ percentage }) => onProgress?.(Math.round(percentage)),
  });
  return blob.url;
}
