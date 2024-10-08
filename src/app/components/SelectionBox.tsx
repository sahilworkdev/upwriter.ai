"use client";
import { useState } from "react";

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
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder={placeholder}
        className="border px-2 py-1 outline-none rounded-lg mb-1"
      />
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
      className={` border-2 text-[#6B7280] font-medium border-gray-200 px-2 py-1 hover:border-[#6366f1] rounded-lg m-1 cursor-pointer ${
        tag.isSelected ? "bg-[#6366f1] text-white" : "bg-[#F7F9FF]"
      }`}
      onClick={onClick}
    >
      {tag.name}
    </span>
  );
}

export default SelectionBox;
