"use client";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { CgFileAdd } from "react-icons/cg";
import { FaArrowLeftLong } from "react-icons/fa6";
import Editor from "./Editor";
import PaginatedTable from "./PaginatedTable";
import { DocumentInfo } from "./Dashboard";
import { IoMdDocument } from "react-icons/io";
import axios from "axios";
import { useSession } from "next-auth/react";

function DocumentList({
  handleManualDocumentSubmit,
  documents,
  handleFavouriteUpdate,
  handleDeleteData,
  setShowEditor,
  setEditorText,
}: {
  handleManualDocumentSubmit: (data: DocumentInfo) => void;
  documents: DocumentInfo[];
  handleFavouriteUpdate: (id: string) => void;
  handleDeleteData: (id: string) => void;
  setShowEditor: (b: boolean) => void;
  setEditorText: (data: DocumentInfo) => void;
}) {
  const [favouritesON, setFavouritesON] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [manualEditorText, setManualEditorText] = useState<DocumentInfo>({
    id: "",
    name: "",
    words: 0,
    modified: "",
    favourite: false,
  });

  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;

  if (favouritesON) {
    documents = documents.filter((doc) => doc.favourite);
  }

  const toggleShowDocuments = () => {
    setShowDocuments(!showDocuments);
  };
  const handleEditorTextChange = (content: string) => {
    setManualEditorText({ ...manualEditorText, name: content });
  };
  const handleMannualDocumentSave = async () => {
    const url = `${process.env.NEXT_PUBLIC_SOURCE_URL}/documents/0`;
    if (accessToken) {
      try {
        const res = await axios.post(
          url,
          {
            content: manualEditorText.name,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (res.status === 200) {
          handleManualDocumentSubmit({
            id: res.data.data.id,
            name: res.data.data.content,
            words: res.data.data.wordCount,
            modified: res.data.data.updatedAt,
            favourite: res.data.data.isFavourite,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <div className="flex items-end justify-between mb-4">
        {showDocuments ? (
          ""
        ) : (
          <h2 className="sm:text-2xl text-lg font-bold text-white">
            Document List
          </h2>
        )}

        {/* Render buttons only when the editor is not shown */}
        {!showDocuments && (
          <div className="flex gap-4">
            <button
              onClick={() => setFavouritesON(!favouritesON)}
              className={`${
                favouritesON
                  ? "bg-primary-green text-black"
                  : "bg-secondary-default text-white"
              }  px-4 py-2 rounded-md shadow-md flex items-center `}
            >
              <FaStar className="inline sm:mr-2" />
              <span className="sr-only sm:not-sr-only">Favourites</span>
            </button>
            <button
              className="text-black px-4 py-2 text-sm  rounded-md shadow-md bg-primary-green "
              onClick={toggleShowDocuments}
            >
              <CgFileAdd size={22} className="inline sm:mr-2" />
              <span className="sr-only sm:not-sr-only ">New Document</span>
            </button>
          </div>
        )}
      </div>

      {!showDocuments && (
        <div className="flex flex-col">
          {documents.length === 0 ? (
            <div className="h-[70vh] flex justify-center items-center">
              <p className="text-center text-lg text-white sm:text-4xl font-bold">
                No documents
              </p>
            </div>
          ) : (
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <PaginatedTable
                  setEditorText={setEditorText}
                  setShowEditor={setShowEditor}
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
            <h2 className="sm:text-2xl text-lg font-bold flex items-center gap-2 text-white ">
              <FaArrowLeftLong
                className="cursor-pointer "
                onClick={() => setShowDocuments(false)}
              />
              New Document
            </h2>
          </div>
          <button
            className="text-black flex items-center gap-2 top-10 bg-primary-green  px-4 py-2 text-sm rounded-md shadow-md hover:bg-primary-green"
            onClick={handleMannualDocumentSave}
          >
            <IoMdDocument />
            <span>Save</span>
          </button>
        </div>
      )}
      {showDocuments && (
        <Editor
          value={manualEditorText.name}
          onChange={handleEditorTextChange}
        />
      )}
    </div>
  );
}

export default DocumentList;
