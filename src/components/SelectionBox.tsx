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
    <div className="flex flex-col bg-black shadow-md rounded-md p-3">
     <div className="flex items-center border border-gray-200  rounded-lg p-1 shadow-sm mb-2">
        <IoSearch className="text-primary-green ml-2" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder={placeholder}
          className="w-full px-2 py-1 outline-none text-sm text-white placeholder-gray-50 bg-transparent"
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
    // <span
    //   className={`font-medium text-white text-sm px-2 py-1  hover:bg-gray-200 rounded-md m-1 cursor-pointer ${
    //     tag.isSelected ? "bg-primary-green text-black" : "bg-primary-light"
    //   }`}
    //   onClick={onClick}
    // >
    //   {tag.name}
    // </span>
    <span
  className={`font-medium hover:bg-gray-200 text-sm px-2 py-1 rounded-md m-1 cursor-pointer
    ${tag.isSelected ? "bg-primary-green text-black" : "bg-black text-white"}
  `}
  onClick={onClick}
>
  {tag.name}
</span>

  );
}

export default SelectionBox;
