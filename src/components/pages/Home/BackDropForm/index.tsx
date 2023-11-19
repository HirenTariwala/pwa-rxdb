import "./backDrop.css";
import Typography from "../../../common/Typography";
import TextField from "../../../common/TextField";
import Button from "../../../common/Button";
import { BackDropFormProps } from "./backDrop";

const BackDropForm = ({
  formData,
  formError,
  checklist,
  inputChangeHandler,
  closeBackDropHandler,
  submitTaskHandler,
  inputChecklistHandler,
  addCheckListItemsHandler,
}: BackDropFormProps) => {
  return (
    <div className="container">
      <Typography variant="h6" color="black">
        Add Task Form
      </Typography>
      <div className="form">
        <TextField
          label="Title"
          name="title"
          value={formData?.title}
          onChange={inputChangeHandler}
          fullWidth
          margin="normal"
          variant="outlined"
          helperText={
            formError && (
              <Typography variant="caption" color="red">
                Title is required
              </Typography>
            )
          }
        />
        {checklist?.length &&
          checklist?.map((e, index) => (
            <TextField
              label={`Checklist`}
              name="checklist"
              value={e?.label}
              onChange={inputChecklistHandler(e?.id)}
              fullWidth
              margin="normal"
              variant="outlined"
              key={index}
            />
          ))}
        <div className="addChecklistBtnContainer">
          <Button
            color="info"
            variant="outlined"
            onClick={addCheckListItemsHandler}
          >
            + Add Checklist Items
          </Button>
        </div>
      </div>
      <div className="actions">
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          onClick={closeBackDropHandler}
        >
          Close
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="success"
          onClick={submitTaskHandler}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default BackDropForm;
