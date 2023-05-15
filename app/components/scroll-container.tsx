import { styled } from "@mui/material";

export const ScrollContainerOuter = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "calc(100% - 64px)",
  maxHeight: "calc(100% - 64px)",
  [theme.breakpoints.down("sm")]: {
    height: "calc(100% - 56px)",
    maxHeight: "calc(100% - 56px)",
  },
}));

export const ScrollContainerInner = styled("main")({
  flex: 1,
  overflow: "auto",
});
