"use client";

import { useState, useEffect, useRef } from "react";
import { MasterTable, Column } from "@/lib/types";
import ImageUpload from "./ImageUpload";

interface Props {
  master: MasterTable | null;
  onSave: (data: Omit<MasterTable, "id" | "createdAt">) => void;
  onClose: () => void;
  statuses: Column[];
}

export default function MasterModal({ master, onSave, onClose, statuses }: Props) {
  const [form, setForm] = useState({
    name: "",
    daishaNo: "",
    varian: "",
    lotNo: "",
    image: null as string | null,
    status: statuses[0]?.id ?? "backlog",
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (master) {
      setForm({
        name: master.name,
        daishaNo: master.daishaNo,
        varian: master.varian,
        lotNo: master.lotNo,
        image: master.image,
        status: master.status,
      });
    }
  }, [master]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={ref} className="w-full max-w-lg rounded border border-cyan-500/30 bg-[#0f172a] shadow-2xl shadow-cyan-500/5">
        <div className="flex items-center justify-between border-b border-slate-700/50 px-5 py-3">
          <h2 className="text-sm font-bold tracking-wider text-cyan-400 uppercase">
            {master ? "EDIT MASTER TABLE" : "ADD NEW MASTER TABLE"}
          </h2>
          <button onClick={onClose} className="rounded p-1 text-slate-500 hover:bg-slate-800 hover:text-white">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5">
          <div className="mb-4 flex items-start gap-4">
            <ImageUpload value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
            <div className="flex-1 text-[10px] text-slate-500">
              <p>Master image. JPG/PNG, max 800KB.</p>
              <p className="mt-1">Disimpan di localStorage sebagai base64.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="mb-1 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">Master Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. SUPPLY PART TO FRONT AXLE ASSY"
                maxLength={120}
                className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white placeholder-slate-600 outline-none transition focus:border-cyan-500"
                required
                autoFocus
              />
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">Daisha No</label>
              <input
                type="text"
                value={form.daishaNo}
                onChange={(e) => setForm({ ...form, daishaNo: e.target.value })}
                placeholder="e.g. 32"
                maxLength={30}
                className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white placeholder-slate-600 outline-none transition focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">Varian</label>
              <input
                type="text"
                value={form.varian}
                onChange={(e) => setForm({ ...form, varian: e.target.value })}
                placeholder="e.g. ALL VARIAN"
                maxLength={60}
                className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white placeholder-slate-600 outline-none transition focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">Lot No</label>
              <input
                type="text"
                value={form.lotNo}
                onChange={(e) => setForm({ ...form, lotNo: e.target.value })}
                placeholder="e.g. LOT-001"
                maxLength={30}
                className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white placeholder-slate-600 outline-none transition focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white outline-none transition focus:border-cyan-500"
              >
                {statuses.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
              </select>
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="rounded border border-slate-700 px-4 py-2 text-xs font-bold tracking-wider text-slate-400 transition hover:bg-slate-800 hover:text-white">
              CANCEL
            </button>
            <button type="submit" className="rounded bg-cyan-500 px-5 py-2 text-xs font-bold tracking-wider text-[#0f172a] transition hover:bg-cyan-400">
              {master ? "UPDATE" : "SAVE"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
