"use client";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { LiaTimesSolid } from "react-icons/lia";
import SelectionBox from "./SelectionBox";
import ProgressBar from "./ProgressBar";
import { CiPen } from "react-icons/ci";
import axios from "axios";
import LanguageDropdown from "./LanguageDropdown";
type tagType = {
  name: string;
  isSelected: boolean;
};
type DocumentInfo = {
  id: string;
  name: string;
  words: number;
  modified: string;
  favourite: boolean;
};
const personalities = [
  { name: "informative", isSelected: false },
  { name: "formal", isSelected: false },
  { name: "storyteller", isSelected: false },
];

const tones = [
  { name: "Professional", isSelected: false },
  { name: "Factdriven", isSelected: false },
  { name: "Knowledgeable", isSelected: false },
];
const Sidebar = ({
  handleDocumentSubmit,
}: {
  handleDocumentSubmit: (data: DocumentInfo) => Promise<void>;
}) => {
  const [useCase, setUseCase] = useState("");
  const [primaryKey, setPrimaryKey] = useState("");
  const [researchLevel, setResearchLevel] = useState(0);
  const [personalityTags, setPersonalityTags] =
    useState<tagType[]>(personalities);
  const [toneTags, setToneTags] = useState<tagType[]>(tones);
  const [selectedPersonalityTags, setSelectedPersonalityTags] = useState<
    tagType[]
  >([]);
  const [selectedToneTags, setSelectedToneTags] = useState<tagType[]>([]);
  const [language, setLanguage] = useState("");
  const [personalityOpen, setPersonalityOpen] = useState(false);
  const [toneOpen, setToneOpen] = useState(false);
  // const [languageOpen, setLanguageOpen] = useState(false);

  const handlePersonalitySelect = (selectedTag: tagType) => {
    const updatedTags = personalityTags.map((tag) =>
      tag.name === selectedTag.name
        ? { ...tag, isSelected: !tag.isSelected }
        : tag
    );

    if (selectedTag.isSelected) {
      const updatedTags = selectedPersonalityTags.filter(
        (tag) => tag.name !== selectedTag.name
      );
      setSelectedPersonalityTags(updatedTags);
    } else {
      setSelectedPersonalityTags((prevSelected) => [
        ...prevSelected,
        { ...selectedTag, isSelected: true },
      ]);
    }
    setPersonalityTags(updatedTags);
  };

  const handleToneSelect = (selectedTag: tagType) => {
    const updatedTags = toneTags.map((tag) =>
      tag.name === selectedTag.name
        ? { ...tag, isSelected: !tag.isSelected }
        : tag
    );

    if (selectedTag.isSelected) {
      const updatedTags = selectedToneTags.filter(
        (tag) => tag.name !== selectedTag.name
      );
      setSelectedToneTags(updatedTags);
    } else {
      setSelectedToneTags((prevSelected) => [
        ...prevSelected,
        { ...selectedTag, isSelected: true },
      ]);
    }
    setToneTags(updatedTags);
  };
  const allFieldsFilled =
    useCase &&
    primaryKey &&
    selectedPersonalityTags.length > 0 &&
    selectedToneTags.length > 0 &&
    language;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userJson = localStorage.getItem("user");
    if (userJson) {
      const user = JSON.parse(userJson);
      const accessToken = user.accessToken;
      if (allFieldsFilled) {
        const metadata = {
          useCase: useCase,
          primaryKey: primaryKey,
          researchLevel: researchLevel,
          personality: selectedPersonalityTags.map((tag) => tag.name),
          tone: selectedToneTags.map((tag) => tag.name),
          language: language,
        };
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_SOURCE_URL}/api/documents/create`,
            { metadata },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          if (response.status === 201) {
            const data = {
              id: response.data._id,
              name: response.data.content,
              words: 0,
              modified: response.data.updatedAt,
              favourite: response.data.isFavorite,
            };
            handleDocumentSubmit(data);
            setUseCase("");
            setPrimaryKey("");
            setResearchLevel(1);
            setLanguage("");
            setSelectedPersonalityTags([]);
            setSelectedToneTags([]);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <div className="min-h-screen sm:min-h-[87vh] overflow-hidden w-full bg-gray-100 rounded-md border border-gray-300 p-4">
      <h2 className="text-lg font-bold mb-4">Write with AI</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-[#64748B] font-medium mb-1">
            Choose use cases
          </label>
          <select
            value={useCase}
            onChange={(e) => setUseCase(e.target.value)}
            className="w-full px-4 py-2  border border-gray-300 rounded-md outline-none"
          >
            <option value="">Select use case</option>
            <option value="Blog Ideas and outlines">
              Blog Ideas and outlines
            </option>
            <option className="hover:bg-[#6366f1]" value="Bussiness Ideas">
              Bussiness Ideas
            </option>
            <option value="Tech Event Ideas">Tech Event Ideas</option>
            <option value="Marketing Events">Marketing Events</option>
          </select>
        </div>

        {/* Primary primaryKey input */}
        <div className="mb-4">
          <label className="block text-[#64748B] font-medium mb-1">
            Primary Keywords
          </label>
          <input
            type="text"
            value={primaryKey}
            onChange={(e) => setPrimaryKey(e.target.value)}
            placeholder="AI writing assistant"
            className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none"
          />
        </div>

        {/* Research level slider */}
        <ProgressBar setResearchLevel={setResearchLevel} />

        {/* Personality dropdown */}
        <div className="mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setPersonalityOpen(!personalityOpen);
              setToneOpen(false);
              // setLanguageOpen(false);
            }}
          >
            <label className="block text-[#64748B] font-medium mb-1">
              Set personality
            </label>
            {personalityOpen ? <FiChevronUp /> : <FiChevronDown />}
          </div>
          {personalityOpen ? (
            <SelectionBox
              tags={personalityTags}
              placeholder="Search another personality"
              handleSelect={handlePersonalitySelect}
            />
          ) : (
            <div className="flex flex-wrap">
              {selectedPersonalityTags.map((tag) => (
                <div
                  key={tag.name}
                  className="flex flex-row items-center gap-2 border-2 border-gray-200 px-2 py-1 rounded-lg m-1"
                >
                  <span>{tag.name}</span>
                  <LiaTimesSolid
                    className="cursor-pointer"
                    onClick={() => handlePersonalitySelect(tag)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tone dropdown */}
        <div className="mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setToneOpen(!toneOpen);
              setPersonalityOpen(false);
              // setLanguageOpen(false);
            }}
          >
            <label className="block text-[#64748B] font-medium mb-1">
              Set tone
            </label>
            {toneOpen ? <FiChevronUp /> : <FiChevronDown />}
          </div>
          {toneOpen ? (
            <SelectionBox
              tags={toneTags}
              placeholder="Search another tone"
              handleSelect={handleToneSelect}
            />
          ) : (
            <div className="flex flex-wrap">
              {selectedToneTags.map((tag) => (
                <div
                  key={tag.name}
                  className="flex flex-row items-center gap-2 border-2 border-gray-200 px-2 py-1 rounded-lg m-1 cursor-pointer"
                >
                  <span>{tag.name}</span>
                  <LiaTimesSolid
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToneSelect(tag);
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Language dropdown */}
        {/* <div className="mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setLanguageOpen(!languageOpen);
              setToneOpen(false);
              setPersonalityOpen(false);
            }}
          >
            <label className="block text-[#64748B] font-medium mb-1">
              Set language
            </label>
            {languageOpen ? <FiChevronUp /> : <FiChevronDown />}
          </div>
          {languageOpen ? (
            <div className="mt-2 border border-gray-300 rounded-lg">
              {["English", "Hindi", "French", "Pashto", "German"].map((l) => (
                <button
                  type="button"
                  key={l}
                  className={`block w-full text-left px-4 py-2 hover:bg-blue-100 ${
                    language === l ? "bg-blue-100" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLanguage(l);
                    setLanguageOpen(false);
                    setToneOpen(false);
                    setPersonalityOpen(false);
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-2 border border-gray-300 rounded-lg px-2">
              {language}
            </div>
          )}
        </div> */}
        <LanguageDropdown
          selectedLanguage={language}
          setLanguage={setLanguage}
          setToneOpen={setToneOpen}
        />
        <button
          type="submit"
          className={`flex gap-2 justify-center items-center cursor-pointer w-full px-4 py-2 mt-8 font-semibold rounded-md ${
            allFieldsFilled
              ? "bg-[#6366f1] text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!allFieldsFilled}
        >
          <CiPen className="text-black" />
          Write for me
        </button>
      </form>
    </div>
  );
};

export default Sidebar;
