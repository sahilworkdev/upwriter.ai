import React, { useState } from "react";
import { FaStar, FaRegStar, FaFileAlt } from "react-icons/fa"; //FaRegFileAlt
import { FaEllipsisVertical } from "react-icons/fa6";

type Props = {
  data: { name: string; words: number; modified: string; favourite: boolean };
};

function TableRow({ data }: Props) {
  const [favourite, setFavourite] = useState(data.favourite);

  return (
    <tr>
      <Td wrap className="flex !whitespace-normal items-center">
        <FaFileAlt style={{ color: "#989898" }} className="inline mr-2" />
        <span className="hidden sm:inline">{data.name}</span>
        <span className="sm:hidden">{data.name.slice(0, 10)}...</span>
      </Td>
      <Td className="text-center">{data.words}</Td>
      <Td className="text-center">
        <span className="hidden sm:inline">{data.modified}</span>
        <span className="sm:hidden">{data.modified.slice(0, 10)}...</span>
      </Td>
      <Td>
        <button onClick={() => setFavourite(!favourite)}>
          {favourite ? (
            <FaStar size={18} style={{ color: "#989898" }} />
          ) : (
            <FaRegStar size={18} style={{ color: "#989898" }} />
          )}
        </button>
      </Td>
      <Td>
        <FaEllipsisVertical size={18} style={{ color: "#989898" }} />
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

export default TableRow;
