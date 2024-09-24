import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { moveNoteToCollection } from "../actions/learningNoteActions";

const AddToCollectionModal = ({
  noteInfo,
  onClose,
}) => {
  const dispatch = useDispatch();
  const { loading, collections, error } = useSelector(
    (state) => state.collectionList
  );
  const [selectedCollection, setSelectedCollection] = useState(null);
  const { collection : currentCollectionId } = noteInfo;

  useEffect(() => {
    if (currentCollectionId) {
      const currentCollection = collections.find(
        (collection) => collection.id === currentCollectionId
      );
      setSelectedCollection(currentCollection);
    }
  }, [currentCollectionId, collections]);

  const handleAddToCollection = () => {
    if (selectedCollection) {
      dispatch(moveNoteToCollection(noteInfo, selectedCollection.id));
      onClose();
    }
  };

  // Filter non-archived collections excluding the current collection
  const availableCollections = collections.filter(
    (collection) => !collection.is_archived && collection.id !== 0
  );

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Select Collection</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <List>
            {availableCollections.map((collection) => (
              <ListItem
                key={collection.id}
                button
                selected={
                  selectedCollection && selectedCollection.id === collection.id
                }
                onClick={() => setSelectedCollection(collection)}
                sx={{
                  backgroundColor:
                    selectedCollection &&
                    selectedCollection.id === collection.id
                      ? "#b3cde0"
                      : "inherit", // Highlight selected collection
                  "&:hover": { backgroundColor: "#f0f4f8" }, // Hover effect
                }}
              >
                <ListItemText primary={collection.name} />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleAddToCollection}
          disabled={
            !selectedCollection || selectedCollection.id === currentCollectionId
          } // Disable if no collection or already selected
        >
          Add to Collection
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddToCollectionModal;
