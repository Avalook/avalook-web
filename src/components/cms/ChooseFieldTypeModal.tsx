import { useState } from "react";
import { X, Check } from "lucide-react";
import { ESSENTIAL_FIELD_TYPES, type FieldType } from "./types";

type Props = {
  onCancel: () => void;
  onChoose: (type: FieldType) => void;
};

/** Step 1 of "Add Field" — pick a field type (mirrors the reference modal). */
export function ChooseFieldTypeModal({ onCancel, onChoose }: Props) {
  const [selected, setSelected] = useState<FieldType | null>(null);

  return (
    <div className="cms-overlay" onMouseDown={onCancel}>
      <div
        className="cms-modal"
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="cms-modal-head">
          <div>
            <h2>Choose field type</h2>
            <p>You can connect each field to a page element to display its content on your site.</p>
          </div>
          <button className="cms-iconbtn" onClick={onCancel} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="cms-modal-body">
          <div className="cms-group-label">Essentials</div>
          <div className="cms-fieldgrid">
            {ESSENTIAL_FIELD_TYPES.map((meta) => {
              const Icon = meta.icon;
              const isSel = selected === meta.type;
              return (
                <button
                  key={meta.type}
                  type="button"
                  className={`cms-fieldcard${isSel ? " is-selected" : ""}`}
                  onClick={() => setSelected(meta.type)}
                  onDoubleClick={() => onChoose(meta.type)}
                >
                  {isSel && (
                    <span className="cms-fieldcard-check">
                      <Check size={12} strokeWidth={3} />
                    </span>
                  )}
                  <span className="cms-fieldcard-icon">
                    <Icon size={20} />
                  </span>
                  <span className="cms-fieldcard-name">{meta.label}</span>
                  <span className="cms-fieldcard-desc">{meta.description}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="cms-modal-foot">
          <button className="cms-btn cms-btn-outline" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="cms-btn cms-btn-primary"
            disabled={!selected}
            onClick={() => selected && onChoose(selected)}
          >
            Choose Field Type
          </button>
        </div>
      </div>
    </div>
  );
}
