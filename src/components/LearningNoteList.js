import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/material";
import {
  fetchLearningNotes,
  createLearningNote,
} from "../actions/learningNoteActions";
import LearningNoteCard from "./LearningNoteCard";
import AddLearningNoteModal from "./AddLearningNoteModal";

const LearningNoteList = () => {
  const dispatch = useDispatch();

  const [pageNumber, setPageNumber] = useState(1);

  const observer = useRef();

  const {
    notes: learningNoteList,
    loading,
    nextPage,
  } = useSelector((state) => state.learningNotes);
  const allCollections = useSelector(
    (state) => state.collectionList.collections
  );
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const { selectedCategory } = useSelector((state) => state.pageFilter);

  const selectedCollectionName = allCollections.filter(
    (coll) => coll.id === selectedCategory
  )[0]?.name;

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchLearningNotes(selectedCategory, pageNumber));
    }
  }, [dispatch, userInfo, selectedCategory, pageNumber]);

  const lastNoteRef = (node) => {
    if (loading) return; // Don't observe while loading

    if (observer.current) observer.current.disconnect(); // Disconnect previous observer

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && nextPage) {
        setPageNumber((prevPage) => prevPage + 1); // Load next page when user reaches the bottom
      }
    });

    if (node) observer.current.observe(node); // Observe the last note
  };

  const handleAddNote = (newNote) => {
    dispatch(createLearningNote(newNote));
  };

  return (
    <Container maxWidth="md">
      <h2>{selectedCollectionName}</h2>

      <AddLearningNoteModal onAddNote={handleAddNote} />

      {Array.isArray(learningNoteList) && learningNoteList.length === 0 ? (
        <p>Your Timeline is empty. Let's create your first note.</p>
      ) : (
        Array.isArray(learningNoteList) &&
        learningNoteList.map((note, index) => (
          <div
            key={note.id}
            ref={learningNoteList.length === index + 1 ? lastNoteRef : null}
          >
            <LearningNoteCard key={note.id} learningNote={note} />
          </div>
        ))
      )}
    </Container>
  );
};

export default LearningNoteList;
