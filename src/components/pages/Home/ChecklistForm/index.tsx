import "../BackDropForm/backDrop.css";
import Typography from "../../../common/Typography";
import TextField from "../../../common/TextField";
import Button from "../../../common/Button";
import { Checklistprops } from "./checklist";
import { useChecklistFormHook } from "./useChecklistFormHook";

const ChecklistForm = ({
  openChecklistForm,
  setOpenChecklistForm,
  db,
  fetchAllTasks,
}: Checklistprops) => {
  const {
    addedChecklist,
    checklistError,
    newChecklistHandler,
    closeChecklistBackDropHandler,
    submitChecklistHandler,
  } = useChecklistFormHook({
    openChecklistForm,
    setOpenChecklistForm,
    db,
    fetchAllTasks,
  });
  return (
    <div className="container">
      <Typography variant="h6" color="black">
        Add Checklist
      </Typography>
      <div className="form">
        <TextField
          label="Checklist"
          name="checklist"
          value={addedChecklist}
          onChange={newChecklistHandler}
          fullWidth
          margin="normal"
          variant="outlined"
          helperText={
            checklistError && (
              <Typography variant="caption" color="red">
                Checklist label is required
              </Typography>
            )
          }
        />
      </div>
      <div className="actions">
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          onClick={closeChecklistBackDropHandler}
        >
          Close
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="success"
          onClick={submitChecklistHandler}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ChecklistForm;
