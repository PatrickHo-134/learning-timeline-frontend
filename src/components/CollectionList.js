import React, { useEffect } from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCollections } from "../actions/collectionActions";
import { Container } from "react-bootstrap";

const CollectionList = () => {
  const dispatch = useDispatch();
  const { collections, loading, error } = useSelector(
    (state) => state.collectionList
  );
  const userInfo = useSelector((state) => state.userLogin.userInfo);

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
        {collections.map((collection) => (
          <ListItem button key={collection.id}>
            <ListItemText primary={collection.name} />
          </ListItem>
        ))}
      </List>
      ) : (<div></div>)
}
    </Container>
  );
};

export default CollectionList;
