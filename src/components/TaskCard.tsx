"use client";

import { useState } from "react";
import { Task, Column } from "@/lib/types";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, newStatus: string) => void;
  allStatuses: Column[];
}

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onStatusChange,
  allStatuses,
}: TaskCardProps) {
  const [expanded, setExpanded] = useState(false);

  const statusColor = allStatuses.find((c) => c.id === task.status)?.color ?? "#64748b";
  const otherStatuses = allStatuses.filter((c) => c.id !== task.status);

  return (
    <div
      className="group cursor-pointer rounded border border-slate-700/50 bg-slate-800/60 px-3 py-2.5 transition hover:border-cyan-500/30 hover:bg-slate-800"
      onClick={() => setExpanded(!expanded)}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <div
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: statusColor }}
            />
            <span className="text-[10px] font-mono text-slate-500">{task.partNumber}</span>
          </div>
          <p className="mt-0.5 truncate text-xs font-bold text-white">{task.partName}</p>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 gap-0.5 opacity-0 transition group-hover:opacity-100">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(task); }}
            className="rounded p-1 text-slate-500 hover:bg-slate-700 hover:text-white"
            title="Edit"
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}
            className="rounded p-1 text-slate-500 hover:bg-red-500/20 hover:text-red-400"
            title="Delete"
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Details row */}
      <div className="mt-2 flex items-center gap-3">
        <span className="rounded bg-slate-700/40 px-1.5 py-0.5 text-[10px] font-bold text-slate-300">
          QTY {task.qty}
        </span>
        <span className="text-[10px] text-slate-400">{task.variant}</span>
      </div>

      {/* Expanded description */}
      {expanded && task.description && (
        <p className="mt-2 border-t border-slate-700/30 pt-2 text-[10px] text-slate-400">
          {task.description}
        </p>
      )}

      {/* Move to */}
      {otherStatuses.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1 border-t border-slate-700/30 pt-2">
          <span className="text-[9px] text-slate-600 pt-0.5">→</span>
          {otherStatuses.map((col) => (
            <button
              key={col.id}
              onClick={(e) => {
                e.stopPropagation();
                onStatusChange(task.id, col.id);
              }}
              className="rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-slate-400 transition hover:bg-slate-700"
              style={{ backgroundColor: `${col.color}10` }}
            >
              {col.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
