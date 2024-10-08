"use client";

import DocumentList from "./DocumentList";
import Sidebar from "./Sidebar";
import { CiPen } from "react-icons/ci";
import { useState, useEffect } from "react";
import axios from "axios";
import Editor from "./Editor";

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
type Metadata = {
  useCase: string;
  primaryKey: string;
  researchLevel: number;
  personality: string[];
  tone: string[];
  language: string;
  _id: string;
};
export type EditorText = {
  id: string;
  name: string;
  words: string;
  modified: string;
  favourite: boolean;
}

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [documents, setDocuments] = useState<any[]>([]);
  const [editorText, setEditorText] = useState<any>({
    id: "",
    name: "",
    words: "",
    modified: "",
    favourite: false,
  });
  const [showEditor, setShowEditor] = useState(false);

  const handleFavouriteUpdate = async (id: string) => {
    const url = `${process.env.NEXT_PUBLIC_SOURCE_URL}/documents/${id}`;
    const userJson = localStorage.getItem("user");
    if (userJson) {
      const user = JSON.parse(userJson);
      const accessToken = user.accessToken;
      // console.log(accessToken);
      try {
        const res = await axios.put(url, null, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        // console.log(res);
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
    const url = `${process.env.NEXT_PUBLIC_SOURCE_URL}/documents/${id}`;
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
        // console.log(res);
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
    fetchData();
  }, []);

  const fetchData = async () => {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      const user = JSON.parse(userJson);
      const accessToken = user.accessToken;
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SOURCE_URL}/documents`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "ngrok-skip-browser-warning": true,
            },
          }
        );

        // console.log(response, "rseponse in document list");

        if (response?.data?.status) {
          const data: any = response.data.data.map((doc: DataObject) => {
            // console.log("content:", doc.content)
            return {
              id: doc._id,
              name: doc.content,
              words: "",
              modified: doc.updatedAt,
              favourite: doc.isFavorite,
            };
          });
          setDocuments(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleDocumentSubmit = async (data: any) => {
    setDocuments((prevDocuments) => [data, ...prevDocuments]);
    setEditorText(data);
    setShowEditor(true);
    setIsSidebarOpen(false);
  };

  const handleEditorSubmit = async () => {
    console.log(editorText, "...");
    const url = `${process.env.NEXT_PUBLIC_SOURCE_URL}/documents/content/${editorText?.id}`;
    const userJson = localStorage.getItem("user");
    console.log(userJson, "user json");
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

        // console.log(res, "response in update", editorText);

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

  // console.log(editorText, "editro text");

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

        <div className={`w-[400px] max-w-[500px] overflow-hidden hidden md:block ${showEditor && 'flex-[0.4]'}`}> 
          <Sidebar handleDocumentSubmit={handleDocumentSubmit} />
        </div>

        {showEditor ? (
          <div className="flex-1">
            <Editor
              value={editorText?.name}
              onChange={handleEditorTextChange}
            />
            <button
              className="text-white fixed sm:bottom-10 bg-[#6366f1] z-10 px-4 py-2 text-sm rounded-md shadow-md hover:bg-blue-600"
              onClick={handleEditorSubmit}
            >
              Save document
            </button>
          </div>
        ) : (
          <div className="flex-grow">
            <DocumentList
            setEditorText= {setEditorText}
            setShowEditor={setShowEditor}
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
