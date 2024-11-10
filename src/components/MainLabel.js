import React, { useState } from "react";
import { Chip } from "@mui/material";
import { Cancel as CloseIcon } from "@mui/icons-material";
import { darken } from "@mui/system";

function MainLabel({ labelInfo, onRemoveLabel, onSelect, isSelected }) {
  const [hovered, setHovered] = useState(false);
  const { id, name, color } = labelInfo;

  return (
    <Chip
      variant="outlined"
      key={id}
      label={name}
      style={{
        minWidth: "6rem",
        fontWeight: isSelected ? "bold" : "normal",
        color: isSelected ? "white" : "black",
        backgroundColor: isSelected ? darken(color, 0.3) : color}}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      deleteIcon={hovered ? <CloseIcon /> : <div></div>}
      onDelete={() => onRemoveLabel(id)}
      onClick={() => onSelect(id)}
    />
  );
}

export default MainLabel;
