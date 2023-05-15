import {
  Box,
  Container,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { json, type V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export const loader = async () => {
  return json({
    tournament: {
      id: 1,
      name: "Tournament 1",
      city: "City 1",
      date: "2023-06-01",
      status: "Upcoming",
      teams: 10,
    },
    activeMatches: [
      {
        round: 1,
        team1: "Team A",
        team2: "Team B",
        table: 1,
        startTime: "10:00 AM",
      },
      {
        round: 1,
        team1: "Team A",
        team2: "Team B",
        table: 1,
        startTime: "10:00 AM",
      },
      {
        round: 1,
        team1: "Team A",
        team2: "Team B",
        table: 1,
        startTime: "10:00 AM",
      },
      {
        round: 1,
        team1: "Team A",
        team2: "Team B",
        table: 1,
        startTime: "10:00 AM",
      },
    ],
    upcomingMatches: [
      { round: 2, team1: "Team C", team2: "Team D" },
      { round: 2, team1: "Team C", team2: "Team D" },
      { round: 2, team1: "Team C", team2: "Team D" },
      { round: 2, team1: "Team C", team2: "Team D" },
      { round: 2, team1: "Team C", team2: "Team D" },
      { round: 2, team1: "Team C", team2: "Team D" },
    ],
  });
};

export default function Tournament() {
  const { activeMatches, upcomingMatches, tournament } =
    useLoaderData<typeof loader>();

  return (
    <Container>
      <Box p={2}>
        <Typography variant="h4">{tournament.name}</Typography>
        <Typography variant="subtitle1">{`${tournament.date} - ${tournament.city}`}</Typography>
        <Typography variant="subtitle2">{`Status: ${tournament.status}`}</Typography>

        <Divider />

        <Typography variant="h5">Active Matches</Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Round</TableCell>
                <TableCell>Table</TableCell>
                <TableCell>Team 1</TableCell>
                <TableCell>Team 2</TableCell>
                <TableCell>Start Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activeMatches.map((match, index) => (
                <TableRow key={index}>
                  <TableCell>{match.round}</TableCell>
                  <TableCell>{match.table}</TableCell>
                  <TableCell>{match.team1}</TableCell>
                  <TableCell>{match.team2}</TableCell>
                  <TableCell>{match.startTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Divider />

        <Typography variant="h5">Upcoming Matches</Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Round</TableCell>
                <TableCell>Team 1</TableCell>
                <TableCell>Team 2</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {upcomingMatches.map((match, index) => (
                <TableRow key={index}>
                  <TableCell>{match.round}</TableCell>
                  <TableCell>{match.team1}</TableCell>
                  <TableCell>{match.team2}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
