"use client";

import { useState } from "react";
import { MasterTable, SubItem } from "@/lib/types";
import SubItemModal from "./SubItemModal";
import ImageUpload from "./ImageUpload";

interface Props {
  master: MasterTable;
  items: SubItem[];
  onUpdateItems: (items: SubItem[]) => void;
  onUpdateMaster: (data: Omit<MasterTable, "id" | "createdAt">) => void;
  onBack: () => void;
}

export default function MasterDetail({ master, items, onUpdateItems, onUpdateMaster, onBack }: Props) {
  const [editItem, setEditItem] = useState<SubItem | null>(null);
  const [showItemModal, setShowItemModal] = useState(false);
  const [showMasterEdit, setShowMasterEdit] = useState(false);

  const sorted = [...items].sort((a, b) => {
    const na = a.partNumber;
    const nb = b.partNumber;
    return na.localeCompare(nb);
  });

  const handleSaveItem = (data: Omit<SubItem, "id" | "createdAt" | "masterTableId">) => {
    if (editItem) {
      onUpdateItems(items.map((i) => (i.id === editItem.id ? { ...i, ...data } : i)));
    } else {
      onUpdateItems([
        ...items,
        { ...data, id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36), masterTableId: master.id, createdAt: new Date().toISOString() },
      ]);
    }
    setEditItem(null);
    setShowItemModal(false);
  };

  const handleDeleteItem = (id: string) => {
    onUpdateItems(items.filter((i) => i.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-mono">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-cyan-500/20 bg-[#0f172a]/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="flex items-center gap-1 rounded border border-slate-700 px-3 py-1.5 text-[10px] font-bold tracking-wider text-slate-400 transition hover:bg-slate-800 hover:text-white">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              BACK
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowMasterEdit(!showMasterEdit)}
              className="rounded border border-slate-700 px-3 py-1.5 text-[10px] font-bold tracking-wider text-slate-400 transition hover:bg-slate-800 hover:text-white"
            >
              {showMasterEdit ? "DONE EDITING" : "EDIT MASTER"}
            </button>
            <button
              onClick={() => { setEditItem(null); setShowItemModal(true); }}
              className="flex items-center gap-1 rounded bg-cyan-500 px-4 py-1.5 text-[10px] font-bold text-[#0f172a] transition hover:bg-cyan-400"
            >
              + ADD ITEM
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-6">
        {/* Master Info Panel */}
        <div className="mb-6 rounded border border-slate-700/50 bg-slate-900/60 p-4">
          {showMasterEdit ? (
            <MasterQuickEdit master={master} onSave={onUpdateMaster} onCancel={() => setShowMasterEdit(false)} />
          ) : (
            <div className="flex flex-wrap items-start gap-4">
              {master.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={master.image} alt="" className="h-16 w-16 shrink-0 rounded border border-slate-700 object-cover" />
              )}
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-bold tracking-wider text-cyan-400 uppercase">{master.name}</h2>
                <div className="mt-1 flex flex-wrap gap-4 text-[10px] text-slate-400">
                  {master.daishaNo && <span className="rounded bg-slate-800 px-2 py-0.5"><b className="text-slate-300">DAISHA NO:</b> {master.daishaNo}</span>}
                  {master.varian && <span className="rounded bg-slate-800 px-2 py-0.5"><b className="text-slate-300">VARIAN:</b> {master.varian}</span>}
                  {master.lotNo && <span className="rounded bg-slate-800 px-2 py-0.5"><b className="text-slate-300">LOT NO:</b> {master.lotNo}</span>}
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-slate-300"><b>Items:</b> {items.length}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sub Items Table */}
        <div className="overflow-x-auto rounded border border-slate-700/50">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-700/50 bg-slate-900 text-[10px] tracking-wider text-slate-400 uppercase">
                <th className="w-10 px-3 py-2">No</th>
                <th className="px-3 py-2">Part Number</th>
                <th className="px-3 py-2">Part Name</th>
                <th className="w-20 px-3 py-2 text-center">Qty/Lot</th>
                <th className="w-28 px-3 py-2">Varian</th>
                <th className="w-20 px-3 py-2">Picture</th>
                <th className="w-16 px-3 py-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-3 py-12 text-center text-[10px] text-slate-600">No items yet. Click &quot;+ ADD ITEM&quot; to add parts.</td>
                </tr>
              ) : (
                sorted.map((item, i) => (
                  <tr key={item.id} className="border-b border-slate-800/50 transition hover:bg-slate-800/40">
                    <td className="px-3 py-2 text-[10px] text-slate-500">{i + 1}</td>
                    <td className="px-3 py-2 font-mono text-[11px] text-white">{item.partNumber}</td>
                    <td className="px-3 py-2 text-xs text-white">{item.partName}</td>
                    <td className="px-3 py-2 text-center text-xs text-white">{item.qty}</td>
                    <td className="px-3 py-2 text-[10px] text-slate-300">{item.variant}</td>
                    <td className="px-3 py-2">
                      {item.picture ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.picture} alt="" className="h-8 w-8 rounded border border-slate-700 object-cover" />
                      ) : (
                        <span className="text-[9px] text-slate-600">—</span>
                      )}
                    </td>
                    <td className="px-3 py-2 text-right">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => { setEditItem(item); setShowItemModal(true); }}
                          className="rounded p-1 text-slate-500 hover:bg-slate-700 hover:text-white"
                          title="Edit"
                        >
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="rounded p-1 text-slate-500 hover:bg-red-500/20 hover:text-red-400"
                          title="Delete"
                        >
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showItemModal && (
        <SubItemModal
          item={editItem}
          onSave={handleSaveItem}
          onClose={() => { setShowItemModal(false); setEditItem(null); }}
        />
      )}
    </div>
  );
}

/* Inline master edit panel */
function MasterQuickEdit({ master, onSave, onCancel }: {
  master: MasterTable;
  onSave: (data: Omit<MasterTable, "id" | "createdAt">) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    name: master.name,
    daishaNo: master.daishaNo,
    varian: master.varian,
    lotNo: master.lotNo,
    image: master.image,
    status: master.status,
  });

  return (
    <div>
      <h3 className="mb-3 text-xs font-bold tracking-wider text-cyan-400 uppercase">Edit Master Table</h3>
      <div className="flex items-start gap-4 mb-4">
        <ImageUpload value={form.image} onChange={(v) => setForm({ ...form, image: v })} small />
        <div className="grid flex-1 grid-cols-2 gap-3">
          <div className="col-span-2">
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-white outline-none focus:border-cyan-500"
            />
          </div>
          <input type="text" value={form.daishaNo} onChange={(e) => setForm({ ...form, daishaNo: e.target.value })} placeholder="Daisha No" className="rounded border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-white outline-none focus:border-cyan-500" />
          <input type="text" value={form.varian} onChange={(e) => setForm({ ...form, varian: e.target.value })} placeholder="Varian" className="rounded border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-white outline-none focus:border-cyan-500" />
          <input type="text" value={form.lotNo} onChange={(e) => setForm({ ...form, lotNo: e.target.value })} placeholder="Lot No" className="rounded border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-white outline-none focus:border-cyan-500" />
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="rounded border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-white outline-none focus:border-cyan-500">
            {["backlog", "todo", "in-progress", "done"].map((s) => <option key={s} value={s}>{s.toUpperCase()}</option>)}
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="rounded border border-slate-700 px-3 py-1 text-[10px] text-slate-400 hover:bg-slate-800">CANCEL</button>
        <button type="button" onClick={() => { onSave(form); onCancel(); }} className="rounded bg-cyan-500 px-3 py-1 text-[10px] font-bold text-[#0f172a]">SAVE</button>
      </div>
    </div>
  );
}
