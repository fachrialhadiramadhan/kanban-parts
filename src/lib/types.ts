export interface Task {
  id: string;
  partNumber: string;
  partName: string;
  qty: number;
  variant: string;
  description: string;
  status: string;
  createdAt: string;
}

export interface Column {
  id: string;
  title: string;
  color: string;
}

export const DEFAULT_COLUMNS: Column[] = [
  { id: "backlog", title: "BACKLOG", color: "#64748b" },
  { id: "todo", title: "TO DO", color: "#f59e0b" },
  { id: "in-progress", title: "IN PROGRESS", color: "#3b82f6" },
  { id: "done", title: "DONE", color: "#22c55e" },
];

export const SAMPLE_TASKS: Task[] = [
  {
    id: "1",
    partNumber: "MC804020",
    partName: "BOLT KING PIN SET",
    qty: 24,
    variant: "ALL VARIAN",
    description: "King pin bolt assembly set",
    status: "backlog",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    partNumber: "MF524042",
    partName: "NIPPLE GREASE (10)",
    qty: 24,
    variant: "ALL VARIAN",
    description: "Grease nipple fitting size 10",
    status: "todo",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    partNumber: "MK309328",
    partName: "ORING",
    qty: 24,
    variant: "ALL VARIAN",
    description: "Standard O-ring seal",
    status: "in-progress",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    partNumber: "MC891541",
    partName: "NUT CASTLE",
    qty: 24,
    variant: "ALL VARIAN",
    description: "Castle nut for steering knuckle",
    status: "done",
    createdAt: new Date().toISOString(),
  },
];
