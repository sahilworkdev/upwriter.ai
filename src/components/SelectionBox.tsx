"use client";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";

interface ComboBoxTagProps {
  tags: tagType[];
  placeholder?: string;
  handleSelect: (selectedTag: tagType) => void;
}

type tagType = {
  name: string;
  isSelected: boolean;
};

function SelectionBox({ tags, placeholder, handleSelect }: ComboBoxTagProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col bg-white shadow-md rounded-md p-3">
     <div className="flex items-center border border-gray-100 rounded-lg p-1 bg-white shadow-sm mb-2">
        <IoSearch className="text-gray-500 ml-2" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder={placeholder}
          className="w-full px-2 py-1 outline-none text-sm text-text-primary placeholder-gray-50 bg-transparent"
        />
      </div>

      <div className="flex flex-wrap">
        {filteredTags.map((tag) => (
          <Tag tag={tag} key={tag.name} onClick={() => handleSelect(tag)} />
        ))}
      </div>
    </div>
  );
}

function Tag({ tag, onClick }: { tag: tagType; onClick: () => void }) {
  return (
    <span
      className={` border-2 text-gray-50 font-medium text-sm border-gray-100 px-2 py-1 hover:border-primary-default rounded-lg m-1 cursor-pointer ${
        tag.isSelected ? "bg-primary-default text-white" : "bg-primary-light"
      }`}
      onClick={onClick}
    >
      {tag.name}
    </span>
  );
}

export default SelectionBox;
