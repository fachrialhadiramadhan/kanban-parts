"use client";

import { useState } from "react";
import { Task, Column } from "@/lib/types";
import { loadTasks, saveTasks, createTask } from "@/lib/store";
import ColumnView from "@/components/Column";
import TaskModal from "@/components/TaskModal";
import Header from "@/components/Header";

export default function Board() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const persist = (updated: Task[]) => {
    setTasks(updated);
    saveTasks(updated);
  };

  const columns: Column[] = [
    { id: "backlog", title: "BACKLOG", color: "#64748b" },
    { id: "todo", title: "TO DO", color: "#f59e0b" },
    { id: "in-progress", title: "IN PROGRESS", color: "#3b82f6" },
    { id: "done", title: "DONE", color: "#22c55e" },
  ];

  const getStatusTasks = (status: string) =>
    tasks.filter((t) => t.status === status);

  const handleSave = (data: Omit<Task, "id" | "createdAt">) => {
    if (editingTask) {
      persist(tasks.map((t) => (t.id === editingTask.id ? { ...t, ...data } : t)));
    } else {
      persist([...tasks, createTask(data)]);
    }
    setEditingTask(null);
    setModalOpen(false);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    persist(tasks.filter((t) => t.id !== id));
  };

  const handleStatusChange = (taskId: string, newStatus: string) => {
    persist(tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)));
  };

  const openCreate = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const filteredColumns = filterStatus === "all"
    ? columns
    : columns.filter((c) => c.id === filterStatus);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-mono">
      <Header
        onAdd={openCreate}
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
        taskCount={tasks.length}
      />

      <main className="mx-auto max-w-7xl px-4 pb-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {filteredColumns.map((col) => (
            <ColumnView
              key={col.id}
              column={col}
              tasks={getStatusTasks(col.id)}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              allStatuses={columns}
            />
          ))}
        </div>
      </main>

      {modalOpen && (
        <TaskModal
          task={editingTask}
          onSave={handleSave}
          onClose={() => {
            setModalOpen(false);
            setEditingTask(null);
          }}
          statuses={columns}
        />
      )}
    </div>
  );
}
