import { useEffect, useState } from "react";
import { taskInterface } from "./Tasklist/tasklist";
import { RxDatabase, RxDocument } from "rxdb";
import { ChecklistProps, FormDataProps } from "./home";

const createTask = async (
  db: RxDatabase,
  id: number,
  title: string,
  checklist: { label: string; completed: boolean }[]
): Promise<RxDocument | null> => {
  if (!db) return null;
  const taskCollection = db?.collections?.tasks;

  if (!taskCollection) return null;
  const newTask = await taskCollection.insert({
    id,
    title,
    checklist,
  });
  return newTask;
};

export const useHomeHook = (db: null | RxDatabase) => {
  const [taskList, setTaskList] = useState<taskInterface[]>([]);
  const [expanded, setExpanded] = useState<number | boolean>(false);
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState<FormDataProps>({
    title: "",
  });
  const [formError, setFormError] = useState(false);
  const [checklist, setChecklist] = useState<ChecklistProps[]>([]);
  const [openChecklistForm, setOpenChecklistForm] = useState<null | number>(
    null
  );

  const fetchAllTasks = async () => {
    let list: taskInterface[] = [];
    if (db) {
      await db.collections.tasks
        .find()
        .exec()
        .then((res) =>
          res?.map((e) => {
            list.push(e?._data);
            setTaskList(list);
          })
        );
    }
  };

  const accordianChangeHandler =
    (panel: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const addTaskHandler = () => {
    setOpenForm(true);
  };

  const closeBackDropHandler = () => {
    setOpenForm(false);
    setFormData({ title: "" });
    setChecklist([]);
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormError(false);
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const inputChecklistHandler =
    (id: number | undefined) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newData = [...checklist];
      const existingDataIndex = checklist?.findIndex((list) => list?.id === id);
      if (existingDataIndex !== -1) {
        newData[existingDataIndex].label = event.target.value;
      }
      setChecklist(newData);
    };

  const submitTaskHandler = async () => {
    if (db) {
      if (formData?.title?.length > 0) {
        await createTask(db, +new Date(), formData?.title, checklist);
        fetchAllTasks();
        setFormData({ title: "" });
        setChecklist([]);
        setOpenForm(false);
      } else {
        setFormError(true);
      }
    }
  };

  const addCheckListItemsHandler = () => {
    setChecklist((prev) => [
      ...prev,
      { id: +new Date(), label: "", completed: false },
    ]);
  };

  const checkBoxChangeHandler = async (
    taskListId: number,
    checklistId: number
  ) => {
    if (db) {
      const selectedDocument = await db?.collections?.tasks
        ?.findOne({
          selector: {
            id: taskListId,
          },
        })
        .exec();

      const exisitingData = selectedDocument.toMutableJSON();
      const itemIndex = exisitingData.checklist.findIndex(
        (item: ChecklistProps) => item.id === checklistId
      );

      if (itemIndex !== -1) {
        exisitingData.checklist[itemIndex].completed =
          !exisitingData.checklist[itemIndex].completed;
      }
      await selectedDocument.update({
        $set: {
          checklist: exisitingData?.checklist,
        },
      });
      fetchAllTasks();
    }
  };

  const openChecklistFormHandler = (taskId: number) => {
    setOpenChecklistForm(taskId);
  };

  useEffect(() => {
    fetchAllTasks();
    return () => {
      db?.destroy();
    };
  }, [db]);

  return {
    taskList,
    expanded,
    openForm,
    formData,
    checklist,
    openChecklistForm,
    formError,
    fetchAllTasks,
    setOpenChecklistForm,
    accordianChangeHandler,
    addTaskHandler,
    closeBackDropHandler,
    inputChangeHandler,
    inputChecklistHandler,
    submitTaskHandler,
    openChecklistFormHandler,
    addCheckListItemsHandler,
    checkBoxChangeHandler,
  };
};
