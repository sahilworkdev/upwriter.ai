// Dropdown.tsx
import React, { useState } from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { MdArrowRightAlt, MdKeyboardArrowDown } from "react-icons/md";

interface DropdownProps {
  options: number[];
  onSelect: (option: number) => void;
}
const pricePerCredit = 1;

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Toggle the dropdown visibility
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Handle selecting an option
  const handleSelect = (option: number) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="relative w-full inline-block text-left ">
      <button
        type="button"
        className="flex items-center justify-between w-full rounded-md bg-black px-5 py-3 text-sm font-medium text-white"
        onClick={toggleDropdown}
      >
        {selectedOption ? (
          <span className="flex items-center">
            <FaIndianRupeeSign /> {String(selectedOption * pricePerCredit)}
          </span>
        ) : ("Select an option" )}
        <MdKeyboardArrowDown />
      </button>

      {/* Dropdown list */}
      {isOpen && (
        <div className="relative overflow-y-scroll space-y-2 px-2 py-3 mt-2 w-full rounded-md bg-white shadow-lg ring-1 ring-text-primary ring-opacity-5 focus:outline-none">
          {options.map((option, index) => (
            <Option option={option} handleSelect={handleSelect} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

function Option({
  option,
  handleSelect,
}: {
  option: number;
  handleSelect: (option: number) => void;
}) {
  return (
    <button
      className="px-4 py-2 text-sm text-gray-50 border-2 border-gray-50 rounded hover:bg-gray-200 hover:text-white w-full flex justify-between"
      onClick={() => handleSelect(option)}
    >
      <span className="flex items-center">
        <FaIndianRupeeSign /> {String(option * pricePerCredit)}
      </span>
      <MdArrowRightAlt />
      <span>{String(option)} - Credits</span>
    </button>
  );
}

export default Dropdown;
