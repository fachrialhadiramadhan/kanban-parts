"use client";

import { Task, Column } from "@/lib/types";
import TaskCard from "./TaskCard";

interface ColumnProps {
  column: Column;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, newStatus: string) => void;
  allStatuses: Column[];
}

export default function ColumnView({
  column,
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
  allStatuses,
}: ColumnProps) {
  return (
    <div className="flex flex-col rounded border border-slate-700/50 bg-slate-900/40">
      {/* Header */}
      <div
        className="flex items-center justify-between rounded-t border-b border-slate-700/50 px-3 py-2.5"
        style={{ backgroundColor: `${column.color}15` }}
      >
        <div className="flex items-center gap-2">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: column.color }}
          />
          <h2 className="text-xs font-bold tracking-widest" style={{ color: column.color }}>
            {column.title}
          </h2>
        </div>
        <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-300">
          {tasks.length}
        </span>
      </div>

      {/* Tasks */}
      <div className="flex flex-1 flex-col gap-2 p-3 min-h-[200px]">
        {tasks.length === 0 ? (
          <div className="flex flex-1 items-center justify-center rounded border border-dashed border-slate-700/50 py-8 text-center">
            <span className="text-[10px] tracking-widest text-slate-600 uppercase">
              No parts
            </span>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
              allStatuses={allStatuses}
            />
          ))
        )}
      </div>
    </div>
  );
}
