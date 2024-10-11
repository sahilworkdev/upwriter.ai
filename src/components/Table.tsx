import React from "react";
import TableRow from "./TableRow";
import { DocumentInfo } from "./Dashboard";
interface TableProps {
  documents: DocumentInfo[];
  handleFavouriteUpdate: (id: string) => void;
  handleDeleteData: (id: string) => void;
  setShowEditor: (b: boolean) => void;
  setEditorText: (data: DocumentInfo) => void;
}
const Table: React.FC<TableProps> = ({
  documents,
  handleFavouriteUpdate,
  handleDeleteData,
  setShowEditor,
  setEditorText,
}) => {
  return (
    <div
      className="border rounded-lg
           overflow-y-scroll bg-primary-light"
      style={{
        height: "calc(100vh - 220px)",
        overflowY: "auto",
      }}
    >
      <table className="min-w-full divide-y divide-gray-100">
        <thead>
          <tr>
            <Th className="text-start pl-8 sm:pl-10">Name</Th>
            <Th className="text-center">Words</Th>
            <Th className="text-center">Modified</Th>
          </tr>
        </thead>
        <tbody className=" divide-gray-100">
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
      className={`px-1 py-3 font-semibold text-gray-50 ${className}`}
    >
      {children}
    </th>
  );
}
export default Table;