"use client";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../globals.css";

export default function Editor() {
  return <ReactQuill theme="snow"></ReactQuill>;
}
