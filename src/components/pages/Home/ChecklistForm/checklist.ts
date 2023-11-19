import { RxDatabase } from "rxdb";

export interface Checklistprops {
  openChecklistForm: null | number;
  db: null | RxDatabase;
  fetchAllTasks: () => void;
  setOpenChecklistForm: (openChecklistForm: number | null) => void;
}
