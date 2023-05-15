import { AppBar as MuiAppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "@remix-run/react";

export function AppBar() {
  return (
    <MuiAppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component={Link}
          to="/"
          sx={{
            mr: 2,
            fontWeight: 700,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          TiFu
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
}
