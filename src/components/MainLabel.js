import React, { useState } from "react";
import { Chip } from "@mui/material";
import { Cancel as CloseIcon } from "@mui/icons-material";

function MainLabel({ labelInfo, onRemoveLabel }) {
  const [hovered, setHovered] = useState(false);
  const { id, name, color } = labelInfo;

  return (
    <Chip
      variant="outlined"
      key={id}
      label={name}
      style={{ backgroundColor: color, minWidth: "6rem" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      deleteIcon={hovered ? <CloseIcon /> : <div></div>}
      onDelete={() => onRemoveLabel(id)}
    />
  );
}

export default MainLabel;
