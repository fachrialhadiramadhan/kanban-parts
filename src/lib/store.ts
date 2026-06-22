"use client";

import { MasterTable, SubItem, SAMPLE_MASTERS, SAMPLE_SUBITEMS } from "./types";

const MASTERS_KEY = "kanban-masters";
const SUBITEMS_KEY = "kanban-subitems";

// Masters
export function loadMasters(): MasterTable[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(MASTERS_KEY);
    if (!raw) {
      localStorage.setItem(MASTERS_KEY, JSON.stringify(SAMPLE_MASTERS));
      return SAMPLE_MASTERS;
    }
    return JSON.parse(raw) as MasterTable[];
  } catch {
    return SAMPLE_MASTERS;
  }
}

export function saveMasters(masters: MasterTable[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(MASTERS_KEY, JSON.stringify(masters));
}

// Sub Items
export function loadSubItems(): SubItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SUBITEMS_KEY);
    if (!raw) {
      localStorage.setItem(SUBITEMS_KEY, JSON.stringify(SAMPLE_SUBITEMS));
      return SAMPLE_SUBITEMS;
    }
    return JSON.parse(raw) as SubItem[];
  } catch {
    return SAMPLE_SUBITEMS;
  }
}

export function saveSubItems(items: SubItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SUBITEMS_KEY, JSON.stringify(items));
}

export function genId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
