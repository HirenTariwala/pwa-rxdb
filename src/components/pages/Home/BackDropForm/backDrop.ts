export interface BackDropFormProps {
  formData: {
    title: string;
  };
  formError: boolean;
  checklist: {
    id?: number;
    label: string;
    completed: boolean;
  }[];
  inputChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  closeBackDropHandler: () => void;
  submitTaskHandler: () => void;
  inputChecklistHandler: (
    id: number | undefined
  ) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  addCheckListItemsHandler: () => void;
}
