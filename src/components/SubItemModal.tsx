"use client";

import { useState, useEffect } from "react";
import { SubItem } from "@/lib/types";
import ImageUpload from "./ImageUpload";

interface Props {
  item: SubItem | null;
  onSave: (data: Omit<SubItem, "id" | "createdAt" | "masterTableId">) => void;
  onClose: () => void;
}

export default function SubItemModal({ item, onSave, onClose }: Props) {
  const [form, setForm] = useState({
    partNumber: "",
    partName: "",
    qty: 24,
    variant: "ALL VARIAN",
    description: "",
    picture: null as string | null,
  });

  useEffect(() => {
    if (item) {
      setForm({
        partNumber: item.partNumber,
        partName: item.partName,
        qty: item.qty,
        variant: item.variant,
        description: item.description,
        picture: item.picture,
      });
    }
  }, [item]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.partNumber.trim() || !form.partName.trim()) return;
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="w-full max-w-lg rounded border border-cyan-500/30 bg-[#0f172a] shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-700/50 px-5 py-3">
          <h2 className="text-sm font-bold tracking-wider text-cyan-400 uppercase">
            {item ? "EDIT PART" : "ADD NEW PART"}
          </h2>
          <button onClick={onClose} className="rounded p-1 text-slate-500 hover:bg-slate-800 hover:text-white">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5">
          <div className="mb-4">
            <ImageUpload value={form.picture} onChange={(v) => setForm({ ...form, picture: v })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">Part Number</label>
              <input type="text" value={form.partNumber} onChange={(e) => setForm({ ...form, partNumber: e.target.value })} placeholder="e.g. MC804020" className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white placeholder-slate-600 outline-none focus:border-cyan-500" required autoFocus />
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">Part Name</label>
              <input type="text" value={form.partName} onChange={(e) => setForm({ ...form, partName: e.target.value })} placeholder="e.g. BOLT KING PIN SET" className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white placeholder-slate-600 outline-none focus:border-cyan-500" required />
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">Qty/Lot</label>
              <input type="number" value={form.qty} onChange={(e) => setForm({ ...form, qty: parseInt(e.target.value) || 0 })} min="1" className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white outline-none focus:border-cyan-500" />
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">Variant</label>
              <input type="text" value={form.variant} onChange={(e) => setForm({ ...form, variant: e.target.value })} placeholder="ALL VARIAN" className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white placeholder-slate-600 outline-none focus:border-cyan-500" />
            </div>
            <div className="col-span-2">
              <label className="mb-1 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Optional notes..." rows={2} className="w-full resize-none rounded border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white placeholder-slate-600 outline-none focus:border-cyan-500" />
            </div>
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="rounded border border-slate-700 px-4 py-2 text-xs font-bold tracking-wider text-slate-400 hover:bg-slate-800">CANCEL</button>
            <button type="submit" className="rounded bg-cyan-500 px-5 py-2 text-xs font-bold tracking-wider text-[#0f172a] transition hover:bg-cyan-400">{item ? "UPDATE" : "SAVE"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
