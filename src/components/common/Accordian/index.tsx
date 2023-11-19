import {
  Accordion as AccordianComponent,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import Typography from "../Typography";
import { AccordianProps } from "./accordian";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Accordian = ({
  expanded,
  steps,
  title,
  children,
  onChange,
}: AccordianProps) => {
  return (
    <AccordianComponent
      expanded={expanded}
      onChange={onChange}
      sx={{ backgroundColor: "bisque" }}
    >
      <AccordionSummary
        aria-controls="panel1d-content"
        id="panel1d-header"
        expandIcon={<ExpandMoreIcon />}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            paddingRight: "10px",
          }}
        >
          <Typography variant="h6">{title}</Typography>
          <Typography variant="caption">{`${steps} STEPS`}</Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </AccordianComponent>
  );
};

export default Accordian;
