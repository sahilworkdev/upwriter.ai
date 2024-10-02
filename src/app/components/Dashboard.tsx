"use client";

import DocumentList from "./DocumentList";
import Sidebar from "./Sidebar";
import { CiPen } from "react-icons/ci";
import { useState, useEffect } from "react";
import axios from "axios";

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
            // console.log(response.data);
            const data: DocumentInfo[] = response.data.map(
              (doc: DataObject) => {
                return {
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
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    // window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <main className="w-full p-4 ">
      <div className="flex gap-4">
        <div
          className={`fixed inset-0 z-40 md:hidden ${
            isSidebarOpen ? "block" : "hidden"
          }`}
        >
          <div className="relative w-full top-24 left-0">
            <Sidebar handleDocumentSubmit={handleDocumentSubmit} />
          </div>
        </div>

        <div className={`w-[300px] max-w-[400px] hidden md:block`}>
          <Sidebar handleDocumentSubmit={handleDocumentSubmit} />
        </div>

        <div className="flex-grow">
          <DocumentList documents={documents} />
        </div>
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
