import React from "react";
import TableRow from "./TableRow";
import { EditorText } from "./Dashboard";

export type DocumentInfo = {
  id: string;
  name: string;
  words: number;
  modified: string;
  favourite: boolean;
};

interface TableProps {
  favourites: boolean;
  documents: DocumentInfo[];
  handleFavouriteUpdate: (id: string) => void;
  handleDeleteData: (id: string) => void;
  setShowEditor:(b: boolean) => void;
  setEditorText:(data: EditorText) => void;
}

const Table: React.FC<TableProps> = ({
  favourites,
  documents,
  handleFavouriteUpdate,
  handleDeleteData,
  setShowEditor,
  setEditorText
}) => {
  return (
    <div
      style={{ backgroundColor: "#F7F9FF" }}
      className="border rounded-lg overflow-hidden"
    >
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <Th className="text-start pl-8 sm:pl-10">Name</Th>
            <Th className="text-center">Words</Th>
            <Th className="text-center">Modified</Th>
            {/* <Th className="text-center">Words</Th> */}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {documents.map((item) =>
            favourites ? (
              item.favourite && (
                <TableRow
                setEditorText= {setEditorText}
                setShowEditor={setShowEditor}
                  key={item.id}
                  data={item}
                  handleFavouriteUpdate={handleFavouriteUpdate}
                  handleDeleteData={handleDeleteData}
                />
              )
            ) : (
              <TableRow
              setEditorText= {setEditorText}
              setShowEditor={setShowEditor}
                key={item.id}
                data={item}
                handleFavouriteUpdate={handleFavouriteUpdate}
                handleDeleteData={handleDeleteData}
              />
            )
          )}
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
      className={`px-1 py-3 font-semibold text-gray-500 ${className}`}
    >
      {children}
    </th>
  );
}

export default Table;