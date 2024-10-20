import React, { useState } from "react";
import { Chip } from "@mui/material";
import { Cancel as CloseIcon } from "@mui/icons-material";

function LearningNoteLabel({ labelId, labelList = [], onRemoveLabel }) {
  const [hovered, setHovered] = useState(false);

  if (!Array.isArray(labelList)) {
    console.error("labelList is not an array:", labelList);
    return null;
  }

  const labelInfo = labelList.find((x) => x.id === labelId);

  if (!labelInfo || !labelInfo.name) {
    return null;
  } else {
    return (
      <Chip
        variant="outlined"
        key={labelInfo.id}
        label={labelInfo.name}
        size="small"
        style={{
          backgroundColor: labelInfo.color,
          cursor: "pointer",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        deleteIcon={hovered ? <CloseIcon variant="outlined"/> : <div></div>}
        onDelete={() => onRemoveLabel(labelId)}
      />
    );
  }
}

export default LearningNoteLabel;
