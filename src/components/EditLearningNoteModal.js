import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Box, TextField, Button } from "@mui/material";

import { updateLearningNote } from "../actions/learningNoteActions";
import { NoteContent } from "./ReactQuill";

const EditLearningNoteModal = ({ learningNote, onClose }) => {
  const [title, setTitle] = useState(learningNote.title);
  const [content, setContent] = useState(learningNote.content);
  // eslint-disable-next-line
  const [labels, setLabels] = useState(learningNote.labels);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userLogin.userInfo);

  const handleSave = () => {
    dispatch(updateLearningNote(learningNote.id, { title, content, labels }, userInfo));
    onClose();
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 3,
          borderRadius: 2,
          minWidth: "70%",
          maxHeight: "90%",
        }}
      >
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <NoteContent content={content} setContent={setContent} />

        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default EditLearningNoteModal;
