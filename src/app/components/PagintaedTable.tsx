import React, { useState } from "react";
import Table from "./Table";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { EditorText } from "./Dashboard";

type DocumentInfo = {
  id: string;
  name: string;
  words: number;
  modified: string;
  favourite: boolean;
};

interface PaginationProps {
  favourites: boolean;
  documents: DocumentInfo[];
  handleFavouriteUpdate: (id: string) => void;
  handleDeleteData: (id: string) => void;
  itemsPerPage?: number;
  setShowEditor:(b: boolean) => void;
  setEditorText:(data: EditorText) => void;
}

const PaginatedTable: React.FC<PaginationProps> = ({
  favourites,
  documents,
  handleFavouriteUpdate,
  handleDeleteData,
  itemsPerPage = 10,
  setShowEditor,
  setEditorText
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = documents.length;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentDocuments = documents.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const generatePagination = () => {
    const pages = [];
    const ellipsis = "...";

    pages.push(1);

    if (currentPage > 3) {
      pages.push(ellipsis);
    }
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }
    if (currentPage < totalPages - 2) {
      pages.push(ellipsis);
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div>
      <Table
      setEditorText= {setEditorText}
      setShowEditor={setShowEditor}
        favourites={favourites}
        documents={currentDocuments}
        handleFavouriteUpdate={handleFavouriteUpdate}
        handleDeleteData={handleDeleteData}
      />

      {totalPages > 1 && (
        <div className="mx-auto max-w-max flex bg-[#f7f9ff] py-2 px-1 rounded-full shadow-sm justify-center items-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 flex gap-2 items-center cursor-pointer text-[#64748b] disabled:cursor-not-allowed"
          >
            <FaChevronLeft />
            <span className="font-bold">Back</span>
          </button>

          <div className="flex items-center">
            <div className="flex gap-2 justify-center items-center">
              {generatePagination().map((page, index) => {
                if (page === "...") {
                  return (
                    <span key={index} className="text-[#64748b] font-bold">
                      {page}
                    </span>
                  );
                }
                return (
                  <span
                    key={index}
                    onClick={() => handlePageChange(Number(page))}
                    className={`${
                      currentPage === page ? "bg-[#6366f1] text-white" : ""
                    } px-2 py-1 rounded-md border-[#6366f1] border-2 cursor-pointer`}
                  >
                    {page}
                  </span>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 flex gap-2 items-center cursor-pointer text-[#64748b] disabled:cursor-not-allowed"
          >
            <span className="font-bold">Next</span>
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default PaginatedTable;