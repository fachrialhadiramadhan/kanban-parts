"use client";

import { MasterTable, Column } from "@/lib/types";

interface Props {
  master: MasterTable;
  index: number;
  statusColor: string;
  subCount: number;
  allStatuses: Column[];
  onOpen: (m: MasterTable) => void;
  onEdit: (m: MasterTable) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, newStatus: string) => void;
}

export default function MasterCard({ master, index, statusColor, subCount, allStatuses, onOpen, onEdit, onDelete, onStatusChange }: Props) {
  const otherStatuses = allStatuses.filter((c) => c.id !== master.status);

  return (
    <div
      className="group cursor-pointer rounded border border-slate-700/50 bg-slate-800/60 transition hover:border-cyan-500/30 hover:bg-slate-800"
      onClick={() => onOpen(master)}
    >
      <div className="flex items-start gap-2 p-3">
        {master.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={master.image} alt="" className="mt-0.5 h-12 w-12 shrink-0 rounded border border-slate-700 object-cover" />
        ) : (
          <div className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded border border-slate-700 bg-slate-800 text-slate-600">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: statusColor }} />
            <span className="text-[9px] font-mono text-slate-500">#{index}</span>
            <span className="rounded bg-slate-700/50 px-1.5 py-0.5 text-[9px] text-slate-400">{subCount} items</span>
          </div>
          <p className="mt-0.5 truncate text-xs font-bold text-white">{master.name}</p>
          <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] text-slate-400">
            {master.daishaNo && <span>DN: {master.daishaNo}</span>}
            {master.varian && <span>VAR: {master.varian}</span>}
            {master.lotNo && <span>LOT: {master.lotNo}</span>}
          </div>
        </div>
        <div className="flex shrink-0 gap-0.5 opacity-0 transition group-hover:opacity-100">
          <button onClick={(e) => { e.stopPropagation(); onEdit(master); }} className="rounded p-1 text-slate-500 hover:bg-slate-700 hover:text-white" title="Edit">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
          </button>
          <button onClick={(e) => { e.stopPropagation(); onDelete(master.id); }} className="rounded p-1 text-slate-500 hover:bg-red-500/20 hover:text-red-400" title="Delete">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-1 border-t border-slate-700/30 px-3 pb-2 pt-1.5">
        <span className="mr-0.5 text-[9px] text-slate-600">→</span>
        {otherStatuses.map((col) => (
          <button
            key={col.id}
            onClick={(e) => { e.stopPropagation(); onStatusChange(master.id, col.id); }}
            className="rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-slate-400 transition hover:bg-slate-700"
            style={{ backgroundColor: `${col.color}10` }}
          >
            {col.title}
          </button>
        ))}
      </div>
    </div>
  );
}
