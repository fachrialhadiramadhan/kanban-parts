"use client";

import { useState, useEffect } from "react";
import { MasterTable, SubItem, Column } from "@/lib/types";
import { loadMasters, saveMasters, loadSubItems, saveSubItems, genId } from "@/lib/store";
import MasterCard from "@/components/MasterCard";
import MasterModal from "@/components/MasterModal";
import MasterDetail from "@/components/MasterDetail";
import Header from "@/components/Header";

export default function Board() {
  const [masters, setMasters] = useState<MasterTable[]>([]);
  const [subItems, setSubItems] = useState<SubItem[]>([]);
  const [ready, setReady] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [openMaster, setOpenMaster] = useState<MasterTable | null>(null);

  // Master modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<MasterTable | null>(null);

  useEffect(() => {
    setMasters(loadMasters());
    setSubItems(loadSubItems());
    setReady(true);
  }, []);

  const persistMasters = (next: MasterTable[]) => {
    setMasters(next);
    saveMasters(next);
  };

  const persistItems = (next: SubItem[]) => {
    setSubItems(next);
    saveSubItems(next);
  };

  const columns: Column[] = [
    { id: "backlog", title: "BACKLOG", color: "#64748b" },
    { id: "todo", title: "TO DO", color: "#f59e0b" },
    { id: "in-progress", title: "IN PROGRESS", color: "#3b82f6" },
    { id: "done", title: "DONE", color: "#22c55e" },
  ];

  const getStatusMasters = (status: string) =>
    masters.filter((m) => m.status === status);

  const getSubCount = (masterId: string) =>
    subItems.filter((s) => s.masterTableId === masterId).length;

  /* Master CRUD */
  const handleSaveMaster = (data: Omit<MasterTable, "id" | "createdAt">) => {
    if (editing) {
      persistMasters(masters.map((m) => (m.id === editing.id ? { ...m, ...data } : m)));
    } else {
      persistMasters([
        ...masters,
        { ...data, id: genId(), createdAt: new Date().toISOString() },
      ]);
    }
    setEditing(null);
    setModalOpen(false);
  };

  const handleEditMaster = (m: MasterTable) => {
    setEditing(m);
    setModalOpen(true);
  };

  const handleDeleteMaster = (id: string) => {
    if (!confirm("Delete this master and ALL its sub items?")) return;
    persistMasters(masters.filter((m) => m.id !== id));
    persistItems(subItems.filter((s) => s.masterTableId !== id));
  };

  const handleStatusChange = (masterId: string, newStatus: string) => {
    persistMasters(masters.map((m) => (m.id === masterId ? { ...m, status: newStatus } : m)));
  };

  const openCreateMaster = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const filteredColumns = filterStatus === "all"
    ? columns
    : columns.filter((c) => c.id === filterStatus);

  /* ----- Detail view ----- */
  if (openMaster) {
    return (
      <MasterDetail
        master={openMaster}
        items={subItems.filter((s) => s.masterTableId === openMaster.id)}
        onUpdateItems={persistItems}
        onUpdateMaster={(data) => {
          persistMasters(masters.map((m) => (m.id === openMaster.id ? { ...m, ...data } : m)));
          setOpenMaster({ ...openMaster, ...data });
        }}
        onBack={() => setOpenMaster(null)}
      />
    );
  }

  /* ----- Board view ----- */
  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-mono">
      <Header
        onAdd={openCreateMaster}
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
        masterCount={ready ? masters.length : 0}
      />

      <main className="mx-auto max-w-7xl px-4 pb-12">
        {!ready && (
          <div className="flex items-center justify-center py-32">
            <div className="rounded border border-cyan-500/20 bg-slate-900 px-6 py-4 text-center">
              <p className="animate-pulse text-[10px] tracking-widest text-cyan-400 uppercase">Loading...</p>
            </div>
          </div>
        )}

        {ready && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {filteredColumns.map((col) => {
              const list = getStatusMasters(col.id);
              return (
                <div key={col.id} className="flex flex-col rounded border border-slate-700/50 bg-slate-900/40">
                  <div className="flex items-center justify-between rounded-t border-b border-slate-700/50 px-3 py-2.5" style={{ backgroundColor: `${col.color}15` }}>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: col.color }} />
                      <h2 className="text-xs font-bold tracking-widest" style={{ color: col.color }}>{col.title}</h2>
                    </div>
                    <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-300">{list.length}</span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-3 min-h-[200px]">
                    {list.length === 0 ? (
                      <div className="flex flex-1 items-center justify-center rounded border border-dashed border-slate-700/50 py-8 text-center">
                        <span className="text-[10px] tracking-widest text-slate-600 uppercase">No tables</span>
                      </div>
                    ) : (
                      list.map((m, i) => (
                        <MasterCard
                          key={m.id}
                          master={m}
                          index={i + 1}
                          statusColor={col.color}
                          subCount={getSubCount(m.id)}
                          allStatuses={columns}
                          onOpen={setOpenMaster}
                          onEdit={handleEditMaster}
                          onDelete={handleDeleteMaster}
                          onStatusChange={handleStatusChange}
                        />
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {modalOpen && (
        <MasterModal
          master={editing}
          onSave={handleSaveMaster}
          onClose={() => { setModalOpen(false); setEditing(null); }}
          statuses={columns}
        />
      )}
    </div>
  );
}
