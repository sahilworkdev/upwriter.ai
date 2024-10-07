"use client";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { LiaTimesSolid } from "react-icons/lia";
import SelectionBox from "./SelectionBox";
import ProgressBar from "./ProgressBar";
import { CiPen } from "react-icons/ci";
import axios from "axios";
import LanguageDropdown from "./LanguageDropdown";
import UseCaseDropdown from "./UseCaseDropdown";
type tagType = {
  name: string;
  isSelected: boolean;
};
const personalities = [
  { name: "informative", isSelected: false },
  { name: "formal", isSelected: false },
  { name: "storyteller", isSelected: false },
  { name: "visinory", isSelected: false },
  { name: "proactive", isSelected: false },
  { name: "empathetic", isSelected: false },
  { name: "humorous/playful", isSelected: false },
  { name: "conversational/friendly", isSelected: false },
  { name: "analytical", isSelected: false },
  { name: "persuasive", isSelected: false },
];

const tones = [
  { name: "Professional", isSelected: false },
  { name: "Factdriven", isSelected: false },
  { name: "Knowledgeable", isSelected: false },
];

const Sidebar = ({
  handleDocumentSubmit,
}: {
  handleDocumentSubmit: (data: any) => Promise<void>;
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
  const [loading, setLoading] = useState<boolean>(false);
  const [toneOpen, setToneOpen] = useState(false);

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
    const updatedTags = toneTags.map((tag) => {
      if (tag.name === selectedTag.name)
        return { ...tag, isSelected: !tag.isSelected };
      return { ...tag, isSelected: false };
    });
    setToneTags(updatedTags);
    setSelectedToneTags([{ ...selectedTag, isSelected: true }]);
  };
  const allFieldsFilled =
    useCase &&
    primaryKey &&
    selectedPersonalityTags.length > 0 &&
    selectedToneTags.length > 0 &&
    language;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("helloo");
    const userJson = localStorage.getItem("user");
    if (userJson) {
      const user = JSON.parse(userJson);
      const accessToken = user.accessToken;
      if (allFieldsFilled) {
        const metadata = {
          useCase: useCase,
          title: primaryKey,
          researchLevel: researchLevel,
          personality: selectedPersonalityTags.map((tag) => tag.name),
          tone: selectedToneTags.length > 0 ? selectedToneTags[0].name : "", // Change here
          language: language,
        };
        // console.log(metadata, 'meta data');
        setLoading(true);
        try {
          // console.log({ accessToken });
          const response = await axios.post(
            // `${process.env.NEXT_PUBLIC_SOURCE_URL}/documents/create`,
            "https://7453-2401-4900-8841-38da-30f0-a3f7-fa1f-a0ad.ngrok-free.app/documents/create",
            { metadata },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          // console.log(response, 'response');
          if (response?.data?.status) {
            const data = {
              id: response?.data?.data?._id,
              name: response?.data?.data?.content,
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
        } finally {
          setLoading(false);
        }
      }
    }
  };
  return (
    <div className="min-h-screen sm:min-h-[87vh] overflow-hidden w-full bg-gray-100 rounded-md border border-gray-300 p-4">
      <h2 className="text-lg font-bold mb-4">Write with AI</h2>
      <form onSubmit={handleSubmit}>
        {/* UseCase Drop-down */}
        <UseCaseDropdown
          selectedUseCase={useCase}
          setUseCase={setUseCase}
          setToneOpen={setToneOpen}
        />

        {/* Primary primaryKeyword input */}
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
          // onClick={() => console.log("btn clicked")}
        >
          <CiPen
            className={`${allFieldsFilled && "text-white"}text-black text-xl`}
          />
          {loading ? "Writing..." : "Write for me"}
        </button>
      </form>
    </div>
  );
};

export default Sidebar;
