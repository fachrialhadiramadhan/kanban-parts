export interface MasterTable {
  id: string;
  name: string;
  daishaNo: string;
  varian: string;
  lotNo: string;
  image: string | null;
  status: string;
  createdAt: string;
}

export interface SubItem {
  id: string;
  masterTableId: string;
  partNumber: string;
  partName: string;
  qty: number;
  variant: string;
  description: string;
  picture: string | null;
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

export const SAMPLE_MASTERS: MasterTable[] = [
  {
    id: "m1",
    name: "SUPPLY PART TO FRONT AXLE ASSY",
    daishaNo: "32",
    varian: "ALL VARIAN",
    lotNo: "LOT-001",
    image: null,
    status: "in-progress",
    createdAt: new Date().toISOString(),
  },
];

export const SAMPLE_SUBITEMS: SubItem[] = [
  { id: "s1", masterTableId: "m1", partNumber: "MC804020", partName: "BOLT KING PIN SET", qty: 24, variant: "ALL VARIAN", description: "", picture: null, createdAt: new Date().toISOString() },
  { id: "s2", masterTableId: "m1", partNumber: "MF524042", partName: "NIPPLE GREASE (10)", qty: 24, variant: "ALL VARIAN", description: "", picture: null, createdAt: new Date().toISOString() },
  { id: "s3", masterTableId: "m1", partNumber: "A4303340020", partName: "END COVER/KING PIN", qty: 24, variant: "ALL VARIAN", description: "", picture: null, createdAt: new Date().toISOString() },
  { id: "s4", masterTableId: "m1", partNumber: "MK309328", partName: "ORING", qty: 24, variant: "ALL VARIAN", description: "", picture: null, createdAt: new Date().toISOString() },
  { id: "s5", masterTableId: "m1", partNumber: "MK309459", partName: "COVER KING PIN", qty: 24, variant: "ALL VARIAN", description: "", picture: null, createdAt: new Date().toISOString() },
  { id: "s6", masterTableId: "m1", partNumber: "A4303321306", partName: "STEERING KNUCKLE PIN", qty: 24, variant: "ALL VARIAN", description: "", picture: null, createdAt: new Date().toISOString() },
  { id: "s7", masterTableId: "m1", partNumber: "MH041015", partName: "BEARING THRUST", qty: 24, variant: "ALL VARIAN", description: "", picture: null, createdAt: new Date().toISOString() },
  { id: "s8", masterTableId: "m1", partNumber: "MF430006", partName: "NUT(10)", qty: 24, variant: "ALL VARIAN", description: "", picture: null, createdAt: new Date().toISOString() },
];
