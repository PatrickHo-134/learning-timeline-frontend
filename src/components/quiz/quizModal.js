import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeQuizModal } from "../../actions/quizActions";
import { LoadingIcon } from "../Icons";

const QuestionCard = ({ content, questionNumber, showAnswer }) => {
  const { question, options, answer } = content;
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          <strong>
            Q{questionNumber}: {question}
          </strong>
        </Typography>

        <List dense>
          {options.map((option, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <Checkbox edge="start" disableRipple />
              </ListItemIcon>
              <ListItemText primary={option} />
            </ListItem>
          ))}
        </List>

        {showAnswer && (
          <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
            <strong>Answer:</strong> {answer}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export const QuizModal = ({ showModal }) => {
  const dispatch = useDispatch();
  const { questions, loading } = useSelector((state) => state.quiz);
  const [showAnswers, setShowAnswers] = useState(false);

  const handleClose = () => {
    dispatch(closeQuizModal());
    setShowAnswers(false);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxHeight: "90%",
    maxWidth: 600,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal open={showModal} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography
          id="questions-modal-title"
          variant="h4"
          component="h2"
          sx={{ textAlign: "center" }}
          gutterBottom
        >
          Quiz
        </Typography>

        <Box
          id="questions-modal-description"
          sx={{ maxHeight: "40rem", overflowY: "auto" }}
        >
          {!loading && questions.length === 0 ? (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "center", mb: 4 }}
            >
              No questions available.
            </Typography>
          ) : (
            questions.map((q, index) => (
              <QuestionCard
                key={index}
                content={q}
                questionNumber={index + 1}
                showAnswer={showAnswers}
              />
            ))
          )}

          {loading && (
            <Box>
              <Typography
                id="questions-modal-title"
                variant="h6"
                component="h2"
                sx={{ textAlign: "center", mb: 4 }}
                gutterBottom
              >
                Generating quiz...
              </Typography>
              <LoadingIcon />
            </Box>
          )}
        </Box>

        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          {!loading && questions.length > 0 && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowAnswers(true)}
            >
              Show Answers
            </Button>
          )}

          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Close
          </Button>
        </CardActions>
      </Box>
    </Modal>
  );
};
