import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Button } from "@mui/material";
import FeatureDemo from "./FeatureDemo";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      sx={{ minHeight: "100vh", textAlign: "center", px: 2, mt: 2 }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{ color: "primary.main", mb: 4 }}
      >
        Welcome to Learning Timeline App
      </Typography>

      <Typography
        variant="body1"
        sx={{ color: "text.secondary", mb: 4, maxWidth: "700px" }}
      >
        Learning Timeline is your personal tool to track your daily learning
        activities. Organize your thoughts, take notes, and generate quizzes
        from your learning materials to reinforce your knowledge. With our
        intuitive interface, you can search, categorize, and review your notes
        effortlessly, helping you stay on top of your educational goals.
      </Typography>

      <Typography variant="h4" sx={{ color: "primary.main", mb: 1 }}>Try it now!</Typography>
      <Box>
        <Button variant="contained" onClick={() => navigate("/login")} sx={{ mr: 2 }}>
          Login
        </Button>
        <Button variant="contained" onClick={() => navigate("/register")} sx={{ ml: 2 }}>
          Register
        </Button>
      </Box>

      <br />

      <FeatureDemo />

      <br />
      <br />
    </Grid>
  );
};

export default LandingPage;
