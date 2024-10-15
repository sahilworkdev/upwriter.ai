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
        editorClassName="max-h-[60vh] max-w-[95vw] md:max-h-[74vh] min-h-[54vh] bg-primary-light border-2 border-gray-200 rounded-lg p-2 mb-2 overflow-y-auto break-words whitespace-normal"
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
};
export default MyEditor;