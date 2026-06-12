// Seed the CMS from the typed site content in src/data/* (the "single seam").
//
// These collections are the FALLBACK / default content. At runtime the dashboard
// overlays anything published to content/cms.json (see src/data/content.ts), and
// the live site reads the same overlay so published edits appear after a rebuild.

import { posts } from "@/data/posts";
import { portfolio } from "@/data/projects";
import { activities, founders, contributors, advisors, partners } from "@/data/team";
import type { Collection, CmsState, Item } from "./types";

// Bump when the seed shape changes so stale localStorage is replaced.
export const STORAGE_KEY = "avalook-cms-v3";

const blogPosts: Collection = {
  id: "blog-posts",
  name: "Blog Posts",
  itemNoun: "Post",
  fields: [
    { id: "title", name: "Title", type: "text", primary: true, required: true },
    { id: "cover", name: "Cover", type: "image" },
    { id: "date", name: "Date", type: "date" },
    { id: "readingTime", name: "Reading Time", type: "text" },
    { id: "excerpt", name: "Excerpt", type: "text" },
    { id: "body", name: "Body", type: "richcontent" },
    { id: "slug", name: "Slug", type: "text", helpText: "URL path for the post." },
  ],
  items: posts.map((p) => ({
    _id: p.slug,
    status: "published",
    title: p.title,
    cover: p.cover,
    date: p.date,
    readingTime: p.readingTime,
    excerpt: p.excerpt,
    body: p.body.join("\n\n"),
    slug: p.slug,
  })),
};

const projects: Collection = {
  id: "projects",
  name: "Projects",
  itemNoun: "Project",
  fields: [
    { id: "title", name: "Title", type: "text", primary: true, required: true },
    { id: "type", name: "Type", type: "text" },
    { id: "image", name: "Image", type: "image" },
    { id: "accent", name: "Accent", type: "color" },
    { id: "href", name: "Link", type: "url" },
  ],
  items: portfolio.map((c, i) => ({
    _id: c.href || `project-${i}`,
    status: "published",
    title: c.title,
    type: c.type,
    image: c.image || c.poster || "",
    accent: c.accent,
    href: c.href,
  })),
};

const activitiesCollection: Collection = {
  id: "activities",
  name: "Activities",
  itemNoun: "Activity",
  fields: [
    { id: "title", name: "Title", type: "text", primary: true },
    { id: "image", name: "Image", type: "image" },
    { id: "caption", name: "Caption", type: "text" },
  ],
  items: activities.map((src, i) => ({
    _id: `activity-${i + 1}`,
    status: "published",
    title: `Activity ${i + 1}`,
    image: src,
    caption: "",
  })),
};

const teamMembers: Item[] = [
  ...founders.map((p) => ({ ...p, group: "Founder" })),
  ...contributors.map((p) => ({ ...p, group: "Contributor" })),
  ...advisors.map((p) => ({ ...p, group: "Advisor" })),
].map((p, i) => ({
  _id: p.href && p.href.startsWith("/") ? p.href : `team-${i}`,
  status: "published",
  name: p.name,
  role: p.role,
  image: p.image,
  group: p.group,
  href: p.href,
}));

const team: Collection = {
  id: "team",
  name: "Team",
  itemNoun: "Member",
  fields: [
    { id: "name", name: "Name", type: "text", primary: true, required: true },
    { id: "role", name: "Role", type: "text" },
    { id: "image", name: "Photo", type: "image" },
    { id: "group", name: "Group", type: "text", helpText: "Founder / Contributor / Advisor" },
    { id: "href", name: "Profile Link", type: "url" },
  ],
  items: teamMembers,
};

const partnersCollection: Collection = {
  id: "partners",
  name: "Partners",
  itemNoun: "Partner",
  fields: [
    { id: "name", name: "Name", type: "text", primary: true, required: true },
    { id: "image", name: "Logo", type: "image" },
  ],
  items: partners.map((p, i) => ({
    _id: `partner-${i}`,
    status: "published",
    name: p.name,
    image: p.image,
  })),
};

export const seedState = (): CmsState => ({
  collections: [
    JSON.parse(JSON.stringify(blogPosts)),
    JSON.parse(JSON.stringify(projects)),
    JSON.parse(JSON.stringify(activitiesCollection)),
    JSON.parse(JSON.stringify(team)),
    JSON.parse(JSON.stringify(partnersCollection)),
  ],
  activeCollectionId: blogPosts.id,
});
