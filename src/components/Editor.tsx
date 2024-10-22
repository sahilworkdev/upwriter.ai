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

const toolbar = {
  inline: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: [
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "monospace",
      "superscript",
      "subscript",
    ],
  },
  list: { inDropdown: true },
  textAlign: { inDropdown: true },
  link: { inDropdown: true },
  history: { inDropdown: false },
};

const MyEditor: React.FC<EditorProps> = ({ value, onChange }) => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (value) {
      const contentBlock = htmlToDraft(value);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState);
      }
    }
  }, [value]);
  const onEditorStateChange = (newState: EditorState) => {
    setEditorState(newState);
  };
  const handleFocusChange = () => {
    if (onChange) {
      const htmlText = draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      );
      onChange(htmlText);
    }
  };

  return (
    <div>
      <Editor
        onBlur={handleFocusChange}
        editorState={editorState}
        wrapperClassName=""
        toolbarClassName="text-black"
        editorClassName="element max-h-[60vh] max-w-[95vw] md:max-h-[71vh] min-h-[70vh] bg-primary-light border-2 border-gray-200 rounded-lg px-4 mb-2 overflow-y-auto break-words whitespace-normal"
        onEditorStateChange={onEditorStateChange}
        toolbar={toolbar}
      />
    </div>
  );
};
export default MyEditor;
