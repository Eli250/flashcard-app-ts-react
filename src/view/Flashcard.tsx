import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import CardList from "./CardList";

export default function Flashcard() {
  return (
    <Container>
      <Typography variant="h6">Flashcards</Typography>
      <CardList />
    </Container>
  );
}
