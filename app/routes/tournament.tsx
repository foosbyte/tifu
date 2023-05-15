import EventIcon from "@mui/icons-material/Event";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { BottomNavigationAction } from "@mui/material";
import { Link, Outlet } from "@remix-run/react";

export const handle = {
  bottomNav(replace: boolean) {
    return [
      <BottomNavigationAction
        key="1"
        label="Live & Overview"
        component={Link}
        to="/tournament/1"
        value="/tournament/1"
        replace={replace}
        sx={{ whiteSpace: "nowrap" }}
        icon={<LiveTvIcon />}
      />,
      <BottomNavigationAction
        key="2"
        label="Brackets"
        component={Link}
        to="/tournament/1/brackets"
        value="/tournament/1/brackets"
        replace={replace}
        sx={{ whiteSpace: "nowrap" }}
        icon={<ViewModuleIcon />}
      />,
      <BottomNavigationAction
        key="3"
        label="Matches"
        component={Link}
        to="/tournament/1/matches"
        value="/tournament/1/matches"
        replace={replace}
        sx={{ whiteSpace: "nowrap" }}
        icon={<EventIcon />}
      />,
      <BottomNavigationAction
        key="4"
        label="Rankings"
        component={Link}
        to="/tournament/1/rankings"
        value="/tournament/1/rankings"
        replace={replace}
        sx={{ whiteSpace: "nowrap" }}
        icon={<FormatListNumberedIcon />}
      />,
    ];
  },
};

export default function TournamentLayout() {
  return <Outlet />;
}
