import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteLabel } from "../actions/labelActions";
import { CircularProgress, Box } from "@mui/material";
import LabelForm from "./LabelForm";
import MainLabel from "./MainLabel";
import { Container } from "react-bootstrap";
import { addLabelFilter, removeLabelFilter } from "../actions/pageFilterActions";

const LabelList = () => {
  const dispatch = useDispatch();

  const labelList = useSelector((state) => state.labelList);
  const { loading, error, labels } = labelList;

  const selectedLabels = useSelector((state) => state.pageFilter.selectedLabels);

  const handleRemoveLabel = (labelId) => {
    dispatch(deleteLabel(labelId));
  };

  const onLabelClick = (labelId) => {
    if (selectedLabels.includes(labelId)) {
      dispatch(removeLabelFilter(labelId));
    } else {
      dispatch(addLabelFilter(labelId));
    }
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
              onSelect={onLabelClick}
              onRemoveLabel={handleRemoveLabel}
              isSelected={selectedLabels.includes(label.id)}
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
