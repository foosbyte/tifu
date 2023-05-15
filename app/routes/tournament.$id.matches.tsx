import {
  Box,
  Container,
  FormControl,
  InputLabel,
  NativeSelect,
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
import { useState } from "react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export const loader = async () => {
  return json({
    matches: [
      {
        round: "1",
        table: "1",
        team1: "Team A",
        team2: "Team B",
        score: "1-0",
      },
      {
        round: "1",
        table: "2",
        team1: "Team C",
        team2: "Team D",
        score: "0-1",
      },
      {
        round: "2",
        table: "1",
        team1: "Team A",
        team2: "Team D",
        score: "2-1",
      },
    ],
  });
};

export default function Tournament() {
  const { matches } = useLoaderData<typeof loader>();

  const [roundFilter, setRoundFilter] = useState("all");

  const rounds = [...new Set(matches.map((match) => match.round))];

  const handleChange = (event: any) => {
    setRoundFilter(event.target.value);
  };

  const filteredMatches = matches.filter((match) =>
    roundFilter === "all" ? true : match.round === roundFilter
  );

  return (
    <Container>
      <Box my={2}>
        <Typography variant="h5" component="h2" gutterBottom>
          Matches
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel variant="standard" htmlFor="matches-round">
            Round
          </InputLabel>
          <NativeSelect
            defaultValue={roundFilter}
            onChange={handleChange}
            inputProps={{
              name: "matches-round",
              id: "matches-round",
            }}
          >
            <option value="all">All</option>
            {rounds.map((round) => (
              <option key={round} value={round}>
                {round}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Round</TableCell>
                <TableCell>Table</TableCell>
                <TableCell>Team 1</TableCell>
                <TableCell>Team 2</TableCell>
                <TableCell>Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMatches.map((match, index) => (
                <TableRow key={index}>
                  <TableCell>{match.round}</TableCell>
                  <TableCell>{match.table}</TableCell>
                  <TableCell>{match.team1}</TableCell>
                  <TableCell>{match.team2}</TableCell>
                  <TableCell>{match.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
