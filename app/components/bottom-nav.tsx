import { BottomNavigation } from "@mui/material";
import { useLocation, useMatches } from "@remix-run/react";

export function Bottomnav() {
  const matches = useMatches();
  const location = useLocation();

  return (
    <BottomNavigation value={location.pathname} showLabels>
      {matches
        .filter((match) => match.handle && match.handle.bottomNav)
        .map((match) => match.handle?.bottomNav(false))}
    </BottomNavigation>
  );
}
