import "./home.css";
import Button from "../../common/Button";
import Tasklist from "./Tasklist";
import Typography from "../../common/Typography";
import { homeProps } from "./home";
import { useHomeHook } from "./useHomeHook";
import BackDrop from "../../common/BackDrop";
import BackDropForm from "./BackDropForm";
import ChecklistForm from "./ChecklistForm";

const Home = ({ db }: homeProps) => {
  const {
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
    inputChecklistHandler,
    inputChangeHandler,
    submitTaskHandler,
    openChecklistFormHandler,
    addCheckListItemsHandler,
    checkBoxChangeHandler,
  } = useHomeHook(db);

  return (
    <div className="homeContainer">
      <Typography variant="h3">List of Tasks</Typography>
      <div className="taskBtnContainer">
        <Button
          className="addTaskBtn"
          color="primary"
          variant="contained"
          onClick={addTaskHandler}
        >
          + Add Task
        </Button>
      </div>

      <div className="allTaskContainer">
        <Tasklist
          list={taskList}
          expanded={expanded}
          accordianChangeHandler={accordianChangeHandler}
          openChecklistFormHandler={openChecklistFormHandler}
          checkBoxChangeHandler={checkBoxChangeHandler}
        />
      </div>
      <BackDrop open={openForm}>
        <BackDropForm
          formData={formData}
          formError={formError}
          checklist={checklist}
          submitTaskHandler={submitTaskHandler}
          closeBackDropHandler={closeBackDropHandler}
          inputChecklistHandler={inputChecklistHandler}
          inputChangeHandler={inputChangeHandler}
          addCheckListItemsHandler={addCheckListItemsHandler}
        />
      </BackDrop>
      <BackDrop open={Boolean(openChecklistForm)}>
        <ChecklistForm
          setOpenChecklistForm={setOpenChecklistForm}
          db={db}
          openChecklistForm={openChecklistForm}
          fetchAllTasks={fetchAllTasks}
        />
      </BackDrop>
    </div>
  );
};

export default Home;
