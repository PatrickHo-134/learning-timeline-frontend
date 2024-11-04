import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Container } from "@mui/material";
import {
  fetchLearningNotes,
  createLearningNote,
} from "../actions/learningNoteActions";
import LearningNoteCard from "./LearningNoteCard";
import AddLearningNoteModal from "./AddLearningNoteModal";

const LoadingIcon = () => {
  return (
    <div style={{ textAlign: "center", height: "10rem" }}>
      {" "}
      <CircularProgress />{" "}
    </div>
  );
};

const LearningNoteList = () => {
  const dispatch = useDispatch();

  const {
    notes: learningNoteList,
    loading,
    nextPage,
    totalPages,
  } = useSelector((state) => state.learningNotes);

  const [pageNumber, setPageNumber] = useState(1);
  const observer = useRef();

  const allCollections = useSelector(
    (state) => state.collectionList.collections
  );
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const { selectedCategory } = useSelector((state) => state.pageFilter);

  const selectedCollectionName = allCollections.filter(
    (coll) => coll.id === selectedCategory
  )[0]?.name;

  useEffect(() => {
    if (userInfo && selectedCategory !== undefined && selectedCategory !== null) {
      setPageNumber(1);
      dispatch(fetchLearningNotes(1));
    }
  }, [dispatch, userInfo, selectedCategory]);

  useEffect(() => {
    if (pageNumber > 1 && !loading) {
      dispatch(fetchLearningNotes(pageNumber));
    }
  }, [dispatch, pageNumber]);

  const lastNoteRef = (node) => {
    if (loading) return; // Don't observe while loading

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && nextPage && pageNumber < totalPages) {
        setPageNumber((prevPage) => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  };

  const handleAddNote = (newNote) => {
    dispatch(createLearningNote(newNote));
  };

  return (
    <Container maxWidth="md">
      <h2>{selectedCollectionName}</h2>

      <AddLearningNoteModal onAddNote={handleAddNote} />

      {Array.isArray(learningNoteList) && learningNoteList.length === 0 && !loading ? (
        <p>Your Timeline is empty.</p>
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

      {loading && <LoadingIcon />}
    </Container>
  );
};

export default LearningNoteList;
