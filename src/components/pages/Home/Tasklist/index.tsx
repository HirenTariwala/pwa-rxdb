import "./tasklist.css";
import Divider from "../../../common/Divider";
import Badge from "../../../common/Badge";
import { tasklistProps } from "./tasklist";
import Typography from "../../../common/Typography";
import Accordian from "../../../common/Accordian";
import Checkbox from "../../../common/CheckBox";
import Button from "../../../common/Button";

const Tasklist = ({
  list,
  expanded,
  accordianChangeHandler,
  openChecklistFormHandler,
  checkBoxChangeHandler,
}: tasklistProps) => {
  return (
    <div className="taskListContainer">
      {list?.length ? (
        list?.map((task, index) => (
          <div className="taskContainer" key={index}>
            <div className="title">
              <Typography variant="h5">{task?.title}</Typography>
              <div>
                {task?.checklist?.length ? (
                  <div className="badgeContainer">
                    <Typography variant="caption">
                      <Badge
                        variant="dot"
                        color={
                          task?.checklist?.filter((e) => !e?.completed)?.length
                            ? "error"
                            : "success"
                        }
                        sx={{ marginLeft: "5px", marginTop: "-2px" }}
                      ></Badge>
                    </Typography>
                    <Typography
                      variant="caption"
                      color={
                        task?.checklist?.filter((e) => !e?.completed)?.length
                          ? "red"
                          : "greeb"
                      }
                    >
                      {task?.checklist?.filter((e) => !e?.completed)?.length
                        ? "Pending"
                        : "Done"}
                    </Typography>
                  </div>
                ) : (
                  <Typography variant="caption" color="grey">
                    No checklist
                  </Typography>
                )}
              </div>
            </div>
            <Divider />
            <div className="accordian">
              <Accordian
                expanded={expanded === index}
                title={"Checklist"}
                steps={task?.checklist?.length}
                onChange={accordianChangeHandler(index)}
              >
                <>
                  {task.checklist.map((item, index) => (
                    <div key={index} className="checkboxContainer">
                      <Checkbox
                        checked={item?.completed}
                        onChange={() =>
                          checkBoxChangeHandler(task?.id, item?.id)
                        }
                        color="success"
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                      />
                      <div className="checkboxData">
                        <Typography variant="body1">{item?.label}</Typography>
                        <div className="badgeContainer">
                          <Typography variant="caption">
                            <Badge
                              variant="dot"
                              color={item?.completed ? "success" : "error"}
                              sx={{ marginLeft: "5px", marginTop: "-2px" }}
                            ></Badge>
                          </Typography>
                          <Typography
                            variant="caption"
                            color={item.completed ? "green" : "red"}
                          >
                            {item?.completed ? "Done" : "Pending"}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button
                    color="info"
                    onClick={() => openChecklistFormHandler(task?.id)}
                  >
                    <Typography variant="caption"> + Add New Item</Typography>
                  </Button>
                </>
              </Accordian>
            </div>
          </div>
        ))
      ) : (
        <div className="notask">
          <Typography variant="h6">No Task , Please add some tasks</Typography>
        </div>
      )}
    </div>
  );
};
export default Tasklist;
