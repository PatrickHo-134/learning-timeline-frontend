import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";
import { useDispatch, useSelector } from "react-redux";
import {
  archiveCollection,
} from "../actions/collectionActions";
import AddCollectionForm from "./AddCollectionForm";
import { setCategoryFilter } from "../actions/pageFilterActions";
import { appVersion } from "../appConfig";

const CollectionList = () => {
  const dispatch = useDispatch();
  const [hoveredCollectionId, setHoveredCollectionId] = useState(null);
  const [selectedCollectionId, setSelectedCollectionId] = useState(0);
  const { collections, loading, error } = useSelector(
    (state) => state.collectionList
  );

  const handleArchiveCollection = (collectionId) => {
    dispatch(archiveCollection(collectionId));
  };

  const handleCollectionSelect = (collectionId) => {
    setSelectedCollectionId(collectionId);
    dispatch(setCategoryFilter(collectionId));
  };

  useEffect(() => {
    if (!loading && collections.length > 0) {
      setSelectedCollectionId(0);
    }
  }, [loading, collections]);

  if (loading) {
    return <p>Loading collections...</p>;
  }

  if (error) {
    return <p>Error loading collections</p>;
  }

  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
      }}
    >
      <h3>Categories</h3>

      <Box sx={{ flexGrow: 1 }}>
        {Array.isArray(collections) && collections.length > 0 ? (
          <List>
            {collections.map((collection, index) => (
              <ListItem
                key={index}
                onMouseEnter={() => setHoveredCollectionId(collection.id)}
                onMouseLeave={() => setHoveredCollectionId(null)}
                onClick={() => handleCollectionSelect(collection.id)}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                style={{
                  backgroundColor:
                    selectedCollectionId === collection.id
                      ? "#b3cde0"
                      : "#ffffff",
                }}
              >
                <ListItemText primary={collection.name} />

                {collection.id !== 0 &&
                  hoveredCollectionId === collection.id && (
                    <Tooltip title="Archive Collection">
                      <IconButton
                        edge="end"
                        color="primary"
                        onClick={() => handleArchiveCollection(collection.id)}
                      >
                        <ArchiveIcon />
                      </IconButton>
                    </Tooltip>
                  )}
              </ListItem>
            ))}
          </List>
        ) : (
          <div></div>
        )}
        <AddCollectionForm />
      </Box>

      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          left: 20,
          width: "15%",
          padding: "1rem",
          textAlign: "center",
          backgroundColor: "#f5f5f5",
          borderTop: "1px solid #ddd",
          boxSizing: "border-box",
        }}
      >
        <Typography variant="body2">Created by Patrick Ho</Typography>
        <Typography variant="caption">Version: {appVersion}</Typography>
      </Box>
    </Box>
  );
};

export default CollectionList;
