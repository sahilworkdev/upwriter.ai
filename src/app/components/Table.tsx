import React from "react";
import TableRow from "./TableRow";

type DocumentInfo = {
  id: string;
  name: string;
  words: number;
  modified: string;
  favourite: boolean;
};
function Table({
  favourites,
  documents,
  handleFavouriteUpdate,
  handleDeleteData,
}: {
  favourites: boolean;
  documents: DocumentInfo[];
  handleFavouriteUpdate: (id: string) => void;
  handleDeleteData: (id: string) => void;
}) {
  const data = documents;

  return (
    <div
      style={{ backgroundColor: "#f8f9fe" }}
      className="border rounded-lg overflow-hidden"
    >
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <Th className="text-start pl-8 sm:pl-10">Name</Th>
            <Th className="text-center">Words</Th>
            <Th className="text-center">Modified</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item) =>
            favourites ? (
              item.favourite && (
                <TableRow
                  key={item.id}
                  data={item}
                  handleFavouriteUpdate={handleFavouriteUpdate}
                  handleDeleteData={handleDeleteData}
                />
              )
            ) : (
              <TableRow
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
}

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
