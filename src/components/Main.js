import React from "react";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import CollectionList from "./CollectionList";
import LearningNoteList from "./LearningNoteList";
import LabelList from "./LabelList";

const Main = () => {
  const theme = useTheme();

  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <div style={{ padding: "1rem" }}>
      <Grid container spacing={2}>
        {isLargeScreen && (
          <Grid item lg={2}>
            <CollectionList />
          </Grid>
        )}

        <Grid item xs={12} md={9} lg={8}>
          <LearningNoteList />
        </Grid>

        <Grid item md={3} lg={2} >
          <LabelList />
        </Grid>
      </Grid>
    </div>
  );
};

export default Main;
