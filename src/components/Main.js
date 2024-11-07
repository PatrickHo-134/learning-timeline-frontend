import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLabels } from "../actions/labelActions";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import CollectionList from "./CollectionList";
import LearningNoteList from "./LearningNoteList";
import LabelList from "./LabelList";
import { fetchCollections } from "../actions/collectionActions";

const Main = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const userInfo = useSelector((state) => state.userLogin.userInfo);

  // Since both LearningNoteList and LabelList both need to fetch labels,
  // it makes more sense to place fetchLabels in this component
  // instead of duplicating it inside LearningNoteList and LabelList
  useEffect(() => {
    dispatch(fetchLabels(userInfo));
  }, [dispatch, userInfo]);
  // Same with CollectionList
  useEffect(() => {
    dispatch(fetchCollections(userInfo));
  }, [dispatch, userInfo]);

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
