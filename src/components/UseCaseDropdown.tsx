import React, { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

type UseCaseDropdownProps = {
  selectedUseCase: string;
  setUseCase: (language: string) => void;
  setToneOpen?: (isOpen: boolean) => void;
  setPersonalityOpen?: (isOpen: boolean) => void;
};

const useCases = [
  " Blog Ideas and outlines",
  "Tech Event Ideas",
  " Bussiness Ideas",
  "Marketing Events",
];

const UseCaseDropdown: React.FC<UseCaseDropdownProps> = ({
  selectedUseCase,
  setUseCase,
  setToneOpen,
  setPersonalityOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleUseCaseSelect = (useCase: string) => {
    setUseCase(useCase);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Use useEffect to handle dropdown opening and closing
  useEffect(() => {
    if (isOpen) {
      if (setToneOpen) setToneOpen(false);
      if (setPersonalityOpen) setPersonalityOpen(false);
    }
  }, [isOpen, setToneOpen, setPersonalityOpen]);

  return (
    <div className={`element mb-4 ${isOpen ? "shadow-lg rounded-md bg-black" : ""}`}>
      <div
        className={`flex justify-between  items-center cursor-pointer ${
          isOpen ? "bg-primary-green p-2 rounded-t-md text-black" : "text-text-third"
        }`}
        onClick={toggleDropdown}
      >
        <label className="block mb-1 font-medium">Choose use cases</label>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </div>
      {isOpen && (
        <div className="mt-2 rounded-md max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-thumb-rounded-full">
          {useCases.map((useCase) => (
            <button
              type="button"
              key={useCase}
              className={`block w-[95%] text-left px-2 py-1 rounded-md m-1 hover:bg-primary-green hover:text-black`}
              onClick={() => handleUseCaseSelect(useCase)}
            >
              {useCase}
            </button>
          ))}
        </div>
      )}
      {!isOpen && selectedUseCase && (
        <div className="mt-2 border border-gray-200 rounded-md p-2">
          {selectedUseCase}
        </div>
      )}
    </div>
  );
};

export default UseCaseDropdown;