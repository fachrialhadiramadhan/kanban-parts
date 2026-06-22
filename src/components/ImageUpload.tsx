"use client";

import { useRef } from "react";

interface ImageUploadProps {
  value: string | null;
  onChange: (data: string | null) => void;
  label?: string;
  small?: boolean;
}

export default function ImageUpload({ value, onChange, label = "Upload Image", small = false }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 800_000) {
      alert("Image too large. Max 800KB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      onChange(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const h = small ? "h-12 w-12" : "h-24 w-24";

  return (
    <div className="flex items-center gap-2">
      <div
        className={`${h} flex shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded border-2 border-dashed border-slate-600 bg-slate-800/50 transition hover:border-cyan-500`}
        onClick={() => inputRef.current?.click()}
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
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
    </div>
  );
}
