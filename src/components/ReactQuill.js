import { Box } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../App.css";
import '../custom-quill-styles.css';

export const ReadOnlyContent = ({ content }) => {
  return (
    <Box component="section" sx={{
      bgcolor: "background.paper",
      margin: 1,
    }}
    >
      <ReactQuill
        value={content}
        readOnly
        modules={{
          // use matchVisual config to strip out the unnecessarily-injected <p><br></p>
          clipboard: {
            matchVisual: false
          },
          toolbar: false,
        }}
      />
    </Box>
  );
};

const modules = {
  // use matchVisual config to strip out the unnecessarily-injected <p><br></p>
  clipboard: {
    matchVisual: false
  },
  toolbar: [
    [{header:1}, {header:2}],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }, { size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike", "code"],
    [{ align: [] }, { list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }, { direction: "rtl" }],
    ["blockquote", "code-block"],
    [{ script: "sub" }, { script: "super" }],
    [{ color: [] }, { background: [] }],
    ["link", "image", "video"],
    ["clean"], // remove formatting button
  ],
};

export const NoteContent = ({ content, setContent }) => {
  return (
    <ReactQuill
      className="edit-learning-note-content"
      value={content}
      onChange={setContent}
      modules={modules}
    />
  );
};
