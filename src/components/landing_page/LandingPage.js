import React from "react";
import {
  Typography,
  Grid,
} from "@mui/material";
import FeatureDemo from "./FeatureDemo";

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

      <Typography variant="body1" sx={{ color: "text.secondary", mb: 4, maxWidth: "700px" }}>
        Learning Timeline is your personal tool to track your daily learning activities.
        Organize your thoughts, take notes, and generate quizzes from your learning materials to reinforce your knowledge.
        With our intuitive interface, you can search, categorize, and review your notes effortlessly,
        helping you stay on top of your educational goals.
      </Typography>

      <FeatureDemo />
    </Grid>
  );
};

export default LandingPage;
