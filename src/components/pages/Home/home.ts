import { RxDatabase } from "rxdb";

export interface homeProps {
  db: null | RxDatabase;
}
export interface FormDataProps {
  title: string;
}
export interface ChecklistProps {
  id?: number;
  label: string;
  completed: boolean;
}
