import { useState } from "react";
import { X, Info } from "lucide-react";
import {
  fieldMeta,
  supportsDefaultValue,
  type Collection,
  type Field,
  type FieldType,
} from "./types";
import { uid } from "./storage";

type Tab = "settings" | "validations" | "default";

type Props = {
  fieldType: FieldType;
  collections: Collection[];
  /** Exclude the active collection from the reference picker. */
  activeCollectionId: string;
  onBack: () => void;
  onCancel: () => void;
  onSave: (field: Field) => void;
};

/** Step 2 of "Add Field" — configure the field (Settings / Validations / Default). */
export function AddFieldModal({
  fieldType,
  collections,
  activeCollectionId,
  onBack,
  onCancel,
  onSave,
}: Props) {
  const meta = fieldMeta(fieldType);
  const Icon = meta.icon;
  const isReference = fieldType === "reference" || fieldType === "multireference";
  const refOptions = collections.filter((c) => c.id !== activeCollectionId);

  const [tab, setTab] = useState<Tab>("settings");
  const [name, setName] = useState(meta.label);
  const [helpText, setHelpText] = useState("");
  const [required, setRequired] = useState(false);
  const [referencedCollection, setReferencedCollection] = useState(
    isReference ? (refOptions[0]?.id ?? "") : "",
  );
  const [defaultValue, setDefaultValue] = useState("");

  const canSave = name.trim().length > 0 && (!isReference || referencedCollection);

  const handleSave = () => {
    if (!canSave) return;
    onSave({
      id: uid("field"),
      name: name.trim(),
      type: fieldType,
      required: required || undefined,
      helpText: helpText.trim() || undefined,
      referencedCollection: isReference ? referencedCollection : undefined,
      defaultValue: defaultValue.trim() || undefined,
    });
  };

  return (
    <div className="cms-overlay" onMouseDown={onCancel}>
      <div
        className="cms-modal"
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="cms-modal-head">
          <h2>Add a field</h2>
          <button className="cms-iconbtn" onClick={onCancel} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="cms-tabs">
          <button
            className={`cms-tab${tab === "settings" ? " is-active" : ""}`}
            onClick={() => setTab("settings")}
          >
            Settings
          </button>
          <button
            className={`cms-tab${tab === "validations" ? " is-active" : ""}`}
            onClick={() => setTab("validations")}
          >
            Validations
          </button>
          <button
            className={`cms-tab${tab === "default" ? " is-active" : ""}`}
            onClick={() => setTab("default")}
          >
            Default value
          </button>
        </div>

        <div className="cms-modal-body">
          {tab === "settings" && (
            <>
              <div className="cms-field">
                <label className="cms-field-label">
                  Field type<span className="req">*</span>
                </label>
                <div
                  className="cms-input is-readonly cms-input-icon"
                  style={{ background: "#f3f5f8" }}
                >
                  <Icon size={16} />
                  <span>{meta.label}</span>
                </div>
              </div>

              <div className="cms-field">
                <label className="cms-field-label" htmlFor="cms-fieldname">
                  Field name<span className="req">*</span>
                </label>
                <input
                  id="cms-fieldname"
                  className="cms-input"
                  value={name}
                  autoFocus
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {isReference && (
                <div className="cms-field">
                  <label className="cms-field-label" htmlFor="cms-refcol">
                    Referenced Collection<span className="req">*</span>
                  </label>
                  <select
                    id="cms-refcol"
                    className="cms-select"
                    value={referencedCollection}
                    onChange={(e) => setReferencedCollection(e.target.value)}
                  >
                    {refOptions.length === 0 && <option value="">No other collections</option>}
                    {refOptions.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="cms-field">
                <label className="cms-field-label" htmlFor="cms-help">
                  Help text (optional)
                </label>
                <input
                  id="cms-help"
                  className="cms-input"
                  value={helpText}
                  onChange={(e) => setHelpText(e.target.value)}
                />
              </div>
            </>
          )}

          {tab === "validations" && (
            <div className="cms-toggle-row">
              <button
                type="button"
                className={`cms-toggle${required ? " is-on" : ""}`}
                aria-pressed={required}
                onClick={() => setRequired((v) => !v)}
              />
              <span className="cms-toggle-label">
                Make this a required field <Info size={14} color="#98a0b0" />
              </span>
            </div>
          )}

          {tab === "default" &&
            (supportsDefaultValue(fieldType) ? (
              <div className="cms-field">
                <label className="cms-field-label" htmlFor="cms-default">
                  Default value
                </label>
                <input
                  id="cms-default"
                  className="cms-input"
                  value={defaultValue}
                  placeholder={`Default ${meta.label.toLowerCase()} for new items`}
                  onChange={(e) => setDefaultValue(e.target.value)}
                />
                <p className="cms-help">Applied automatically when you add a new item.</p>
              </div>
            ) : (
              <div className="cms-notice">
                <strong>&ldquo;{meta.label}&rdquo; fields do not support default values</strong>
                Default values are supported for the following field types: Text, Email, Image,
                Boolean, Number, Date and Time, Date, Color, URL, Video, Audio, Address, Tags,
                Array, Object, Rich Content.
                <br />
                <br />
                Think &ldquo;{meta.label}&rdquo; fields should support default values?{" "}
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Submit a request
                </a>
              </div>
            ))}
        </div>

        <div className="cms-modal-foot">
          <div className="cms-foot-left">
            {tab === "settings" ? (
              <button className="cms-btn cms-btn-outline" onClick={onBack}>
                Back
              </button>
            ) : (
              <button className="cms-btn cms-btn-outline" onClick={onCancel}>
                Cancel
              </button>
            )}
          </div>
          <button className="cms-btn cms-btn-primary" disabled={!canSave} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
