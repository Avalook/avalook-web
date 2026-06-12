// Live content overlay — the bridge between the CMS dashboard and the site.
//
// The dashboard publishes the full CMS state to src/content/cms.json (committed
// to GitHub via the publish server function). At build time this module overlays
// that published content on top of the static src/data/* defaults, so the live
// site reflects dashboard edits after each Vercel rebuild. When cms.json is empty
// (nothing published yet) every export falls back to the original static data.

import { posts as staticPosts, postsBySlug as staticPostsBySlug, type Post } from "./posts";
import {
  portfolio as staticPortfolio,
  projectsBySlug,
  type PortfolioCard,
  type ProjectDetail,
} from "./projects";
import {
  founders as staticFounders,
  contributors as staticContributors,
  advisors as staticAdvisors,
  partners as staticPartners,
  activities as staticActivities,
  ACTIVITIES_VISIBLE,
  achievementsFeatured,
  achievementsCompact,
  type Person,
  type Partner,
} from "./team";
import cmsRaw from "@/content/cms.json";
import type { CmsState, Collection, Item } from "@/components/cms/types";

const cms = cmsRaw as unknown as CmsState;

const col = (id: string): Collection | undefined => cms.collections?.find((c) => c.id === id);
/** Published items only (a "draft" status hides an item from the live site). */
const live = (c?: Collection): Item[] =>
  (c?.items ?? []).filter((it) => (it.status ?? "published") !== "draft");
const s = (v: unknown): string => (v == null ? "" : String(v));

// ---- Blog posts -----------------------------------------------------------
const cmsPosts = col("blog-posts");
export const posts: Post[] = cmsPosts
  ? live(cmsPosts).map((it) => ({
      slug: s(it.slug) || it._id,
      title: s(it.title),
      excerpt: s(it.excerpt),
      date: s(it.date),
      readingTime: s(it.readingTime),
      cover: s(it.cover),
      body: s(it.body)
        .split(/\n\n+/)
        .map((p) => p.trim())
        .filter(Boolean),
    }))
  : staticPosts;
export const postsBySlug: Record<string, Post> = cmsPosts
  ? Object.fromEntries(posts.map((p) => [p.slug, p]))
  : staticPostsBySlug;

// ---- Portfolio cards ------------------------------------------------------
const cmsProjects = col("projects");
export const portfolio: PortfolioCard[] = cmsProjects
  ? live(cmsProjects).map((it) => ({
      title: s(it.title),
      type: s(it.type),
      accent: s(it.accent) || "#116dff",
      href: s(it.href),
      image: s(it.image) || undefined,
    }))
  : staticPortfolio;

// ---- Activities gallery ---------------------------------------------------
const cmsActivities = col("activities");
export const activities: string[] = cmsActivities
  ? live(cmsActivities)
      .map((it) => s(it.image))
      .filter(Boolean)
  : staticActivities;

// ---- Team -----------------------------------------------------------------
const cmsTeam = col("team");
const toPerson = (it: Item): Person => ({
  name: s(it.name),
  role: s(it.role),
  image: s(it.image),
  href: s(it.href),
});
const group = (g: string): Person[] =>
  live(cmsTeam)
    .filter((it) => s(it.group) === g)
    .map(toPerson);
export const founders: Person[] = cmsTeam ? group("Founder") : staticFounders;
export const contributors: Person[] = cmsTeam ? group("Contributor") : staticContributors;
export const advisors: Person[] = cmsTeam ? group("Advisor") : staticAdvisors;

// ---- Partners -------------------------------------------------------------
const cmsPartners = col("partners");
export const partners: Partner[] = cmsPartners
  ? live(cmsPartners).map((it) => ({ name: s(it.name), image: s(it.image) }))
  : staticPartners;

// ---- Pass-through (not CMS-managed yet) -----------------------------------
export { projectsBySlug, ACTIVITIES_VISIBLE, achievementsFeatured, achievementsCompact };
export type { Post, PortfolioCard, ProjectDetail, Person, Partner };
