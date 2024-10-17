import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteLabel } from "../actions/labelActions";
import { CircularProgress, Box } from "@mui/material";
import LabelForm from "./LabelForm";
import MainLabel from "./MainLabel";
import { Container } from "react-bootstrap";

const LabelList = () => {
  const dispatch = useDispatch();

  const labelList = useSelector((state) => state.labelList);
  const { loading, error, labels } = labelList;

  const handleRemoveLabel = (labelId) => {
    dispatch(deleteLabel(labelId));
  };

  return (
    <Container>
      <h3>Labels</h3>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          flexWrap: "wrap",
          marginBottom: "1rem",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <span>{error}</span>
        ) : Array.isArray(labels) && labels.length > 0 ? (
          labels.map((label) => (
            <MainLabel
              key={label.id}
              labelInfo={label}
              onRemoveLabel={handleRemoveLabel}
            />
          ))
        ) : (
          <div></div>
        )}
      </Box>
      <LabelForm />
    </Container>
  );
};

export default LabelList;
