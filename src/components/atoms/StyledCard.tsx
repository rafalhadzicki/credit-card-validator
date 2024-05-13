import { Card, styled } from "@mui/material";

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  [theme.breakpoints.down("sm")]: {
    boxShadow: "none",
    minWidth: "90vw",
    padding: theme.spacing(2),
  },
  [theme.breakpoints.up("sm")]: {
    maxWidth: 500,
    padding: theme.spacing(6),
    boxShadow:
      "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)",
  },
}));

export default StyledCard;
