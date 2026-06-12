// Direct browser → Vercel Blob upload. The server mints a short-lived client
// token (auth-gated); the browser then PUTs the file straight to Blob storage,
// so large files (video) never hit the serverless body limit.

import { put } from "@vercel/blob/client";
import { blobUploadTokenFn } from "@/lib/cms-server";

/** Upload a file and return its public Blob URL. Throws on failure. */
export async function uploadToBlob(
  file: File,
  onProgress?: (pct: number) => void,
): Promise<string> {
  const res = await blobUploadTokenFn({ data: { pathname: file.name } });
  if (!res.ok) throw new Error(res.error);

  const blob = await put(file.name, file, {
    access: "public",
    token: res.clientToken,
    contentType: file.type || undefined,
    multipart: file.size > 8 * 1024 * 1024, // stream large files in parallel parts
    onUploadProgress: ({ percentage }) => onProgress?.(Math.round(percentage)),
  });
  return blob.url;
}
