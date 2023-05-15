import {
  Box,
  Container,
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
    rankings: [
      {
        teamName: "Player 1 / Player 2",
        matches: 5,
        points: 20,
        buchholz: 10,
        medianBuchholz: 15,
      },
      {
        teamName: "Player 3 / Player 4",
        matches: 5,
        points: 18,
        buchholz: 10,
        medianBuchholz: 15,
      },
      {
        teamName: "Player 5 / Player 6",
        matches: 5,
        points: 15,
        buchholz: 10,
        medianBuchholz: 15,
      },
    ],
  });
};

export default function Tournament() {
  const { rankings } = useLoaderData<typeof loader>();

  return (
    <Container>
      <Box my={2}>
        <Typography variant="h5" component="h2" gutterBottom>
          Rankings
        </Typography>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Team</TableCell>
                <TableCell align="right">Matches</TableCell>
                <TableCell align="right">Points</TableCell>
                <TableCell align="right">Buchholz</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rankings.map((ranking, index) => (
                <TableRow key={ranking.teamName}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    {ranking.teamName}
                  </TableCell>
                  <TableCell align="right">{ranking.matches}</TableCell>
                  <TableCell align="right">{ranking.points}</TableCell>
                  <TableCell align="right">
                    {ranking.buchholz} / {ranking.medianBuchholz}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
