export interface taskInterface {
  id: number;
  title: string;
  description: string;
  checklist: {
    id: number;
    label: string;
    completed: boolean;
  }[];
  _meta?: {
    lwt: number;
  };
  _deleted?: boolean;
  _rev?: string;
}

export interface tasklistProps {
  list: taskInterface[];
  expanded: number | boolean;
  accordianChangeHandler: (
    panel: number
  ) => (event: React.SyntheticEvent, newExpanded: boolean) => void;
  openChecklistFormHandler: (taskId: number) => void;
  checkBoxChangeHandler: (taskId: number, checklistId: number) => void;
}
