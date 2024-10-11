// "use client";
// import React, { useEffect, useState } from "react";
// import { EditorState, ContentState, SelectionState } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// type EditorProps = {
//   value?: string;
//   onChange?: (content: string) => void;
// };

// const MyEditor: React.FC<EditorProps> = ({ value, onChange }) => {
//   const [editorState, setEditorState] = useState<EditorState>(
//     EditorState.createEmpty()
//   );

//   const moveCursorToEnd = (newState: EditorState) => {
//     const content = newState.getCurrentContent();
//     const blockMap = content.getBlockMap();
//     const lastBlock = blockMap.last();
//     const lastBlockKey = lastBlock.getKey();
//     const lastLength = lastBlock.getLength();
//     const selection = SelectionState.createEmpty(lastBlockKey).merge({
//       anchorOffset: lastLength,
//       focusOffset: lastLength,
//     });

//     return EditorState.forceSelection(newState, selection);
//   };

//   useEffect(() => {
//     if (value) {
//       const contentState = ContentState?.createFromText(value?.toString());
//       const newEditorState = EditorState?.createWithContent(contentState);
//       setEditorState(moveCursorToEnd(newEditorState));
//     }
//   }, [value]);

//   const onEditorStateChange = (newState: EditorState) => {
//     setEditorState(newState);
//     if (onChange) {
//       const plainText = newState.getCurrentContent().getPlainText();
//       onChange(plainText);
//     }
//   };

//   return (
//     <div>
//       <Editor
//         editorState={editorState}
//         wrapperClassName=""
//         editorClassName="max-h-[74vh] min-h-[54vh] text-wrap sm:min-h-[54vh] md:min-h-[74vh] border-2 border-gray-200 rounded-lg p-2 mb-2 overflow-y-auto"
//         onEditorStateChange={onEditorStateChange}
//       />
//     </div>
//   );
// };

// export default MyEditor;

"use client";
import React, { useEffect, useState } from "react";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
type EditorProps = {
  value?: string;
  onChange?: (content: string) => void;
};
const MyEditor: React.FC<EditorProps> = ({ value, onChange }) => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    if (value && !isInitialized) {
      const contentState = ContentState.createFromText(value.toString());
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
      setIsInitialized(true);
    }
  }, [value, isInitialized]);
  const onEditorStateChange = (newState: EditorState) => {
    setEditorState(newState);
    if (onChange) {
      const plainText = newState.getCurrentContent().getPlainText();
      onChange(plainText);
    }
  };
  return (
    <div>
      <Editor
        editorState={editorState}
        wrapperClassName=""
        editorClassName="max-h-[60vh] max-w-[95vw] md:max-h-[74vh] min-h-[54vh] border-2 border-gray-200 rounded-lg p-2 mb-2 overflow-y-auto break-words whitespace-normal"
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
};
export default MyEditor;