import { Container, List, ListItemButton, ListItemText } from "@mui/material";
import { json, type V2_MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getTournamentsList } from "~/models/tournaments.server";

export const meta: V2_MetaFunction = () => {
  return [{ title: "TiFu" }];
};

export const loader = async () => {
  return json({
    tournaments: await getTournamentsList(),
  });
};

export default function Index() {
  const { tournaments } = useLoaderData<typeof loader>();
  return (
    <Container>
      <List>
        {tournaments.map((tournament) => (
          <ListItemButton
            component={Link}
            to={`/tournament/${tournament.id}`}
            key={tournament.id}
          >
            <ListItemText
              primary={tournament.name}
              secondary={`Date: ${tournament.date} | City: ${tournament.location}`}
            />
          </ListItemButton>
        ))}
      </List>
    </Container>
  );
}
