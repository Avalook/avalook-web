// CMS dashboard data model.
//
// Mirrors the structure of a Wix-style collection manager: a collection has a
// list of typed fields and a list of items (rows). Everything is plain data so
// it can later be swapped for a real backend (see src/data/* "single seam").

import {
  Type,
  Pilcrow,
  FileText,
  Link2,
  Mail,
  Hash,
  Tags,
  ToggleLeft,
  Workflow,
  Layers,
  Palette,
  Image as ImageIcon,
  Calendar,
  type LucideIcon,
} from "lucide-react";

export type FieldType =
  | "text"
  | "richtext"
  | "richcontent"
  | "url"
  | "email"
  | "number"
  | "tags"
  | "boolean"
  | "reference"
  | "multireference"
  | "color"
  // media types — present in seed data, rendered in the table, but not offered
  // in the "Essentials" picker (kept faithful to the reference screenshots).
  | "image"
  | "date";

export type Field = {
  id: string;
  name: string;
  type: FieldType;
  required?: boolean;
  helpText?: string;
  /** For reference / multi-reference: the collection id this points at. */
  referencedCollection?: string;
  /** Default value applied to new items (types that support it). */
  defaultValue?: string;
  /** The primary (first) column — cannot be removed. */
  primary?: boolean;
};

export type Item = {
  /** Stable row id (slug for seeded content, generated for new rows). */
  _id: string;
  [fieldId: string]: unknown;
};

export type Collection = {
  id: string;
  name: string;
  /** Singular noun used in buttons ("Add Item" / labels). */
  itemNoun: string;
  fields: Field[];
  items: Item[];
};

export type CmsState = {
  collections: Collection[];
  activeCollectionId: string;
};

// ---------------------------------------------------------------------------
// Field-type catalogue — order + copy match the reference "Choose field type".
// ---------------------------------------------------------------------------
export type FieldTypeMeta = {
  type: FieldType;
  label: string;
  description: string;
  icon: LucideIcon;
};

/** The "Essentials" group shown in the Choose-field-type modal. */
export const ESSENTIAL_FIELD_TYPES: FieldTypeMeta[] = [
  { type: "text", label: "Text", description: "Titles, paragraph", icon: Type },
  { type: "richtext", label: "Rich text", description: "Text with formatting", icon: Pilcrow },
  {
    type: "richcontent",
    label: "Rich content",
    description: "Text with links and media",
    icon: FileText,
  },
  { type: "url", label: "URL", description: "Links", icon: Link2 },
  { type: "email", label: "Email", description: "Email addresses", icon: Mail },
  { type: "number", label: "Number", description: "ID, rating, order number", icon: Hash },
  { type: "tags", label: "Tags", description: "Tagging items, filters", icon: Tags },
  { type: "boolean", label: "Boolean", description: "Yes or no, true or false", icon: ToggleLeft },
  {
    type: "reference",
    label: "Reference",
    description: "Link to another collection",
    icon: Workflow,
  },
  {
    type: "multireference",
    label: "Multi-reference",
    description: "Link to multiple items in another collection",
    icon: Layers,
  },
  { type: "color", label: "Color", description: "Pick a HEX color", icon: Palette },
];

const MEDIA_META: Record<"image" | "date", FieldTypeMeta> = {
  image: { type: "image", label: "Image", description: "Photo / media", icon: ImageIcon },
  date: { type: "date", label: "Date", description: "Date", icon: Calendar },
};

const META_BY_TYPE: Record<FieldType, FieldTypeMeta> = {
  ...Object.fromEntries(ESSENTIAL_FIELD_TYPES.map((m) => [m.type, m])),
  image: MEDIA_META.image,
  date: MEDIA_META.date,
} as Record<FieldType, FieldTypeMeta>;

export const fieldMeta = (type: FieldType): FieldTypeMeta => META_BY_TYPE[type];

/** Field types that support default values (mirrors the reference notice). */
export const DEFAULT_VALUE_SUPPORTED: FieldType[] = [
  "text",
  "email",
  "image",
  "boolean",
  "number",
  "date",
  "color",
  "url",
  "tags",
  "richcontent",
];

export const supportsDefaultValue = (type: FieldType) => DEFAULT_VALUE_SUPPORTED.includes(type);
