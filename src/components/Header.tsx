"use client";

interface HeaderProps {
  onAdd: () => void;
  filterStatus: string;
  onFilterChange: (status: string) => void;
  taskCount: number;
}

const FILTERS = [
  { id: "all", label: "ALL" },
  { id: "backlog", label: "BACKLOG" },
  { id: "todo", label: "TO DO" },
  { id: "in-progress", label: "IN PROGRESS" },
  { id: "done", label: "DONE" },
];

export default function Header({ onAdd, filterStatus, onFilterChange, taskCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-cyan-500/20 bg-[#0f172a]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-cyan-500 font-black text-[#0f172a] text-sm">
            K
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-wider text-cyan-400 uppercase">
              KANBAN PARTS
            </h1>
            <p className="text-[10px] tracking-widest text-slate-500 uppercase">
              Supply Part Management System
            </p>
          </div>
          <span className="ml-2 rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-400">
            {taskCount} PARTS
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Filter */}
          <div className="flex gap-1 overflow-x-auto rounded border border-slate-700 bg-slate-900 p-0.5">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => onFilterChange(f.id)}
                className={`whitespace-nowrap rounded px-2.5 py-1 text-[10px] font-bold tracking-wider transition ${
                  filterStatus === f.id
                    ? "bg-cyan-500 text-[#0f172a]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Add button */}
          <button
            onClick={onAdd}
            className="flex items-center gap-1.5 rounded bg-cyan-500 px-4 py-2 text-xs font-bold text-[#0f172a] transition hover:bg-cyan-400"
          >
            <span className="text-base leading-none">+</span>
            ADD PART
          </button>
        </div>
      </div>
    </header>
  );
}
