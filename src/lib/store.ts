"use client";

import { Task, SAMPLE_TASKS } from "./types";

const STORAGE_KEY = "kanban-parts-tasks";

export function loadTasks(): Task[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveTasks(SAMPLE_TASKS);
      return SAMPLE_TASKS;
    }
    return JSON.parse(raw);
  } catch {
    return SAMPLE_TASKS;
  }
}

export function saveTasks(tasks: Task[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function createTask(task: Omit<Task, "id" | "createdAt">): Task {
  return {
    ...task,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
}
