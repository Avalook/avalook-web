import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Plus,
  ChevronDown,
  ChevronRight,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Filter,
  X,
  Trash2,
  Pencil,
  Check,
  Image as ImageIcon,
  RotateCcw,
  Download,
  Database,
  UploadCloud,
  GripVertical,
  LogOut,
  ExternalLink,
  Copy,
} from "lucide-react";
import {
  fieldMeta,
  type CmsState,
  type Collection,
  type Field,
  type FieldType,
  type Item,
} from "./types";
import { loadState, saveState, clearState, uid } from "./storage";
import { seedState } from "./seed";
import { publishFn, logoutFn } from "@/lib/cms-server";
import { ChooseFieldTypeModal } from "./ChooseFieldTypeModal";
import { AddFieldModal } from "./AddFieldModal";
import { ItemEditorModal } from "./ItemEditorModal";

type StatusFilter = "all" | "published" | "draft";
const itemStatus = (it: Item): "draft" | "published" =>
  (it.status as string) === "draft" ? "draft" : "published";

/** The live URL an item maps to on the site (for the "view on site" preview). */
function previewUrl(collectionId: string, it: Item): string | null {
  const s = (v: unknown) => (v == null ? "" : String(v));
  if (collectionId === "blog-posts") return `/post/${s(it.slug) || it._id}/`;
  if (collectionId === "projects" || collectionId === "team") {
    const href = s(it.href);
    return href.startsWith("http") || href.startsWith("/") ? href : null;
  }
  return null;
}

const asString = (v: unknown): string =>
  v == null ? "" : Array.isArray(v) ? v.join(", ") : String(v);

export function CmsDashboard() {
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<CmsState>(() => seedState());

  // hydrate from localStorage after mount (avoids SSR/localStorage mismatch)
  useEffect(() => {
    const loaded = loadState();
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    // deep-link a collection: /dashboard#col-activities
    const col = hash.match(/^#col-(.+)$/);
    if (col && loaded.collections.some((c) => c.id === col[1])) {
      loaded.activeCollectionId = col[1];
    }
    setState(loaded);
    setMounted(true);
    // deep-links: /dashboard#new (write a post) · /dashboard#add-field
    if (hash === "#new") {
      setEditingItem(null);
      setEditorOpen(true);
    } else if (hash === "#add-field") {
      setChooseFieldOpen(true);
    }
  }, []);

  const update = (next: CmsState) => {
    setState(next);
    saveState(next);
  };

  const collection = useMemo(
    () => state.collections.find((c) => c.id === state.activeCollectionId) ?? state.collections[0],
    [state],
  );

  const navigate = useNavigate();

  // ---- UI state ----
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [publishing, setPublishing] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [openMenu, setOpenMenu] = useState<null | "more" | "collections" | string>(null); // string = field id
  const [chooseFieldOpen, setChooseFieldOpen] = useState(false);
  const [addFieldType, setAddFieldType] = useState<FieldType | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // row reorder ("move image position") — indices into the unfiltered list
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const flash = (msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  };

  // reset selection when switching collection
  useEffect(() => setSelected(new Set()), [state.activeCollectionId]);

  if (!mounted || !collection) {
    return (
      <div className="cms-app">
        <div className="cms-topbar">
          <span className="cms-topbar-brand">
            <span className="cms-dot">
              <Database size={13} />
            </span>
            CMS
          </span>
        </div>
        <div className="cms-scroll">
          <div className="cms-empty">Loading collection…</div>
        </div>
      </div>
    );
  }

  // ---- derived ----
  const items = collection.items.filter((it) => {
    if (statusFilter !== "all" && itemStatus(it) !== statusFilter) return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return collection.fields.some((f) => asString(it[f.id]).toLowerCase().includes(q));
  });
  const allChecked = items.length > 0 && items.every((it) => selected.has(it._id));
  // reordering only makes sense in the full, unfiltered list
  const canReorder = !query.trim() && statusFilter === "all";
  const draftCount = collection.items.filter((it) => itemStatus(it) === "draft").length;

  // ---- mutations ----
  const mutateCollection = (fn: (c: Collection) => Collection) => {
    update({
      ...state,
      collections: state.collections.map((c) => (c.id === collection.id ? fn(c) : c)),
    });
  };

  const handleSaveItem = (item: Item) => {
    mutateCollection((c) => {
      const exists = c.items.some((it) => it._id === item._id);
      return {
        ...c,
        items: exists ? c.items.map((it) => (it._id === item._id ? item : it)) : [item, ...c.items],
      };
    });
    setEditorOpen(false);
    flash(editingItem ? "Item saved" : "Item published");
  };

  const handleDeleteItem = (id: string) => {
    mutateCollection((c) => ({ ...c, items: c.items.filter((it) => it._id !== id) }));
    setSelected((prev) => {
      const n = new Set(prev);
      n.delete(id);
      return n;
    });
    flash("Item deleted");
  };

  const handleBulkDelete = () => {
    mutateCollection((c) => ({ ...c, items: c.items.filter((it) => !selected.has(it._id)) }));
    flash(`${selected.size} item(s) deleted`);
    setSelected(new Set());
  };

  const bulkStatus = (status: "published" | "draft") => {
    mutateCollection((c) => ({
      ...c,
      items: c.items.map((it) => (selected.has(it._id) ? { ...it, status } : it)),
    }));
    flash(`${selected.size} item → ${status === "draft" ? "Draft" : "Published"}`);
    setSelected(new Set());
  };

  // Move a row from one position to another and persist the new order.
  // For the Activities collection (one photo per row) this is "move image position".
  const moveItem = (from: number, to: number) => {
    if (from === to || to < 0 || to >= collection.items.length) return;
    mutateCollection((c) => {
      const next = [...c.items];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return { ...c, items: next };
    });
  };

  const handleDrop = () => {
    if (dragIndex !== null && overIndex !== null) moveItem(dragIndex, overIndex);
    setDragIndex(null);
    setOverIndex(null);
  };

  const handleAddField = (field: Field) => {
    mutateCollection((c) => ({ ...c, fields: [...c.fields, field] }));
    setAddFieldType(null);
    flash(`Field "${field.name}" added`);
  };

  const handleDeleteField = (fieldId: string) => {
    mutateCollection((c) => ({ ...c, fields: c.fields.filter((f) => f.id !== fieldId) }));
    setOpenMenu(null);
    flash("Field deleted");
  };

  const handleReset = () => {
    clearState();
    const fresh = seedState();
    setState(fresh);
    setOpenMenu(null);
    flash("Reset to seed content");
  };

  const handleExport = () => {
    const payload = JSON.stringify(collection.items, null, 2);
    if (typeof window !== "undefined") {
      const blob = new Blob([payload], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${collection.id}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
    setOpenMenu(null);
    flash("Collection exported as JSON");
  };

  const handlePublish = async () => {
    setPublishing(true);
    setOpenMenu(null);
    try {
      const res = await publishFn({ data: { state } });
      if (res.ok) flash("Đã publish lên GitHub — Vercel đang build lại site.");
      else flash(`Publish lỗi: ${res.error ?? "unknown"}`);
    } catch {
      flash("Publish lỗi: không gọi được máy chủ.");
    } finally {
      setPublishing(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutFn();
    } catch {
      /* ignore */
    }
    navigate({ to: "/login" });
  };

  const handleDuplicate = (item: Item) => {
    const copy: Item = { ...item, _id: uid("item"), status: "draft" };
    if (typeof copy.title === "string") copy.title = `${copy.title} (copy)`;
    if (typeof copy.name === "string") copy.name = `${copy.name} (copy)`;
    mutateCollection((c) => {
      const idx = c.items.findIndex((it) => it._id === item._id);
      const next = [...c.items];
      next.splice(idx < 0 ? c.items.length : idx + 1, 0, copy);
      return { ...c, items: next };
    });
    flash("Đã nhân bản (Draft)");
  };

  const toggleStatus = (item: Item) => {
    const next = itemStatus(item) === "draft" ? "published" : "draft";
    mutateCollection((c) => ({
      ...c,
      items: c.items.map((it) => (it._id === item._id ? { ...it, status: next } : it)),
    }));
    flash(next === "draft" ? "Chuyển sang Draft" : "Chuyển sang Published");
  };

  const toggleAll = () => {
    setSelected(allChecked ? new Set() : new Set(items.map((it) => it._id)));
  };
  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  };

  return (
    <div className="cms-app">
      {/* Top bar */}
      <div className="cms-topbar">
        <span className="cms-topbar-brand">
          <span className="cms-dot">
            <Database size={13} />
          </span>
          CMS
        </span>
        <div className="cms-topbar-actions">
          <span style={{ fontSize: 12 }}>Autosave on</span>
          <button
            className="cms-btn cms-btn-primary"
            style={{ padding: "7px 14px", fontSize: 13 }}
            onClick={handlePublish}
            disabled={publishing}
            title="Commit nội dung lên GitHub → Vercel build lại site"
          >
            <UploadCloud size={15} /> {publishing ? "Đang publish…" : "Publish to site"}
          </button>
          <button
            className="cms-iconbtn"
            onClick={handleLogout}
            aria-label="Đăng xuất"
            title="Đăng xuất"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>

      <div className="cms-scroll">
        <div className="cms-panel">
          {/* Breadcrumb */}
          <div className="cms-breadcrumb">
            <button className="cms-crumb-btn">CMS</button>
            <ChevronRight size={13} />
            <span className="cms-crumb-current">{collection.name}</span>
          </div>

          {/* Title + actions */}
          <div className="cms-titlerow">
            <h1 className="cms-title">
              {collection.name}
              <span style={{ position: "relative" }}>
                <button
                  className="cms-title-switch"
                  aria-label="Switch collection"
                  onClick={() => setOpenMenu(openMenu === "collections" ? null : "collections")}
                >
                  <ChevronDown size={20} />
                </button>
                {openMenu === "collections" && (
                  <div className="cms-menu" style={{ top: "100%", left: 0 }}>
                    <div className="cms-menu-label">Collections</div>
                    {state.collections.map((c) => (
                      <button
                        key={c.id}
                        className={c.id === collection.id ? "is-active" : ""}
                        onClick={() => {
                          update({ ...state, activeCollectionId: c.id });
                          setOpenMenu(null);
                        }}
                      >
                        <Database size={15} />
                        {c.name}
                        {c.id === collection.id && (
                          <Check size={15} style={{ marginLeft: "auto" }} />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </span>
            </h1>

            <div className="cms-header-actions">
              <span style={{ position: "relative" }}>
                <button
                  className="cms-btn cms-btn-outline"
                  onClick={() => setOpenMenu(openMenu === "more" ? null : "more")}
                >
                  More Actions <ChevronDown size={15} />
                </button>
                {openMenu === "more" && (
                  <div className="cms-menu" style={{ top: "100%", right: 0 }}>
                    <button onClick={handleExport}>
                      <Download size={15} /> Export collection (JSON)
                    </button>
                    <div className="cms-menu-sep" />
                    <button className="is-danger" onClick={handleReset}>
                      <RotateCcw size={15} /> Reset to seed content
                    </button>
                  </div>
                )}
              </span>
              <button
                className="cms-btn cms-btn-primary"
                onClick={() => {
                  setEditingItem(null);
                  setEditorOpen(true);
                }}
              >
                <Plus size={16} /> Add Item
              </button>
            </div>
          </div>

          {/* View bar */}
          <div className="cms-viewbar">
            <div className="cms-viewchip">
              <strong>Default view</strong>
              <span>{collection.items.length} items</span>
            </div>
            <button className="cms-link">
              <Plus size={14} /> New View
            </button>
          </div>

          {/* Toolbar */}
          <div className="cms-toolbar">
            <div className="cms-toolbar-left">
              <span className="cms-view-name">Default view</span>
              {(["all", "published", "draft"] as const).map((f) => (
                <button
                  key={f}
                  className={`cms-link${statusFilter === f ? "" : " is-muted"}`}
                  onClick={() => setStatusFilter(f)}
                >
                  {f === "all" ? "All" : f === "published" ? "Published" : "Draft"}
                  {f === "draft" && draftCount > 0 ? ` (${draftCount})` : ""}
                </button>
              ))}
              {selected.size > 0 && (
                <>
                  <button className="cms-link" onClick={() => bulkStatus("published")}>
                    <Check size={14} /> Publish ({selected.size})
                  </button>
                  <button className="cms-link" onClick={() => bulkStatus("draft")}>
                    <RotateCcw size={14} /> Draft ({selected.size})
                  </button>
                  <button
                    className="cms-link"
                    style={{ color: "#d23a3a" }}
                    onClick={handleBulkDelete}
                  >
                    <Trash2 size={14} /> Delete ({selected.size})
                  </button>
                </>
              )}
            </div>
            <div className="cms-toolbar-right">
              <button className="cms-link" onClick={() => setChooseFieldOpen(true)}>
                <SlidersHorizontal size={14} /> Manage Fields
              </button>
              <button className="cms-link is-muted">
                <ArrowUpDown size={14} /> Sort
              </button>
              <button className="cms-link is-muted">
                <Filter size={14} /> Filter
              </button>
              <button
                className="cms-link"
                onClick={() => flash("Order applied to site")}
                title="Publish the current item order to the live site"
              >
                <UploadCloud size={14} /> Apply Order to Site
              </button>
              <span className="cms-search">
                <Search size={15} />
                <input
                  placeholder="Search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </span>
            </div>
          </div>

          {/* Table */}
          <div className="cms-tablewrap">
            <table className="cms-table">
              <thead>
                <tr>
                  <th className="cms-col-grip" aria-hidden />
                  <th className="cms-col-check">
                    <input
                      type="checkbox"
                      checked={allChecked}
                      onChange={toggleAll}
                      aria-label="Select all"
                    />
                  </th>
                  {collection.fields.map((f) => {
                    const meta = fieldMeta(f.type);
                    const Icon = meta.icon;
                    return (
                      <th key={f.id}>
                        <span
                          style={{
                            position: "relative",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 7,
                          }}
                        >
                          <span className={`cms-th-field${f.primary ? " cms-th-primary" : ""}`}>
                            <Icon size={14} />
                            {f.name}
                          </span>
                          {!f.primary && (
                            <button
                              className="cms-rowbtn"
                              style={{ width: 22, height: 22 }}
                              onClick={() => setOpenMenu(openMenu === f.id ? null : f.id)}
                              aria-label={`${f.name} options`}
                            >
                              <ChevronDown size={13} />
                            </button>
                          )}
                          {openMenu === f.id && (
                            <div
                              className="cms-menu"
                              style={{ top: "100%", left: 0, minWidth: 180 }}
                            >
                              <div className="cms-menu-label">{meta.label} field</div>
                              <button className="is-danger" onClick={() => handleDeleteField(f.id)}>
                                <Trash2 size={15} /> Delete field
                              </button>
                            </div>
                          )}
                        </span>
                      </th>
                    );
                  })}
                  <th className="cms-addfield-th">
                    <button className="cms-addfield-btn" onClick={() => setChooseFieldOpen(true)}>
                      <Plus size={14} /> Add Field
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 && (
                  <tr>
                    <td colSpan={collection.fields.length + 3} className="cms-empty">
                      {query ? "No items match your search." : "No items yet — click “Add Item”."}
                    </td>
                  </tr>
                )}
                {items.map((it, idx) => (
                  <tr
                    key={it._id}
                    className={`${selected.has(it._id) ? "is-selected" : ""}${
                      dragIndex === idx ? " cms-row-dragging" : ""
                    }${overIndex === idx && dragIndex !== null && dragIndex !== idx ? " cms-row-over" : ""}`}
                    onDoubleClick={() => {
                      setEditingItem(it);
                      setEditorOpen(true);
                    }}
                    onDragOver={
                      canReorder
                        ? (e) => {
                            e.preventDefault();
                            if (overIndex !== idx) setOverIndex(idx);
                          }
                        : undefined
                    }
                    onDrop={canReorder ? handleDrop : undefined}
                  >
                    <td className="cms-col-grip">
                      {canReorder && (
                        <span
                          className="cms-grip"
                          draggable
                          title="Drag to reorder"
                          aria-label={`Drag row ${idx + 1} to reorder`}
                          onDragStart={() => setDragIndex(idx)}
                          onDragEnd={() => {
                            setDragIndex(null);
                            setOverIndex(null);
                          }}
                        >
                          <GripVertical size={15} />
                        </span>
                      )}
                    </td>
                    <td className="cms-col-check">
                      <input
                        type="checkbox"
                        checked={selected.has(it._id)}
                        onChange={() => toggleOne(it._id)}
                        aria-label={`Select row ${idx + 1}`}
                      />
                    </td>
                    {collection.fields.map((f, fi) => (
                      <td key={f.id}>
                        {f.primary && itemStatus(it) === "draft" && (
                          <span className="cms-status is-draft" style={{ marginRight: 8 }}>
                            <span className="cms-status-dot" /> Draft
                          </span>
                        )}
                        <Cell field={f} value={it[f.id]} collections={state.collections} />
                        {fi === collection.fields.length - 1 && (
                          <span className="cms-rowactions" style={{ marginLeft: 10 }}>
                            {canReorder && (
                              <>
                                <button
                                  className="cms-rowbtn"
                                  aria-label="Move up"
                                  disabled={idx === 0}
                                  onClick={() => moveItem(idx, idx - 1)}
                                >
                                  <ArrowUp size={14} />
                                </button>
                                <button
                                  className="cms-rowbtn"
                                  aria-label="Move down"
                                  disabled={idx === items.length - 1}
                                  onClick={() => moveItem(idx, idx + 1)}
                                >
                                  <ArrowDown size={14} />
                                </button>
                              </>
                            )}
                            {previewUrl(collection.id, it) && (
                              <a
                                className="cms-rowbtn"
                                aria-label="Xem trên site"
                                title="Xem trên site"
                                href={previewUrl(collection.id, it) ?? "#"}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <ExternalLink size={14} />
                              </a>
                            )}
                            <button
                              className="cms-rowbtn"
                              aria-label="Đổi Draft/Published"
                              title={itemStatus(it) === "draft" ? "Đăng (Publish)" : "Ẩn (Draft)"}
                              onClick={() => toggleStatus(it)}
                            >
                              {itemStatus(it) === "draft" ? (
                                <Check size={14} />
                              ) : (
                                <RotateCcw size={14} />
                              )}
                            </button>
                            <button
                              className="cms-rowbtn"
                              aria-label="Nhân bản"
                              title="Nhân bản"
                              onClick={() => handleDuplicate(it)}
                            >
                              <Copy size={14} />
                            </button>
                            <button
                              className="cms-rowbtn"
                              aria-label="Edit"
                              onClick={() => {
                                setEditingItem(it);
                                setEditorOpen(true);
                              }}
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              className="cms-rowbtn is-danger"
                              aria-label="Delete"
                              onClick={() => handleDeleteItem(it._id)}
                            >
                              <Trash2 size={14} />
                            </button>
                          </span>
                        )}
                      </td>
                    ))}
                    <td />
                  </tr>
                ))}
                <tr className="cms-additem-row">
                  <td colSpan={collection.fields.length + 3}>
                    <button
                      className="cms-additem-btn"
                      onClick={() => {
                        setEditingItem(null);
                        setEditorOpen(true);
                      }}
                    >
                      <Plus size={15} /> Add Item
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* click-away backdrop for menus */}
      {openMenu && (
        <button
          aria-hidden
          onClick={() => setOpenMenu(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 30,
            background: "transparent",
            border: "none",
            cursor: "default",
          }}
        />
      )}

      {/* Modals */}
      {chooseFieldOpen && (
        <ChooseFieldTypeModal
          onCancel={() => setChooseFieldOpen(false)}
          onChoose={(type) => {
            setChooseFieldOpen(false);
            setAddFieldType(type);
          }}
        />
      )}
      {addFieldType && (
        <AddFieldModal
          fieldType={addFieldType}
          collections={state.collections}
          activeCollectionId={collection.id}
          onBack={() => {
            setAddFieldType(null);
            setChooseFieldOpen(true);
          }}
          onCancel={() => setAddFieldType(null)}
          onSave={handleAddField}
        />
      )}
      {editorOpen && (
        <ItemEditorModal
          collection={collection}
          collections={state.collections}
          item={editingItem}
          onCancel={() => setEditorOpen(false)}
          onSave={handleSaveItem}
        />
      )}

      {toast && (
        <div className="cms-toast">
          <Check size={15} /> {toast}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
function Cell({
  field,
  value,
  collections,
}: {
  field: Field;
  value: unknown;
  collections: Collection[];
}) {
  switch (field.type) {
    case "image":
      return asString(value) ? (
        <img className="cms-thumb" src={asString(value)} alt="" loading="lazy" />
      ) : (
        <span className="cms-thumb cms-thumb-empty">
          <ImageIcon size={16} />
        </span>
      );

    case "color":
      return asString(value) ? (
        <span className="cms-swatch">
          <i style={{ background: asString(value) }} />
          <span className="cms-cell-muted">{asString(value)}</span>
        </span>
      ) : (
        <span className="cms-cell-muted">—</span>
      );

    case "boolean":
      return (
        <span className="cms-bool" style={{ color: value ? "#1a9c5b" : "#98a0b0" }}>
          {value ? "True" : "False"}
        </span>
      );

    case "tags": {
      const tags = Array.isArray(value) ? value : asString(value) ? asString(value).split(",") : [];
      return tags.length ? (
        <>
          {tags.slice(0, 3).map((t, i) => (
            <span className="cms-tag" key={i}>
              {String(t).trim()}
            </span>
          ))}
          {tags.length > 3 && <span className="cms-cell-muted">+{tags.length - 3}</span>}
        </>
      ) : (
        <span className="cms-cell-muted">—</span>
      );
    }

    case "url":
      return asString(value) ? (
        <span className="cms-cell-clip cms-link-cell">{asString(value)}</span>
      ) : (
        <span className="cms-cell-muted">—</span>
      );

    case "reference": {
      const target = collections.find((c) => c.id === field.referencedCollection);
      const ref = target?.items.find((it) => it._id === asString(value));
      const pid = target?.fields.find((f) => f.primary)?.id ?? "title";
      return ref ? (
        <span className="cms-cell-clip">{asString(ref[pid])}</span>
      ) : (
        <span className="cms-cell-muted">—</span>
      );
    }

    case "multireference": {
      const arr = Array.isArray(value) ? value : [];
      return arr.length ? (
        <span className="cms-cell-muted">{arr.length} linked</span>
      ) : (
        <span className="cms-cell-muted">—</span>
      );
    }

    default: {
      const text = asString(value);
      if (!text) return <span className="cms-cell-muted">—</span>;
      return (
        <span className={`cms-cell-clip${field.primary ? " cms-cell-primary" : ""}`}>{text}</span>
      );
    }
  }
}
