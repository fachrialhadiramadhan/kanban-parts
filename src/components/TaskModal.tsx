"use client";

import { useState, useEffect, useRef } from "react";
import { Task, Column } from "@/lib/types";

interface TaskModalProps {
  task: Task | null;
  onSave: (data: Omit<Task, "id" | "createdAt">) => void;
  onClose: () => void;
  statuses: Column[];
}

export default function TaskModal({ task, onSave, onClose, statuses }: TaskModalProps) {
  const [form, setForm] = useState({
    partNumber: "",
    partName: "",
    qty: 24,
    variant: "ALL VARIAN",
    description: "",
    status: statuses[0]?.id ?? "backlog",
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (task) {
      setForm({
        partNumber: task.partNumber,
        partName: task.partName,
        qty: task.qty,
        variant: task.variant,
        description: task.description,
        status: task.status,
      });
    }
  }, [task]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.partNumber.trim() || !form.partName.trim()) return;
    onSave(form);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={ref}
        className="w-full max-w-lg rounded border border-cyan-500/30 bg-[#0f172a] shadow-2xl shadow-cyan-500/5"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-700/50 px-5 py-3">
          <h2 className="text-sm font-bold tracking-wider text-cyan-400 uppercase">
            {task ? "EDIT PART" : "ADD NEW PART"}
          </h2>
          <button
            onClick={onClose}
            className="rounded p-1 text-slate-500 hover:bg-slate-800 hover:text-white"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5">
          <div className="grid grid-cols-2 gap-4">
            {/* Part Number */}
            <div className="col-span-2 sm:col-span-1">
              <label className="mb-1 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                Part Number
              </label>
              <input
                type="text"
                value={form.partNumber}
                onChange={(e) => setForm({ ...form, partNumber: e.target.value })}
                placeholder="e.g. MC804020"
                className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white placeholder-slate-600 outline-none transition focus:border-cyan-500"
                required
                autoFocus
              />
            </div>

            {/* Part Name */}
            <div className="col-span-2 sm:col-span-1">
              <label className="mb-1 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                Part Name
              </label>
              <input
                type="text"
                value={form.partName}
                onChange={(e) => setForm({ ...form, partName: e.target.value })}
                placeholder="e.g. BOLT KING PIN SET"
                className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white placeholder-slate-600 outline-none transition focus:border-cyan-500"
                required
              />
            </div>

            {/* Qty */}
            <div>
              <label className="mb-1 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                Qty/Lot
              </label>
              <input
                type="number"
                value={form.qty}
                onChange={(e) => setForm({ ...form, qty: parseInt(e.target.value) || 0 })}
                min="1"
                className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white outline-none transition focus:border-cyan-500"
              />
            </div>

            {/* Variant */}
            <div>
              <label className="mb-1 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                Variant
              </label>
              <input
                type="text"
                value={form.variant}
                onChange={(e) => setForm({ ...form, variant: e.target.value })}
                placeholder="ALL VARIAN"
                className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white placeholder-slate-600 outline-none transition focus:border-cyan-500"
              />
            </div>

            {/* Status */}
            <div>
              <label className="mb-1 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white outline-none transition focus:border-cyan-500"
              >
                {statuses.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="mb-1 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Optional notes..."
                rows={3}
                className="w-full resize-none rounded border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white placeholder-slate-600 outline-none transition focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-5 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded border border-slate-700 px-4 py-2 text-xs font-bold tracking-wider text-slate-400 transition hover:bg-slate-800 hover:text-white"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="rounded bg-cyan-500 px-5 py-2 text-xs font-bold tracking-wider text-[#0f172a] transition hover:bg-cyan-400"
            >
              {task ? "UPDATE" : "SAVE"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
