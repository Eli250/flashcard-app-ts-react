import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { IFlashcardType } from "../redux/reducers/card.reducer";

interface Props {
  flashcard: IFlashcardType;
}
export default function FlipCard({ flashcard }: Props) {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <Card
        onClick={() => {
          setIsFlipped(true);
        }}
        sx={{
          display: "flex",
          padding: "10px",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          width: 300,
          height: 300,
        }}
      >
        <CardActionArea value={flashcard.id}>
          <CardMedia
            component="img"
            alt="Image"
            height="230"
            width="auto"
            image={flashcard.image}
          />
        </CardActionArea>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography>{flashcard.id}</Typography>

          <Typography>{flashcard.question}</Typography>
        </CardContent>
      </Card>
      <Card
        onClick={() => {
          setIsFlipped((prev) => !prev);
        }}
        sx={{
          display: "block",
          padding: "10px",
          justifyContent: "space-around",
          alignItems: "center",
          width: 300,
          height: 300,
        }}
      >
        <Grid
          container
          direction="column"
          alignItems="center"
          spacing={5}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Grid item>
            <Typography>Answer: {flashcard.answer}</Typography>
          </Grid>
          <Grid item>
            <Typography> Details: {flashcard.details}</Typography>
          </Grid>
        </Grid>
      </Card>
    </ReactCardFlip>
  );
}
