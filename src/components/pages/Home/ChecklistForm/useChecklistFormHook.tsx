import React, { useState } from "react";
import { Checklistprops } from "./checklist";

export const useChecklistFormHook = ({
  openChecklistForm,
  setOpenChecklistForm,
  db,
  fetchAllTasks,
}: Checklistprops) => {
  const [addedChecklist, setAddedChecklist] = useState<string>("");
  const [checklistError, setChecklistError] = useState(false);
  const newChecklistHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecklistError(false);
    setAddedChecklist(event.target.value);
  };

  const closeChecklistBackDropHandler = () => {
    setAddedChecklist("");
    setOpenChecklistForm(null);
  };

  const submitChecklistHandler = async () => {
    if (db) {
      if (addedChecklist?.length > 0) {
        const selectedDocument = await db?.collections.tasks
          .findOne({
            selector: {
              id: openChecklistForm,
            },
          })
          .exec();
        const exisitingChecklist = selectedDocument?.get("checklist");
        await selectedDocument.update({
          $set: {
            checklist: [
              ...exisitingChecklist,
              { id: +new Date(), label: addedChecklist, completed: false },
            ],
          },
        });
        fetchAllTasks();
        setAddedChecklist("");
        setOpenChecklistForm(null);
      } else {
        setChecklistError(true);
      }
    }
  };
  return {
    addedChecklist,
    checklistError,
    newChecklistHandler,
    closeChecklistBackDropHandler,
    submitChecklistHandler,
  };
};
