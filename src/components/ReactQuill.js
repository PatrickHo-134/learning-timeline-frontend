import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../App.css";

export const AutoHeightQuill = ({ content }) => {
  return (
    <div style={{ height: 'auto' }}
    >
      <ReactQuill
        value={content}
        readOnly // Set the readOnly prop to make the content read-only
        modules={{
          toolbar: false, // Set the toolbar to false to remove it
        }}
      />
    </div>
  );
};

const modules = {
  toolbar: [
    [{header:1}, {header:2}],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }, { size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike", "code"], // toggled buttons
    [{ align: [] }, { list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }, { direction: "rtl" }],
    ["blockquote", "code-block"],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
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
