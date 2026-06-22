"use client";

import { useRef } from "react";

interface ImageUploadProps {
  value: string | null;
  onChange: (data: string | null) => void;
  label?: string;
  small?: boolean;
}

const MAX_SIZE = 800_000; // 800KB per image
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export default function ImageUpload({ value, onChange, label = "Upload Image", small = false }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // MIME validation
    if (!ALLOWED_TYPES.includes(file.type)) {
      alert(`Invalid file type. Allowed: ${ALLOWED_TYPES.join(", ")}`);
      e.target.value = "";
      return;
    }

    // Size check
    if (file.size > MAX_SIZE) {
      alert(`Image too large. Max ${Math.round(MAX_SIZE / 1000)}KB. Yours: ${Math.round(file.size / 1000)}KB.`);
      e.target.value = "";
      return;
    }

    // Total localStorage size check
    try {
      const totalUsed = Object.keys(localStorage).reduce((sum, key) => {
        const val = localStorage.getItem(key) ?? "";
        return sum + key.length + val.length;
      }, 0);
      const MAX_LOCALSTORAGE = 4_500_000; // 4.5MB safety limit (browsers vary 5-10MB)
      if (totalUsed + file.size * 1.4 > MAX_LOCALSTORAGE) {
        alert("Storage nearly full. Delete some images first.");
        e.target.value = "";
        return;
      }
    } catch {
      // Continue anyway
    }

    const reader = new FileReader();
    reader.onload = () => {
      onChange(reader.result as string);
    };
    reader.onerror = () => {
      alert("Failed to read file.");
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const h = small ? "h-12 w-12" : "h-24 w-24";

  return (
    <div className="flex items-center gap-2">
      <div
        className={`${h} flex shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded border-2 border-dashed border-slate-600 bg-slate-800/50 transition hover:border-cyan-500`}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") inputRef.current?.click(); }}
      >
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="preview" className="h-full w-full object-cover" />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-500">
            <svg className={small ? "h-4 w-4" : "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {!small && <span className="mt-1 text-[9px] uppercase">Image</span>}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="rounded border border-slate-700 bg-slate-800 px-2 py-1 text-[10px] font-bold tracking-wider text-slate-300 transition hover:bg-slate-700"
        >
          {value ? "CHANGE" : label.toUpperCase()}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="rounded border border-red-900/50 bg-red-950/30 px-2 py-1 text-[10px] font-bold tracking-wider text-red-400 transition hover:bg-red-900/50"
          >
            REMOVE
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={ALLOWED_TYPES.join(",")}
        onChange={handleFile}
        className="hidden"
      />
    </div>
  );
}
