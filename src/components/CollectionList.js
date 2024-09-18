import React, { useEffect, useState } from "react";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
} from "@mui/material";
import ArchiveIcon from '@mui/icons-material/Archive';
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCollections,
  archiveCollection,
} from "../actions/collectionActions";
import { Container } from "react-bootstrap";
import AddCollectionForm from "./AddCollectionForm";

const CollectionList = () => {
  const dispatch = useDispatch();
  const [hoveredCollectionId, setHoveredCollectionId] = useState(null);
  const { collections, loading, error } = useSelector(
    (state) => state.collectionList
  );
  const userInfo = useSelector((state) => state.userLogin.userInfo);

  const handleArchiveCollection = (collectionId) => {
    dispatch(archiveCollection(collectionId));
  };

  useEffect(() => {
    dispatch(fetchCollections(userInfo));
  }, [dispatch, userInfo]);

  if (loading) {
    return <p>Loading collections...</p>;
  }

  if (error) {
    return <p>Error loading collections</p>;
  }

  return (
    <Container>
      <h3>Categories</h3>
      {Array.isArray(collections) && collections.length > 0 ? (
        <List>
          {collections.map((collection, index) => (
            <ListItem
              key={index}
              onMouseEnter={() => setHoveredCollectionId(collection.id)}
              onMouseLeave={() => setHoveredCollectionId(null)}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ListItemText primary={collection.name} />

              {collection.id !== 0 && hoveredCollectionId === collection.id && (
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
    </Container>
  );
};

export default CollectionList;
