"use client";
import { useEffect, useState } from "react";
import Table from "./Table";
import { FaStar } from "react-icons/fa";
import { CgFileAdd } from "react-icons/cg";
import { FaArrowLeftLong } from "react-icons/fa6";
import Editor from "./Editor";
import axios from "axios";

type Metadata = {
  useCase: string;
  primaryKey: string;
  researchLevel: number;
  personality: string[];
  tone: string[];
  language: string;
  _id: string;
};

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
function DocumentList() {
  const [favouritesON, setFavouritesON] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [documents, setDocuments] = useState<DocumentInfo[]>([]);

  const toggleShowDocuments = () => {
    setShowDocuments(!showDocuments);
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
            console.log(response.data);
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

  return (
    <div className=" text-gray-600">
      <div className="flex items-center justify-between mb-4">
        {showDocuments ? (
          <h2 className="sm:text-2xl text-lg font-bold flex items-center gap-2">
            <FaArrowLeftLong
              className="cursor-pointer"
              onClick={() => setShowDocuments(false)}
            />
            New Document
          </h2>
        ) : (
          <h2 className="sm:text-2xl text-lg font-bold">Document List</h2>
        )}

        <div className="flex gap-4">
          <button
            onClick={() => setFavouritesON(!favouritesON)}
            className={`${
              favouritesON ? "bg-[#474bff]" : "bg-gray-600"
            } text-white px-4 py-2 rounded-md shadow-md`}
          >
            <FaStar className="inline sm:mr-2" />
            <span className="sr-only sm:not-sr-only">Favourites</span>
          </button>
          <button
            style={{ backgroundColor: "#474bff" }}
            className="text-white px-4 py-2 text-sm rounded-md shadow-md hover:bg-blue-500"
            onClick={toggleShowDocuments}
          >
            <CgFileAdd size={22} className="inline sm:mr-2" />
            <span className="sr-only sm:not-sr-only">New Document</span>
          </button>
        </div>
      </div>

      {!showDocuments && (
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <Table favourites={favouritesON} documents={documents} />
            </div>
          </div>
        </div>
      )}

      {showDocuments && <Editor />}
      {showDocuments && (
        <button
          className="text-white bg-[#474bff] z-10 px-4 py-2 text-sm rounded-md shadow-md hover:bg-blue-500"
          onClick={() => console.log("Save Documents")}
        >
          Save document
        </button>
      )}
    </div>
  );
}

export default DocumentList;
