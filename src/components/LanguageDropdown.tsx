import React, { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

type LanguageDropdownProps = {
  selectedLanguage: string;
  setLanguage: (language: string) => void;
  setToneOpen?: (isOpen: boolean) => void;
  setPersonalityOpen?: (isOpen: boolean) => void;
};

const languages = [
  "English",
  "Hindi",
  "French",
  "Pashto",
  "German",
  "Urdu",
  "Spanish",
];

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  selectedLanguage,
  setLanguage,
  setToneOpen,
  setPersonalityOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageSelect = (language: string) => {
    setLanguage(language);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Use useEffect to handle dropdown opening and closing
  useEffect(() => {
    if (isOpen) {
      // Close tone and personality dropdowns when opening language dropdown
      if (setToneOpen) setToneOpen(false);
      if (setPersonalityOpen) setPersonalityOpen(false);
    }
  }, [isOpen, setToneOpen, setPersonalityOpen]);

  return (
    <div className={`mb-4 ${isOpen ? "shadow-lg rounded-md bg-white" : ""}`}>
      <div
        className={`flex justify-between text-text-third items-center cursor-pointer ${
          isOpen ? "bg-primary-default p-2 rounded-t-md text-white" : ""
        }`}
        onClick={toggleDropdown}
      >
        <label className="block mb-1 font-medium">Set language</label>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </div>
      {isOpen && (
        <div className="mt-2 rounded-md max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-thumb-rounded-full">
          {languages.map((language) => (
            <button
              type="button"
              key={language}
              className={`block w-[95%] text-left px-2 py-1 rounded-md m-1 hover:bg-primary-default hover:text-white`}
              onClick={() => handleLanguageSelect(language)}
            >
              {language}
            </button>
          ))}
        </div>
      )}
      {!isOpen && selectedLanguage && (
        <div className="mt-2 border border-gray-100 rounded-md p-2">
          {selectedLanguage}
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
