import { CircularProgress, styled } from "@mui/material";

const Spinner = styled(CircularProgress)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

export default Spinner;
