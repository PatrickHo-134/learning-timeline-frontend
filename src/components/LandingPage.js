import React from "react";
import {
  Box,
  Typography,
  Grid,
} from "@mui/material";

const LandingPage = () => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", textAlign: "center", px: 2 }}
    >
      <Typography variant="h3" gutterBottom sx={{ color: "primary.main", mb: 4 }}>
        Welcome to Learning Timeline App
      </Typography>

      <Typography variant="body1" sx={{ color: "text.secondary", mb: 4, maxWidth: "600px" }}>
        Learning Timeline is your personal tool to keep track of everything you learn each day.
        Organize your thoughts, take notes, and create flashcards to reinforce your knowledge.
        With our simple and effective interface, you can search, categorize, and review your learning
        notes effortlessly, helping you stay on top of your educational goals.
      </Typography>

      <Box
        component="img"
        src={`${process.env.PUBLIC_URL}/main-timeline.png`}
        alt="main-timeline-image"
        loading="lazy"
        sx={{
          width: { xs: "100%", sm: "80%", md: "80%" },
          maxWidth: "800px",
          height: "auto",
        }}
      />
    </Grid>
  );
};

export default LandingPage;
