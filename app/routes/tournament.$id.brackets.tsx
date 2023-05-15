import { Box, Container, Typography } from "@mui/material";
import { type V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export default function Teams() {
  return (
    <Container>
      <Box my={2}>
        <Typography variant="h4" component="div" gutterBottom>
          Brackets
        </Typography>
      </Box>
    </Container>
  );
}
