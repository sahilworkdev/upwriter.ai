"use client";
import { useState } from "react";
import Table from "./Table";
import { FaStar } from "react-icons/fa";
import { CgFileAdd } from "react-icons/cg";
import { FaArrowLeftLong } from "react-icons/fa6";
import Editor from "./Editor";

type DocumentInfo = {
  id: string;
  name: string;
  words: number;
  modified: string;
  favourite: boolean;
};
function DocumentList({
  documents,
  handleFavouriteUpdate,
  handleDeleteData,
}: {
  documents: DocumentInfo[];
  handleFavouriteUpdate: (id: string) => void;
  handleDeleteData: (id: string) => void;
}) {
  const [favouritesON, setFavouritesON] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);

  const toggleShowDocuments = () => {
    setShowDocuments(!showDocuments);
  };

  return (
    <div className="text-gray-600">
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

        {/* Render buttons only when the editor is not shown */}
        {!showDocuments && (
          <div className="flex gap-4">
            <button
              onClick={() => setFavouritesON(!favouritesON)}
              className={`${
                favouritesON ? "bg-[#474bff]" : "bg-gray-600"
              } text-white px-4 py-2 rounded-md shadow-md flex items-center`}
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
        )}
      </div>

      {!showDocuments && (
        <div className="flex flex-col">
          {documents.length === 0 ? (
            <p className="text-center text-gray-500 sm:text-3xl font-bold">No documents</p> // No documents message
          ) : (
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <Table favourites={favouritesON} documents={documents} handleFavouriteUpdate={handleFavouriteUpdate}  handleDeleteData={handleDeleteData} />
              </div>
            </div>
          )}
        </div>
      )}

      {showDocuments && <Editor />}
      {showDocuments && (
        <button
          className="text-white fixed sm:bottom-10 bg-[#6366f1] z-10 px-4 py-2 text-sm rounded-md shadow-md hover:bg-[#5659e0]"
          onClick={() => console.log("Save Documents")}
        >
          Save document
        </button>
      )}
    </div>
  );
}

export default DocumentList;
