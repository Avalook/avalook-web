// localStorage persistence — the temporary "backend" until the real CMS API
// lands. All access is guarded for SSR (no window on the server).

import type { CmsState } from "./types";
import { STORAGE_KEY, seedState } from "./seed";
import publishedRaw from "@/content/cms.json";

const published = publishedRaw as unknown as CmsState;

/** Last published content (baked at build) if any, else the static seed. */
const publishedOrSeed = (): CmsState =>
  published?.collections?.length ? JSON.parse(JSON.stringify(published)) : seedState();

export const loadState = (): CmsState => {
  if (typeof window === "undefined") return publishedOrSeed();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return publishedOrSeed();
    const parsed = JSON.parse(raw) as CmsState;
    if (!parsed?.collections?.length) return publishedOrSeed();
    return parsed;
  } catch {
    return publishedOrSeed();
  }
};

export const saveState = (state: CmsState) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* quota / private mode — ignore, state still lives in memory */
  }
};

export const clearState = () => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
};

/** Turn a title into a URL-safe slug, matching the existing post slugs. */
export const slugify = (input: string): string =>
  input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

let counter = 0;
/** Generate a unique-ish id for new fields / items (client-side only). */
export const uid = (prefix = "id"): string => {
  counter += 1;
  const rand = Math.random().toString(36).slice(2, 8);
  return `${prefix}-${Date.now().toString(36)}-${counter}-${rand}`;
};
