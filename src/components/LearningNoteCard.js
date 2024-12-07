import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  Typography,
  Chip,
  CardActions,
  Collapse,
  Grid,
  Button,
} from "@mui/material";
import {
  Add as AddIcon,
  Info as InfoIcon,
  MoreVert as MoreVertIcon,
  LocalOffer as TagIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";
import moment from "moment";
import {
  archiveLearningNote,
  deleteLearningNote,
  addLabelToLearningNote,
  removeLabelFromLearningNote,
} from "../actions/learningNoteActions";
import EditLearningNoteModal from "./EditLearningNoteModal";
import LabelSelectPopover from "./LabelSelectPopover";
import LearningNoteLabel from "./LearningNoteLabel";
import { ReadOnlyContent } from "./ReactQuill";
import AddToCollectionModal from "./AddToCollectionModal";
import { QuizModal } from "./quiz/quizModal";
import { generateQuizForNote, openQuizModal } from "../actions/quizActions";

const calculateDaysSinceTimestamp = (timestamptz) => {
  const currentTimestamp = new Date();
  const pastTimestamp = new Date(timestamptz);
  const differenceInMs = currentTimestamp - pastTimestamp;
  const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

  return differenceInDays;
};

const CategoryTag = ({ tagName }) => {
  return <Chip label={tagName} icon={<TagIcon />} size="medium" />;
};

const CardTitle = ({ title, onClickHandler }) => {
  return (
    <div onClick={onClickHandler}>
      <ReactMarkdown
        children={title}
        components={{
          code: ({ node, ...props }) => (
            <span
              style={{
                fontFamily: "monospace",
                backgroundColor: "#f5f5f5",
                padding: "0 4px",
              }}
              {...props}
            />
          ),
          img: ({ node, ...props }) => (
            <img
              {...props}
              alt="icon"
              style={{
                display: "inline-block",
                verticalAlign: "middle",
                width: "16px",
                height: "16px",
              }}
            />
          ),
        }}
      />
    </div>
  );
};

const CardLabels = ({
  cardLabels,
  allLabels,
  removeLabelHandler,
  addLabelhandler,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        flexWrap: "wrap",
      }}
    >
      {Array.isArray(cardLabels) && cardLabels.length > 0 ? (
        cardLabels.map((labelId) => (
          <LearningNoteLabel
            key={labelId}
            labelId={labelId}
            labelList={allLabels}
            onRemoveLabel={removeLabelHandler}
          />
        ))
      ) : (
        <div></div>
      )}
      <IconButton onClick={addLabelhandler}>
        <AddIcon />
      </IconButton>
    </Box>
  );
};

const ShowContentButton = ({ showContent, onClickShowContent }) => {
  return (
    <IconButton
      expand={showContent}
      onClick={onClickShowContent}
      aria-expanded={showContent}
      aria-label="show more"
      color="primary"
      sx={{ marginTop: "1.5rem" }}
    >
      {showContent ? <ExpandLessIcon /> : <ExpandMoreIcon />}
    </IconButton>
  );
};

const InformationPopover = ({
  learningNote,
  isOpen,
  anchorEl,
  onClickHandle,
}) => {
  const { created_at, updated_at } = learningNote;

  return (
    <Popover
      open={isOpen}
      anchorEl={anchorEl}
      onClose={onClickHandle}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      disableRestoreFocus
    >
      <Box sx={{ padding: 1 }}>
        {updated_at && (
          <Typography variant="caption">
            Updated: {moment(updated_at).format("MMMM Do YYYY, h:mm a")}
            <br />
          </Typography>
        )}
        <Typography variant="caption">
          Created: {moment(created_at).format("MMMM Do YYYY, h:mm a")}
          <br />
        </Typography>
        <Typography variant="caption">
          Created {calculateDaysSinceTimestamp(created_at)} day(s) ago
        </Typography>
      </Box>
    </Popover>
  );
};

const LearningNoteCard = ({ learningNote }) => {
  const { id, created_at, title, content, updated_at, labels, collection } = learningNote;
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddToCollectionModal, setShowAddToCollectionModal] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const [labelPopoverAnchorEl, setLabelPopoverAnchorEl] = useState(null);

  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const labelList = useSelector((state) => state.labelList.labels);
  const collectionList = useSelector((state) => state.collectionList.collections);
  const noteCollectionInfo = collectionList.filter((collection) => collection.id === learningNote.collection)[0];
  const showQuizModal = useSelector((state) => state.quiz.isModalOpen);

  const dispatch = useDispatch();

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleArchive = () => {
    dispatch(archiveLearningNote(learningNote.id, userInfo));
    handleMenuClose();
  };

  const handleDelete = () => {
    dispatch(deleteLearningNote(learningNote.id, userInfo));
    handleMenuClose();
  };

  const handleEdit = () => {
    setShowEditModal(true);
    handleMenuClose();
  };

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  const handlePopoverClick = (event) => {
    setPopoverAnchorEl(popoverAnchorEl ? null : event.currentTarget);
  };

  const handleLabelPopoverOpen = (event) => {
    setLabelPopoverAnchorEl(event.currentTarget);
  };

  const handleLabelPopoverClose = () => {
    setLabelPopoverAnchorEl(null);
  };

  const handleAddLabel = (labelId) => {
    dispatch(addLabelToLearningNote(id, labelId));
    handleLabelPopoverClose();
  };

  const handleRemoveLabel = (labelId) => {
    dispatch(removeLabelFromLearningNote(id, labelId));
  };

  const handleAddToCollection = () => {
    setShowAddToCollectionModal(true);
    handleMenuClose();
  };

  const handleGenerateQuestions = () => {
    dispatch(openQuizModal());
    dispatch(generateQuizForNote(learningNote, userInfo));
  };

  return (
    <Card sx={{ marginBottom: "1rem" }}>
      <CardContent>
        <CardActions>
          <Grid container>
            <Grid
              item
              sm={12}
              md={4}
              lg={6}
              container
              justifyContent="flex-start"
              alignItems="center"
            >
              <IconButton aria-label="settings" onClick={handleMenuOpen}>
                <MoreVertIcon />
              </IconButton>
              <IconButton aria-label="information" onClick={handlePopoverClick}>
                <InfoIcon />
              </IconButton>
              {noteCollectionInfo ? <CategoryTag tagName={noteCollectionInfo.name} /> : <div></div>}
            </Grid>

            <Grid
              item
              sm={12}
              md={8}
              lg={6}
              container
              justifyContent="flex-end"
              alignItems="center"
            >
              <CardLabels
                cardLabels={labels}
                allLabels={labelList}
                removeLabelHandler={handleRemoveLabel}
                addLabelhandler={handleLabelPopoverOpen}
              />
            </Grid>
          </Grid>
        </CardActions>

        <CardHeader
          title={
            <CardTitle
              title={`${title}`}
              onClickHandler={toggleContentVisibility}
            />
          }
          action={
            <ShowContentButton
              showContent={isContentVisible}
              onClickShowContent={toggleContentVisibility}
            />
          }
          sx={{ paddingY: "0", paddingX: "0.5rem", marginY: "-0.5rem" }}
        />

        <Collapse in={isContentVisible} timeout="auto">
          <ReadOnlyContent content={content} />
          <Box
            component="section"
            sx={{ margin: 1 }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={handleGenerateQuestions}
            >
              Take Quiz
            </Button>
          </Box>
        </Collapse>
      </CardContent>

      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleAddToCollection}>Add to Category</MenuItem>
        <MenuItem onClick={handleArchive}>Archive</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>

      <InformationPopover
        learningNote={learningNote}
        isOpen={Boolean(popoverAnchorEl)}
        anchorEl={popoverAnchorEl}
        onClickHandle={handlePopoverClick}
      />

      {showEditModal && (
        <EditLearningNoteModal
          learningNote={learningNote}
          onClose={() => setShowEditModal(false)}
        />
      )}

      <LabelSelectPopover
        anchorEl={labelPopoverAnchorEl}
        open={Boolean(labelPopoverAnchorEl)}
        onClose={handleLabelPopoverClose}
        onLabelSelect={handleAddLabel}
        currentLabelIds={labels}
      />

      {showAddToCollectionModal && (
        <AddToCollectionModal
          noteInfo={learningNote}
          onClose={() => setShowAddToCollectionModal(false)}
        />
      )}

      {showQuizModal && <QuizModal showModal={showQuizModal} />}
    </Card>
  );
};

export default LearningNoteCard;
