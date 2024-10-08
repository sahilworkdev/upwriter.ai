import { FaStar, FaRegStar, FaFileAlt } from "react-icons/fa";
import { FaEllipsisVertical } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import {MdEditDocument} from "react-icons/md";
import { EditorText } from "./Dashboard";
type Props = {
  data: {
    id: string;
    name: string;
    words: number;
    modified: string;
    favourite: boolean;
  };
  handleFavouriteUpdate: (id: string) => void;
  handleDeleteData: (id: string) => void;
  setShowEditor:(b: boolean) => void;
  setEditorText:(data: EditorText) => void;
};
type optionProps = {
  id: string;
  handleDeleteData: (id: string) => void;
};

// function countWords(paragraph: any) {
//   if (!paragraph || typeof paragraph !== 'string') {
//     console.error('Expected a non-empty string, but received:', paragraph);
//     return 0;
//   }

//   // Proceed with word counting
//   const words = paragraph.trim().replace(/[^\w\s]/g, '').split(/\s+/);
//   return words.filter((word: string) => word.length > 0).length;
// }

function TableRow({ data, handleFavouriteUpdate, handleDeleteData,  setShowEditor,
  setEditorText }: Props) {
  // Function to format the date
  function formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return new Date(dateString).toLocaleString("en-US", options);
  }
  return (
    <tr onClick={() => {
      setShowEditor(true);
      setEditorText({id: data.id,
        name: data.name,
        words: String(data.words),
        modified: data.modified,
        favourite: data.favourite});
    }} className="cursor-pointer">
      <Td wrap className="flex !whitespace-normal items-center">
        <FaFileAlt
          style={{ color: "#64748B" }}
          className="inline mr-2 hover:cursor-pointer"
        />
        {/* <span className="hidden sm:inline">{data.name}</span>
        <span className="sm:hidden">{data.name.slice(0, 10)}...</span> */}
        <span className="max-w-[8ch] sm:max-w-[16ch] md:max-w-[25ch] lg:max-w-[50ch] truncate">
          {data.name}
        </span>
      </Td>
      <Td className="text-center">{data.words}</Td>
      <Td className="text-center">
        <span className="hidden sm:inline">{formatDate(data?.modified)}</span>
        {/* <span className="sm:hidden">{data?.modified.slice(0, 10)}...</span> */}
      </Td>
      <Td>
        <button onClick={(e) => {
          e.stopPropagation();
          handleFavouriteUpdate(data.id);
          }}>
          {data.favourite ? (
            <FaStar size={18} style={{ color: "#989898" }} />
          ) : (
            <FaRegStar size={18} style={{ color: "#989898" }} />
          )}
        </button>
      </Td>
      <Td>
        <Options id={data.id} handleDeleteData={handleDeleteData} />
      </Td>
    </tr>
  );
}

function Td({
  children,
  //wrap,
  className = "",
}: Readonly<{
  children: React.ReactNode;
  wrap?: boolean;
  className?: string;
}>) {
  return (
    <td
      className={`px-2 sm:px-6 whitespace-nowrap py-4 text-sm font-medium text-gray-800 ${className}`}
    >
      {children}
    </td>
  );
}

function Options({ id, handleDeleteData }: optionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <FaEllipsisVertical
        className="cursor-pointer"
        size={18}
        style={{ color: "#989898" }}
        onClick={(e) => {
          e.stopPropagation();
          setModalOpen(!modalOpen)}
        }
      />
      {modalOpen && (
        <div
          className="absolute right-6 rounded-lg flex flex-col gap-2 overflow-y-auto p-4 bg-white shadow-lg z-10"
          onClick={() => {
            console.log("edit called");
            setModalOpen(false);
          }}
        >
          <div className="flex gap-2 cursor-pointer">
            <CiEdit size={18} className="text-blue-600"/>
            <span>Rename</span>
          </div>

          <div className="flex gap-2 cursor-pointer">
            <MdEditDocument size={18} className="text-blue-600"/>
            <span>Edit</span>
          </div>

          <div
            className="flex gap-2 cursor-pointer"
            onClick={() => {
              handleDeleteData(id);
              setModalOpen(false);
            }}
          >
            <FaTrashAlt size={18} className="text-red-500" />
            <span>Delete</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default TableRow;
