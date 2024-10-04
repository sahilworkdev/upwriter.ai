"use client";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import { Delta, Sources } from "quill";

import "../globals.css";

type EditorProps = {
  value?: string | undefined;
  onChange?: (content: string) => void;
};
export default function Editor({ value, onChange }: EditorProps) {
  return <ReactQuill theme="snow" value={value} onChange={onChange} />;
}

// interface Block {
//   key: string; 
//   text: string; 
//   type: string; 
// }

// interface Data {
//   blocks: Block[]; 
// }
// import { Editor } from 'react-draft-wysiwyg';
// import React from 'react';

// const MyEditor = ({data}:{data:Data}) => {
//   const [editorState, setEditorState] = React.useState();

//   return (
//     <Editor
//       editorState={editorState}
//       onChange={(newEditorState) => setEditorState(newEditorState)}
//       toolbar={{
//         inline: {
//           bold: true,
//           italic: true,
//           underline: true,
//         },
//       }}
//     />
//   );
// };