import { FaStar, FaRegStar, FaFileAlt } from "react-icons/fa";
import { FaEllipsisVertical } from "react-icons/fa6";
import { useState } from "react";
import { DocumentInfo } from "./Dashboard";
import OptionsModal from "./OptionsModal";

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
  setShowEditor: (b: boolean) => void;
  setEditorText: (data: DocumentInfo) => void;
};

function TableRow({
  data,
  handleFavouriteUpdate,
  handleDeleteData,
  setShowEditor,
  setEditorText,
}: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  const htmlString = data.name;
  const html = new DOMParser().parseFromString(htmlString, "text/html");
  const text = html.body.textContent || "";

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

  const openEditor = () => {
    setShowEditor(true);
    setEditorText({
      id: data.id,
      name: data.name,
      words: data.words,
      modified: data.modified,
      favourite: data.favourite,
    });
  };

  return (
    <tr className="cursor-pointer text-white">
      <Td
        openEditor={openEditor}
        wrap
        className="flex !whitespace-normal items-center"
      >
        <FaFileAlt className="inline mr-2 hover:cursor-pointer text-white" />
        <span className="max-w-[8ch] sm:max-w-[16ch] md:max-w-[25ch] lg:max-w-[50ch] truncate">
          {text}
        </span>
      </Td>
      <Td className="text-center text-white">{data.words}</Td>
      <Td className="text-center">
        <span className="hidden sm:inline">{formatDate(data?.modified)}</span>
        <span className="sm:hidden">
          {formatDate(data?.modified).slice(0, 10)}...
        </span>
      </Td>
      <Td>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleFavouriteUpdate(data.id);
          }}
        >
          {data.favourite ? (
            <FaStar size={18} className="text-primary-green" />
          ) : (
            <FaRegStar size={18} className="text-white" />
          )}
        </button>
      </Td>
      <Td>
        <FaEllipsisVertical
          className="cursor-pointer text-white"
          size={18}
          onClick={(e) => {
            e.stopPropagation();
            setModalOpen(!modalOpen);
          }}
        />
        {modalOpen && (
          <OptionsModal
            id={data.id}
            handleDeleteData={handleDeleteData}
            onClose={() => setModalOpen(false)}
          />
        )}
      </Td>
    </tr>
  );
}

function Td({
  children,
  //wrap,
  className = "",
  openEditor,
}: Readonly<{
  children: React.ReactNode;
  wrap?: boolean;
  className?: string;
  openEditor?: () => void;
}>) {
  return (
    <td
      onClick={() => {
        if (openEditor) openEditor();
      }}
      className={`px-2 sm:px-6 whitespace-nowrap py-4 text-sm font-medium text-white ${className}`}
    >
      {children}
    </td>
  );
}

export default TableRow;
