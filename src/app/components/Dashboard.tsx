"use client";

import DocumentList from "./DocumentList";
import Sidebar from "./Sidebar";
import { CiPen } from "react-icons/ci";
import { useState, useEffect } from "react";
import axios from "axios";
import Editor from "./Editor";
// import { UnprivilegedEditor } from "react-quill";
// import { Delta, Sources } from "quill";
type DataObject = {
  _id: string;
  content: string;
  metadata: Metadata;
  isDeleted: boolean;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
type DocumentInfo = {
  id: string;
  name: string;
  words: number;
  modified: string;
  favourite: boolean;
};
type Metadata = {
  useCase: string;
  primaryKey: string;
  researchLevel: number;
  personality: string[];
  tone: string[];
  language: string;
  _id: string;
};
const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [documents, setDocuments] = useState<DocumentInfo[]>([]);
  const [editorText, setEditorText] = useState<DocumentInfo>({
    id: "",
    name: "",
    words: 0,
    modified: "",
    favourite: false,
  });
  const [showEditor, setShowEditor] = useState(false);

  const handleFavouriteUpdate = async (id: string) => {
    const url = `${process.env.NEXT_PUBLIC_SOURCE_URL}/api/documents/${id}`;
    const userJson = localStorage.getItem("user");
    if (userJson) {
      const user = JSON.parse(userJson);
      const accessToken = user.accessToken;
      console.log(accessToken);
      try {
        const res = await axios.put(url, null, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(res);
        if (res.status === 200) {
          const updatedDocuments = [...documents];
          const index = updatedDocuments.findIndex((doc) => doc.id === id);
          updatedDocuments[index].favourite =
            !updatedDocuments[index].favourite;
          setDocuments(updatedDocuments);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleDeleteData = async (id: string) => {
    const url = `${process.env.NEXT_PUBLIC_SOURCE_URL}/api/documents/${id}`;
    const userJson = localStorage.getItem("user");
    if (userJson) {
      const user = JSON.parse(userJson);
      const accessToken = user.accessToken;
      try {
        const res = await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(res);
        if (res.status === 200) {
          const updatedDocuments = documents.filter((doc) => doc.id !== id);
          setDocuments(updatedDocuments);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const userJson = localStorage.getItem("user");
      if (userJson) {
        const user = JSON.parse(userJson);
        const accessToken = user.accessToken;
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SOURCE_URL}/api/documents`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (response.status === 200) {
            const data: DocumentInfo[] = response.data.map(
              (doc: DataObject) => {
                return {
                  id: doc._id,
                  name: doc.content,
                  words: 0,
                  modified: doc.updatedAt,
                  favourite: doc.isFavorite,
                };
              }
            );
            setDocuments(data);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, []);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleDocumentSubmit = async (data: DocumentInfo) => {
    setDocuments((prevDocuments) => [data, ...prevDocuments]);
    setEditorText(data);
    setShowEditor(true);
    setIsSidebarOpen(false);
  };
  const handleEditorSubmit = async () => {
    const url = `${process.env.NEXT_PUBLIC_SOURCE_URL}/api/documents/updateContent/${editorText.id}`;
    const userJson = localStorage.getItem("user");
    if (userJson) {
      const user = JSON.parse(userJson);
      const accessToken = user.accessToken;
      try {
        const res = await axios.put(
          url,
          { content: editorText.name },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (res.status === 200) {
          const updatedDocuments = [...documents];
          const index = updatedDocuments.findIndex(
            (doc) => doc.id === editorText.id
          );
          updatedDocuments[index] = editorText;
          setDocuments(updatedDocuments);
          setShowEditor(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEditorTextChange = (content: string) => {
    setEditorText({ ...editorText, name: content });
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <main className="w-full p-4 ">
      <div className="flex gap-4">
        {/* Sidebar for mobile, taking full width with smooth transition */}
        <div
          className={`fixed inset-0 z-40 transition-transform transform md:hidden ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } ease-in-out duration-300`}
        >
          <div className="relative w-full h-full bg-white shadow-lg">
            <Sidebar handleDocumentSubmit={handleDocumentSubmit} />
          </div>
        </div>

        <div className={`w-[400px] max-w-[500px] hidden md:block`}>
          <Sidebar handleDocumentSubmit={handleDocumentSubmit} />
        </div>

        {showEditor ? (
          <div>
            <Editor
              value={editorText?.name}
              onChange={handleEditorTextChange}
            />
            <button
              className="text-white bg-[#474bff] z-10 px-4 py-2 text-sm rounded-md shadow-md hover:bg-blue-500"
              onClick={handleEditorSubmit}
            >
              Save document
            </button>
          </div>
        ) : (
          <div className="flex-grow">
            <DocumentList
              documents={documents}
              handleFavouriteUpdate={handleFavouriteUpdate}
              handleDeleteData={handleDeleteData}
            />
          </div>
        )}
      </div>

      <div className="fixed bottom-2 right-0 m-4 z-50">
        <div
          className="bg-[#989898] rounded-lg shadow-lg p-3 cursor-pointer md:hidden"
          onClick={toggleSidebar}
        >
          <CiPen className="text-2xl text-gray-800" />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
