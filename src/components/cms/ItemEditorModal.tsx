import { useMemo, useState } from "react";
import { X, ImageOff } from "lucide-react";
import type { Collection, Field, Item } from "./types";
import { slugify, uid } from "./storage";
import { RichTextEditor } from "./RichTextEditor";
import { MediaUpload } from "./MediaUpload";
import { isVideoUrl } from "@/lib/media";

type Props = {
  collection: Collection;
  collections: Collection[];
  /** null → creating a new item. */
  item: Item | null;
  onCancel: () => void;
  onSave: (item: Item) => void;
};

const asString = (v: unknown): string =>
  v == null ? "" : Array.isArray(v) ? v.join(", ") : String(v);

/** Create / edit an item — the "up bài viết" flow for the Blog Posts collection. */
export function ItemEditorModal({ collection, collections, item, onCancel, onSave }: Props) {
  const isNew = item == null;
  const hasSlug = collection.fields.some((f) => f.id === "slug");
  const hasTitle = collection.fields.some((f) => f.id === "title");

  const initial = useMemo<Record<string, unknown>>(() => {
    const base: Record<string, unknown> = {};
    for (const f of collection.fields) {
      base[f.id] = item?.[f.id] ?? f.defaultValue ?? (f.type === "boolean" ? false : "");
    }
    return base;
  }, [collection.fields, item]);

  const [values, setValues] = useState<Record<string, unknown>>(initial);
  // auto-derive slug from title until the user edits the slug themselves
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [status, setStatus] = useState<"published" | "draft">(
    (item?.status as string) === "draft" ? "draft" : "published",
  );
  const [error, setError] = useState<string | null>(null);

  const set = (id: string, value: unknown) => {
    setValues((prev) => {
      const next = { ...prev, [id]: value };
      if (id === "title" && hasSlug && hasTitle && !slugTouched) {
        next.slug = slugify(String(value));
      }
      return next;
    });
  };

  const handleSave = () => {
    // required-field validation
    for (const f of collection.fields) {
      if (f.required && asString(values[f.id]).trim() === "") {
        setError(`"${f.name}" is required.`);
        return;
      }
    }
    const slugVal = asString(values.slug).trim();
    const _id = item?._id ?? (slugVal || uid("item"));
    onSave({ ...values, _id, status } as Item);
  };

  return (
    <div className="cms-overlay" onMouseDown={onCancel}>
      <div
        className="cms-modal is-wide"
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="cms-modal-head">
          <div>
            <h2>{isNew ? `Add ${collection.itemNoun}` : `Edit ${collection.itemNoun}`}</h2>
            <p>{collection.name}</p>
          </div>
          <button className="cms-iconbtn" onClick={onCancel} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="cms-modal-body">
          <div className="cms-field">
            <label className="cms-field-label">Trạng thái</label>
            <div className="cms-toggle-row">
              <button
                type="button"
                className={`cms-toggle${status === "published" ? " is-on" : ""}`}
                aria-pressed={status === "published"}
                onClick={() => setStatus((s) => (s === "published" ? "draft" : "published"))}
              />
              <span className="cms-toggle-label">
                {status === "published" ? "Published — hiển thị trên site" : "Draft — ẩn khỏi site"}
              </span>
            </div>
          </div>
          {collection.fields.map((f) => (
            <div className="cms-field" key={f.id}>
              <label className="cms-field-label" htmlFor={`f-${f.id}`}>
                {f.name}
                {f.required && <span className="req">*</span>}
              </label>
              <FieldEditor
                field={f}
                value={values[f.id]}
                collections={collections}
                onChange={(v) => {
                  if (f.id === "slug") setSlugTouched(true);
                  set(f.id, v);
                }}
              />
              {f.helpText && <p className="cms-help">{f.helpText}</p>}
            </div>
          ))}
        </div>

        <div className="cms-modal-foot">
          {error && (
            <span className="cms-foot-left" style={{ color: "#d23a3a", fontSize: 13 }}>
              {error}
            </span>
          )}
          <button className="cms-btn cms-btn-outline" onClick={onCancel}>
            Cancel
          </button>
          <button className="cms-btn cms-btn-primary" onClick={handleSave}>
            {isNew ? "Publish" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

function FieldEditor({
  field,
  value,
  collections,
  onChange,
}: {
  field: Field;
  value: unknown;
  collections: Collection[];
  onChange: (v: unknown) => void;
}) {
  const id = `f-${field.id}`;

  switch (field.type) {
    case "richtext":
    case "richcontent":
      return <RichTextEditor value={asString(value)} onChange={onChange} />;

    case "number":
      return (
        <input
          id={id}
          type="number"
          className="cms-input"
          value={asString(value)}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "email":
      return (
        <input
          id={id}
          type="email"
          className="cms-input"
          value={asString(value)}
          placeholder="name@example.com"
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "url":
      return (
        <input
          id={id}
          type="url"
          className="cms-input"
          value={asString(value)}
          placeholder="/projects/… or https://…"
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "date":
      return (
        <input
          id={id}
          className="cms-input"
          value={asString(value)}
          placeholder="e.g. May 7, 2025"
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "boolean":
      return (
        <div className="cms-toggle-row">
          <button
            type="button"
            className={`cms-toggle${value ? " is-on" : ""}`}
            aria-pressed={!!value}
            onClick={() => onChange(!value)}
          />
          <span className="cms-toggle-label">{value ? "True" : "False"}</span>
        </div>
      );

    case "color":
      return (
        <div className="cms-input-icon">
          <input
            type="color"
            value={/^#?[0-9a-fA-F]{6}$/.test(asString(value)) ? asString(value) : "#116dff"}
            style={{ width: 28, height: 28, padding: 0, border: "none", background: "none" }}
            onChange={(e) => onChange(e.target.value)}
            aria-label={`${field.name} color`}
          />
          <input
            id={id}
            value={asString(value)}
            placeholder="#000000"
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      );

    case "tags":
      return (
        <input
          id={id}
          className="cms-input"
          value={asString(value)}
          placeholder="Comma separated, e.g. NFT, event"
          onChange={(e) =>
            onChange(
              e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
            )
          }
        />
      );

    case "image": {
      const val = asString(value);
      const isVideo = isVideoUrl(val);
      return (
        <div className="cms-img-edit">
          {val ? (
            isVideo ? (
              <video className="cms-img-preview" src={val} muted playsInline />
            ) : (
              <img className="cms-img-preview" src={val} alt="" />
            )
          ) : (
            <span className="cms-img-preview cms-thumb-empty">
              <ImageOff size={20} />
            </span>
          )}
          <div className="cms-img-edit-main">
            <input
              id={id}
              className="cms-input"
              value={val}
              placeholder="Tải lên, hoặc dán /assets/img/cover.jpg hay https://…"
              onChange={(e) => onChange(e.target.value)}
            />
            <MediaUpload
              accept="image/*,video/*"
              label="Tải ảnh / video lên"
              onUploaded={onChange}
            />
          </div>
        </div>
      );
    }

    case "reference": {
      const target = collections.find((c) => c.id === field.referencedCollection);
      const opts = target?.items ?? [];
      const primaryId = target?.fields.find((f) => f.primary)?.id ?? "title";
      return (
        <select
          id={id}
          className="cms-select"
          value={asString(value)}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">— none —</option>
          {opts.map((it) => (
            <option key={it._id} value={it._id}>
              {asString(it[primaryId]) || it._id}
            </option>
          ))}
        </select>
      );
    }

    case "multireference": {
      const target = collections.find((c) => c.id === field.referencedCollection);
      const opts = target?.items ?? [];
      const primaryId = target?.fields.find((f) => f.primary)?.id ?? "title";
      const selected = Array.isArray(value) ? (value as string[]) : [];
      return (
        <select
          id={id}
          className="cms-select"
          multiple
          size={Math.min(5, Math.max(3, opts.length))}
          value={selected}
          onChange={(e) => onChange(Array.from(e.target.selectedOptions).map((o) => o.value))}
        >
          {opts.map((it) => (
            <option key={it._id} value={it._id}>
              {asString(it[primaryId]) || it._id}
            </option>
          ))}
        </select>
      );
    }

    default:
      return (
        <input
          id={id}
          className="cms-input"
          value={asString(value)}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
}
