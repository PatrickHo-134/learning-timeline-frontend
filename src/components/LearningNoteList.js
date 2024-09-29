import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import {
  fetchLearningNotes,
  createLearningNote,
} from "../actions/learningNoteActions";
import LearningNoteCard from "./LearningNoteCard";
import AddLearningNoteModal from "./AddLearningNoteModal";
import { fetchLabels } from "../actions/labelActions";

const LearningNoteList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const learningNotes = useSelector(
    (state) => state.learningNotes.learningNotes
  );
  const allCollections = useSelector(
    (state) => state.collectionList.collections
  );
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const { selectedCategory, selectedLabels } = useSelector((state) => state.pageFilter);
  const selectedCollectionName = allCollections.filter((coll) => coll.id === selectedCategory)[0].name;

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchLearningNotes({collectionId:selectedCategory, labels:selectedLabels, userInfo:userInfo}));
      dispatch(fetchLabels(userInfo));
    } else {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  const handleAddNote = (newNote) => {
    dispatch(createLearningNote(newNote));
  };

  return (
    <Container maxWidth="md">
      <h2>{selectedCollectionName}</h2>
      <AddLearningNoteModal onAddNote={handleAddNote} />
      {Array.isArray(learningNotes) && learningNotes.length === 0 ? (
        <p>Your Timeline is empty. Let's create your first note.</p>
      ) : (
        Array.isArray(learningNotes) &&
        learningNotes.map((note) => (
          <LearningNoteCard key={note.id} learningNote={note} />
        ))
      )}
    </Container>
  );
};

export default LearningNoteList;
