import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Container } from "@mui/material";
import { fetchLearningNotes } from "../actions/learningNoteActions";
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
    searching,
    searchedNotes,
  } = useSelector((state) => state.learningNotes);

  const [pageNumber, setPageNumber] = useState(1);
  const observer = useRef();

  const allCollections = useSelector(
    (state) => state.collectionList.collections
  );
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const { selectedCategory, selectedLabels } = useSelector(
    (state) => state.pageFilter
  );

  const selectedCollectionName = allCollections.filter(
    (coll) => coll.id === selectedCategory
  )[0]?.name;

  // Fetch notes starting from page 1 when selectedCategory or selectedLabels is updated
  useEffect(() => {
    if (
      userInfo &&
      selectedCategory !== undefined &&
      selectedCategory !== null
    ) {
      setPageNumber(1);
      dispatch(fetchLearningNotes(1, selectedCategory, selectedLabels));
    }
  }, [dispatch, userInfo, selectedCategory, selectedLabels]);

  // Fetch next page with the same selectedCategory and selectedLabels
  useEffect(() => {
    if (pageNumber > 1 && !loading) {
      dispatch(
        fetchLearningNotes(pageNumber, selectedCategory, selectedLabels)
      );
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

  return (
    <Container maxWidth="md">
      <h2>{selectedCollectionName}</h2>

      <AddLearningNoteModal />

      {searching ? (
        Array.isArray(searchedNotes) && searchedNotes.length === 0 ? (
          <p>No result found</p>
        ) : (
          Array.isArray(searchedNotes) &&
          searchedNotes.map((note) => (
            <div key={note.id}>
              <LearningNoteCard learningNote={note} />
            </div>
          ))
        )
      ) : Array.isArray(learningNoteList) && learningNoteList.length === 0 ? (
        <p>Your Timeline is empty. Let's create your first note.</p>
      ) : (
        Array.isArray(learningNoteList) &&
        learningNoteList.map((note, index) => (
          <div
            key={note.id}
            ref={learningNoteList.length === index + 1 ? lastNoteRef : null}
          >
            <LearningNoteCard learningNote={note} />
          </div>
        ))
      )}

      {loading && <LoadingIcon />}
    </Container>
  );
};

export default LearningNoteList;
