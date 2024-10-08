"use client";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { CgFileAdd } from "react-icons/cg";
import { FaArrowLeftLong } from "react-icons/fa6";
import Editor from "./Editor";
import PaginatedTable from "./PaginatedTable";
import { DocumentInfo } from "./Dashboard";
import { IoMdDocument } from "react-icons/io";

function DocumentList({
  documents,
  handleFavouriteUpdate,
  handleDeleteData,
  setShowEditor,
  setEditorText,
}: {
  documents: DocumentInfo[];
  handleFavouriteUpdate: (id: string) => void;
  handleDeleteData: (id: string) => void;
  setShowEditor: (b: boolean) => void;
  setEditorText: (data: DocumentInfo) => void;
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
          ""
        ) : (
          <h2 className="sm:text-2xl text-lg font-medium text-[#64748b]">
            Document List
          </h2>
        )}

        {/* Render buttons only when the editor is not shown */}
        {!showDocuments && (
          <div className="flex gap-4">
            <button
              onClick={() => setFavouritesON(!favouritesON)}
              className={`${
                favouritesON ? "bg-[#6366F1]" : "bg-gray-600"
              } text-white px-4 py-2 rounded-md shadow-md flex items-center`}
            >
              <FaStar className="inline sm:mr-2" />
              <span className="sr-only sm:not-sr-only">Favourites</span>
            </button>
            <button
              style={{ backgroundColor: "#6366F1" }}
              className="text-white px-4 py-2 text-sm rounded-md shadow-md"
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
            <p className="text-center text-gray-500 sm:text-3xl font-bold">
              No documents
            </p>
          ) : (
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <PaginatedTable
                  setEditorText={setEditorText}
                  setShowEditor={setShowEditor}
                  favourites={favouritesON}
                  documents={documents}
                  handleFavouriteUpdate={handleFavouriteUpdate}
                  handleDeleteData={handleDeleteData}
                />
              </div>
            </div>
          )}
        </div>
      )}
      {showDocuments && (
        <div className="flex justify-between mb-4">
          <div>
            <h2 className="sm:text-2xl text-lg font-medium flex items-center gap-2 text-[#64748b]">
              <FaArrowLeftLong
                className="cursor-pointer "
                onClick={() => setShowDocuments(false)}
              />
              New Document
            </h2>
          </div>
          <button
            className="text-white flex items-center gap-2 top-10 bg-[#6366f1] z-10 px-4 py-2 text-sm rounded-md shadow-md hover:bg-indigo-600"
            // onClick={handleEditorSubmit}
          >
            <IoMdDocument />
            <span>Save</span>
          </button>
        </div>
      )}
      {showDocuments && <Editor />}
    </div>
  );
}

export default DocumentList;
