// File-picker + progress button that uploads to Vercel Blob and hands the
// resulting public URL back via onUploaded. Used by the Image field (and any
// other media field) so editors can upload instead of pasting a path.

import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { uploadToBlob } from "./upload";

export function MediaUpload({
  accept = "image/*,video/*",
  label = "Tải tệp lên",
  onUploaded,
}: {
  accept?: string;
  label?: string;
  onUploaded: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [pct, setPct] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-picking the same file
    if (!file) return;
    setBusy(true);
    setError(null);
    setPct(0);
    try {
      const url = await uploadToBlob(file, setPct);
      onUploaded(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload thất bại.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="cms-upload">
      <input ref={inputRef} type="file" accept={accept} hidden onChange={onFile} />
      <button
        type="button"
        className="cms-btn cms-btn-outline cms-upload-btn"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
      >
        <UploadCloud size={15} /> {busy ? `Đang tải… ${pct}%` : label}
      </button>
      {busy && (
        <div className="cms-upload-bar">
          <span style={{ width: `${pct}%` }} />
        </div>
      )}
      {error && <p className="cms-upload-error">{error}</p>}
    </div>
  );
}
