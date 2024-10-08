// "use client";
// import React from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// import "../globals.css";

// type EditorProps = {
//   value?: string | undefined;
//   onChange?: (content: string) => void;
// };
// export default function Editor({ value, onChange }: EditorProps) {
//   return <ReactQuill theme="snow" value={value} onChange={onChange} />;
// }


"use client";
import React, { useEffect, useState } from "react";
import { EditorState, ContentState, SelectionState } from "draft-js";
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

  const moveCursorToEnd = (newState: EditorState) => {
    const content = newState.getCurrentContent();
    const blockMap = content.getBlockMap();
    const lastBlock = blockMap.last();
    const lastBlockKey = lastBlock.getKey();
    const lastLength = lastBlock.getLength();
    const selection = SelectionState.createEmpty(lastBlockKey).merge({
      anchorOffset: lastLength,
      focusOffset: lastLength,
    });

    return EditorState.forceSelection(newState, selection);
  };

  useEffect(() => {
    if (value) {
      console.log(value);
      const contentState = ContentState?.createFromText(value?.toString());
      const newEditorState = EditorState?.createWithContent(contentState);
      setEditorState(moveCursorToEnd(newEditorState));
    }
  }, [value]);

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
        editorClassName="max-h-[70vh] min-h-[54vh]  sm:min-h-[64vh] md:min-h-[66vh] border-2 border-gray-200 rounded-lg p-2 mb-2 overflow-y-auto"
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
};

export default MyEditor;