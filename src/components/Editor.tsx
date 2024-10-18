"use client";
import React, { useEffect, useState } from "react";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
type EditorProps = {
  value?: string; // htmlstring
  onChange?: (content: string) => void;
};
const MyEditor: React.FC<EditorProps> = ({ value, onChange }) => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    if (value && !isInitialized) {
      const contentBlock = htmlToDraft(value);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState);
        setIsInitialized(true);
      }
    }
  }, [value, isInitialized]);
  const onEditorStateChange = (newState: EditorState) => {
    setEditorState(newState);
    if (onChange) {
      const htmlText = draftToHtml(convertToRaw(newState.getCurrentContent()));
      onChange(htmlText);
    }
  };
  return (
    <div>
      <Editor
        editorState={editorState}
        wrapperClassName=""
        toolbarClassName="text-black"
        editorClassName="max-h-[60vh] max-w-[95vw] md:max-h-[74vh] min-h-[54vh] bg-primary-light border-2 border-gray-200 rounded-lg p-2 mb-2 overflow-y-auto break-words whitespace-normal"
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
};
export default MyEditor;
