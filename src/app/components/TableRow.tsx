import { FaStar, FaRegStar, FaFileAlt } from "react-icons/fa"; //FaRegFileAlt
import { FaEllipsisVertical } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
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
};
type optionProps = {
  id: string;
  handleDeleteData: (id: string) => void;
};

function TableRow({ data, handleFavouriteUpdate, handleDeleteData }: Props) {
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
    <tr>
      <Td wrap className="flex !whitespace-normal items-center">
        <FaFileAlt
          style={{ color: "#989898" }}
          className="inline mr-2 hover:cursor-pointer"
        />
        <span className="hidden sm:inline">{data.name}</span>
        <span className="sm:hidden">{data.name.slice(0, 10)}...</span>
      </Td>
      <Td className="text-center">{data.words}</Td>
      <Td className="text-center">
        <span className="hidden sm:inline">{formatDate(data.modified)}</span>
        <span className="sm:hidden">{data.modified.slice(0, 10)}...</span>
      </Td>
      <Td>
        <button onClick={() => handleFavouriteUpdate(data.id)}>
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
    <div className="absolute">
      <FaEllipsisVertical
        className="cursor-pointer"
        size={18}
        style={{ color: "#989898" }}
        onClick={() => setModalOpen(!modalOpen)}
      />
      {modalOpen && (
        <div
          className="absolute rounded-md flex flex-col gap-2 overflow-y-auto p-4 bg-white shadow-lg z-10"
          onClick={() => {
            console.log("edit called");
            setModalOpen(false);
          }}
        >
          <div className="flex gap-1 cursor-pointer">
            <CiEdit size={18} />
            <span>Edit</span>
          </div>

          <div
            className="flex gap-1 cursor-pointer"
            onClick={() => {
              handleDeleteData(id);
              setModalOpen(false);
            }}
          >
            <FaTrashAlt size={18} />
            <span>Delete</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default TableRow;
