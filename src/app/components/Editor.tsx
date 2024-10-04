"use client";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import "../globals.css";

type EditorProps = {
  value?: string | undefined;
  onChange?: (content: string) => void;
};
export default function Editor({ value, onChange }: EditorProps) {
  return <ReactQuill theme="snow" value={value} onChange={onChange} />;
}