import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Box, TextField } from "@mui/material";

import { createLearningNote } from "../actions/learningNoteActions";
import { NoteContent } from "./ReactQuill";

const AddLearningNoteModal = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [labels, setLabels] = useState([]);
  const userInfo = useSelector((state) => state.userLogin.userInfo);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    setTitle("");
    setContent("");
    setLabels([]);
  };

  const handleAddNote = async () => {
    const newNote = {
      title,
      content,
      created_at: new Date().toISOString(),
      user: userInfo.id,
      labels,
    };

    try {
      dispatch(createLearningNote(newNote, userInfo));
      setTitle("");
      setContent("");
      toggleModal();
    } catch (error) {
      console.error("Error adding learning note:", error);
    }
  };

  return (
    <div>
      <Button
        color="info"
        variant="contained"
        aria-label="Add new note"
        onClick={toggleModal}
        style={{ marginBottom: '1rem' }}
      >
        + Add a card
      </Button>

      <Modal open={modalOpen} onClose={toggleModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
            minWidth: "70%",
            maxHeight: "90%",
          }}
        >
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <NoteContent content={content} setContent={setContent} />

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddNote}
            sx={{ mt: 2 }}
          >
            Add Note
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AddLearningNoteModal;
