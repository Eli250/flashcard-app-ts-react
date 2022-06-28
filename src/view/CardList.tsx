import { Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { Box } from "@mui/system";

export default function CardList() {
  return (
    <Box>
      <Grid
        container
        sx={{
          width: "100%",
          height: "100%",
          justifyContent: "flex-start",
          marginLeft: 0,
          fontFamily: "Josefin Sans, sans-serif",
        }}
        spacing={2}
      >
        <Grid item md={4} key={1} xs={2} sm={4}>
          <Card
            sx={{
              display: "flex",
              padding: "10px",
              justifyContent: "space-around",
              alignItems: "center",
              width: 400,
              height: 100,
            }}
          >
            <Typography>1</Typography>
            <Typography>What is a flashcard?</Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
