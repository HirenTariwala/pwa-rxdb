import { Backdrop as BackDropComponent, BackdropProps } from "@mui/material";

const BackDrop = ({ open, onClick, children }: BackdropProps) => {
  return (
    <BackDropComponent
      sx={{ color: "#fff", zIndex: 10 }}
      open={open}
      onClick={onClick}
    >
      {children}
    </BackDropComponent>
  );
};

export default BackDrop;
