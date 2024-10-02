import React from "react";
import TableRow from "./TableRow";

type DocumentInfo = {
  name: string;
  words: number;
  modified: string;
  favourite: boolean;
};
function Table({
  favourites,
  documents,
}: {
  favourites: boolean;
  documents: DocumentInfo[];
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
            <Th className="text-start">Name</Th>
            <Th className="text-center">Words</Th>
            <Th className="text-center">Modified</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item, i) =>
            favourites ? (
              item.favourite && <TableRow key={i} data={item} />
            ) : (
              <TableRow key={i} data={item} />
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
