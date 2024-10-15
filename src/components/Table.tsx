import React from "react";
import TableRow from "./TableRow";
import { DocumentInfo } from "./Dashboard";
interface TableProps {
  documents: DocumentInfo[];
  handleFavouriteUpdate: (id: string) => void;
  handleDeleteData: (id: string) => void;
  setShowEditor: (b: boolean) => void;
  setEditorText: (data: DocumentInfo) => void;
  className?: string
}
const Table: React.FC<TableProps> = ({
  documents,
  handleFavouriteUpdate,
  handleDeleteData,
  setShowEditor,
  setEditorText,
  className,
}) => {
  return (
    <div
      className={`rounded-lg
            bg-primary-light text-white ${className}`}
      style={{
        height: "calc(100vh - 220px)",
        overflowY: "auto",
      }}
    >
      <table className="min-w-full  ">
        <thead>
          <tr>
            <Th className="text-start pl-4 sm:pl-10 ">Name</Th>
            <Th className="text-center ">Words</Th>
            <Th className="text-center ">Modified</Th>
          </tr>
        </thead>
        <tbody className=" divide-gray-200">
          {documents.map((item) => (
            <TableRow
              setEditorText={setEditorText}
              setShowEditor={setShowEditor}
              key={item.id}
              data={item}
              handleFavouriteUpdate={handleFavouriteUpdate}
              handleDeleteData={handleDeleteData}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
function Th({
  children,
  className = "",
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <th
      scope="col"
      className={`px-1 py-3 text-white font-medium ${className}`}
    >
      {children}
    </th>
  );
}
export default Table;