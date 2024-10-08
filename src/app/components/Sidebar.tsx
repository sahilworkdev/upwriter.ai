// "use client";
// import { useState } from "react";
// import { FiChevronDown, FiChevronUp } from "react-icons/fi";
// import { LiaTimesSolid } from "react-icons/lia";
// import SelectionBox from "./SelectionBox";
// import ProgressBar from "./ProgressBar";
// // import { CiPen } from "react-icons/ci";
// import { FaPenNib } from "react-icons/fa";
// import axios from "axios";
// import LanguageDropdown from "./LanguageDropdown";
// import UseCaseDropdown from "./UseCaseDropdown";
// import { enqueueSnackbar } from "notistack";
// type tagType = {
//   name: string;
//   isSelected: boolean;
// };
// const personalities = [
//   { name: "informative", isSelected: false },
//   { name: "formal", isSelected: false },
//   { name: "storyteller", isSelected: false },
//   { name: "visinory", isSelected: false },
//   { name: "proactive", isSelected: false },
//   { name: "empathetic", isSelected: false },
//   { name: "humorous/playful", isSelected: false },
//   { name: "conversational/friendly", isSelected: false },
//   { name: "analytical", isSelected: false },
//   { name: "persuasive", isSelected: false },
// ];

// const tones = [
//   { name: "Professional", isSelected: false },
//   { name: "Factdriven", isSelected: false },
//   { name: "Knowledgeable", isSelected: false },
// ];

// const Sidebar = ({
//   handleDocumentSubmit,
// }: {
//   handleDocumentSubmit: (data: any) => Promise<void>;
// }) => {
//   const [useCase, setUseCase] = useState("");
//   const [primaryKey, setPrimaryKey] = useState("");
//   const [researchLevel, setResearchLevel] = useState(0);
//   const [personalityTags, setPersonalityTags] =
//     useState<tagType[]>(personalities);
//   const [toneTags, setToneTags] = useState<tagType[]>(tones);
//   const [selectedPersonalityTags, setSelectedPersonalityTags] = useState<
//     tagType[]
//   >([]);
//   const [selectedToneTags, setSelectedToneTags] = useState<tagType[]>([]);
//   const [language, setLanguage] = useState("");
//   const [personalityOpen, setPersonalityOpen] = useState(false);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [toneOpen, setToneOpen] = useState(false);

//   const handlePersonalitySelect = (selectedTag: tagType) => {
//     const updatedTags = personalityTags.map((tag) =>
//       tag.name === selectedTag.name
//         ? { ...tag, isSelected: !tag.isSelected }
//         : tag
//     );

//     if (selectedTag.isSelected) {
//       const updatedTags = selectedPersonalityTags.filter(
//         (tag) => tag.name !== selectedTag.name
//       );
//       setSelectedPersonalityTags(updatedTags);
//     } else {
//       setSelectedPersonalityTags((prevSelected) => [
//         ...prevSelected,
//         { ...selectedTag, isSelected: true },
//       ]);
//     }
//     setPersonalityTags(updatedTags);
//   };

//   const handleToneSelect = (selectedTag: tagType) => {
//     const updatedTags = toneTags.map((tag) => {
//       if (tag.name === selectedTag.name)
//         return { ...tag, isSelected: !tag.isSelected };
//       return { ...tag, isSelected: false };
//     });
//     setToneTags(updatedTags);
//     setSelectedToneTags([{ ...selectedTag, isSelected: true }]);
//   };
//   const allFieldsFilled =
//     useCase &&
//     primaryKey &&
//     selectedPersonalityTags.length > 0 &&
//     selectedToneTags.length > 0 &&
//     language;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     // console.log("helloo");
//     const userJson = localStorage.getItem("user");
//     if (userJson) {
//       const user = JSON.parse(userJson);
//       const accessToken = user.accessToken;
//       if (allFieldsFilled) {
//         const metadata = {
//           useCase: useCase,
//           title: primaryKey,
//           researchLevel: researchLevel,
//           personality: selectedPersonalityTags.map((tag) => tag.name),
//           tone: selectedToneTags.length > 0 ? selectedToneTags[0].name : "", // Change here
//           language: language,
//         };
//         // console.log(metadata, 'meta data');
//         setLoading(true);
//         try {
//           // console.log({ accessToken });
//           const response = await axios.post(
//             `${process.env.NEXT_PUBLIC_SOURCE_URL}/documents/create`,
//             { metadata },
//             {
//               headers: {
//                 Authorization: `Bearer ${accessToken}`,
//               },
//             }
//           );
//           // console.log(response, 'response');
//           if (response?.data?.status) {
//             const data = {
//               id: response?.data?.data?._id,
//               name: response?.data?.data?.content,
//             };
//             handleDocumentSubmit(data);
//             setUseCase("");
//             setPrimaryKey("");
//             setResearchLevel(1);
//             setLanguage("");
//             setSelectedPersonalityTags([]);
//             setSelectedToneTags([]);
//             enqueueSnackbar("Document generated successfully", {variant: "success"});
//           }
//         } catch (error) {
//           console.log(error);
//         } finally {
//           setLoading(false);
//         }
//       }
//     }
//   };
//   return (
//     <div className="min-h-screen min-w- sm:min-h-[87vh] overflow-hidden w-full bg-[#F7F9FF] rounded-md border border-gray-300 p-4">
//       <h2 className="text-2xl font-semibold mb-4 text-[#111827]">Write with AI</h2>
//       <form onSubmit={handleSubmit}>
//         {/* UseCase Drop-down */}
//         <UseCaseDropdown
//           selectedUseCase={useCase}
//           setUseCase={setUseCase}
//           setToneOpen={setToneOpen}
//         />

//         {/* Primary primaryKeyword input */}
//         <div className="mb-4">
//           <label className="block text-[#64748B] font-medium text-lg mb-2">
//             Primary Keywords
//           </label>
//           <input
//             type="text"
//             value={primaryKey}
//             onChange={(e) => setPrimaryKey(e.target.value)}
//             placeholder="AI writing assistant"
//             className="w-full px-4 py-2 border font-semibold text-sm text-[#6B7280] border-gray-300 rounded-md outline-none"
//           />
//         </div>

//         {/* Research level slider */}
//         <ProgressBar setResearchLevel={setResearchLevel} />

//         {/* Personality dropdown */}
//         <div className="mb-4">
//           <div
//             className="flex justify-between items-center cursor-pointer"
//             onClick={(e) => {
//               e.stopPropagation();
//               setPersonalityOpen(!personalityOpen);
//               setToneOpen(false);
//               // setLanguageOpen(false);
//             }}
//           >
//             <label className="block text-[#64748B] font-medium text-lg mb-2">
//               Set personality
//             </label>
//             {personalityOpen ? <FiChevronUp className="text-[#64748B]" /> : <FiChevronDown className="text-[#64748B]" />}
//           </div>
//           {personalityOpen ? (
//             <SelectionBox
//               tags={personalityTags}
//               placeholder="Search another personality"
//               handleSelect={handlePersonalitySelect}
//             />
//           ) : (
//             <div className="flex flex-wrap">
//               {selectedPersonalityTags.map((tag) => (
//                 <div
//                   key={tag.name}
//                   className="flex flex-row items-center gap-2 border-2 border-gray-200 px-2 py-1 rounded-lg m-1"
//                 >
//                   <span>{tag.name}</span>
//                   <LiaTimesSolid
//                     className="cursor-pointer"
//                     onClick={() => handlePersonalitySelect(tag)}
//                   />
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Tone dropdown */}
//         <div className="mb-4">
//           <div
//             className="flex justify-between items-center cursor-pointer"
//             onClick={(e) => {
//               e.stopPropagation();
//               setToneOpen(!toneOpen);
//               setPersonalityOpen(false);
//               // setLanguageOpen(false);
//             }}
//           >
//             <label className="block text-[#64748B] font-medium text-lg mb-2">
//               Set tone
//             </label>
//             {toneOpen ? <FiChevronUp className="text-[#64748B]" /> : <FiChevronDown className="text-[#64748B]"/>}
//           </div>
//           {toneOpen ? (
//             <SelectionBox
//               tags={toneTags}
//               placeholder="Search another tone"
//               handleSelect={handleToneSelect}
//             />
//           ) : (
//             <div className="flex flex-wrap">
//               {selectedToneTags.map((tag) => (
//                 <div
//                   key={tag.name}
//                   className="flex flex-row items-center gap-2 border-2 border-gray-200 px-2 py-1 rounded-lg m-1 cursor-pointer"
//                 >
//                   <span>{tag.name}</span>
//                   <LiaTimesSolid
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleToneSelect(tag);
//                     }}
//                   />
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <LanguageDropdown
//           selectedLanguage={language}
//           setLanguage={setLanguage}
//           setToneOpen={setToneOpen}
//         />
//         <button
//           type="submit"
//           className={`flex gap-2 justify-center items-center cursor-pointer w-full px-4 py-2 mt-8 font-semibold rounded-md ${
//             allFieldsFilled
//               ? "bg-[#6366f1] text-white"
//               : "bg-[#989898] text-white cursor-not-allowed"
//           }`}
//           disabled={!allFieldsFilled}
//         >
//           <FaPenNib
//             className={`text-white text-xl`}
//           />
//           {loading ? "Writing..." : "Write for me"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Sidebar;

"use client";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { LiaTimesSolid } from "react-icons/lia";
import SelectionBox from "./SelectionBox";
import ProgressBar from "./ProgressBar";
import { FaPenNib } from "react-icons/fa";
import axios from "axios";
import LanguageDropdown from "./LanguageDropdown";
import UseCaseDropdown from "./UseCaseDropdown";
import { enqueueSnackbar } from "notistack";

type tagType = {
  name: string;
  isSelected: boolean;
};

const personalities = [
  { name: "informative", isSelected: false },
  { name: "formal", isSelected: false },
  { name: "storyteller", isSelected: false },
  { name: "visionary", isSelected: false },
  { name: "proactive", isSelected: false },
  { name: "empathetic", isSelected: false },
  { name: "humorous/playful", isSelected: false },
  { name: "conversational/friendly", isSelected: false },
  { name: "analytical", isSelected: false },
  { name: "persuasive", isSelected: false },
];

const tones = [
  { name: "Professional", isSelected: false },
  { name: "Fact-driven", isSelected: false },
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
      const updatedSelected = selectedPersonalityTags.filter(
        (tag) => tag.name !== selectedTag.name
      );
      setSelectedPersonalityTags(updatedSelected);
    } else {
      setSelectedPersonalityTags((prevSelected) => [
        ...prevSelected,
        { ...selectedTag, isSelected: true },
      ]);
    }
    setPersonalityTags(updatedTags);
  };

  const handleToneSelect = (selectedTag: tagType) => {
    const updatedTags = toneTags.map((tag) => ({
      ...tag,
      isSelected: tag.name === selectedTag.name ? !tag.isSelected : false,
    }));
    setToneTags(updatedTags);

    if (selectedTag.isSelected) {
      setSelectedToneTags([]);
    } else {
      setSelectedToneTags([{ ...selectedTag, isSelected: true }]);
    }
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
          title: primaryKey,
          researchLevel: researchLevel,
          personality: selectedPersonalityTags.map((tag) => tag.name),
          tone: selectedToneTags.length > 0 ? selectedToneTags[0].name : "",
          language: language,
        };
        setLoading(true);
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_SOURCE_URL}/documents/create`,
            { metadata },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          if (response?.data?.status) {
            const data = {
              id: response?.data?.data?._id,
              name: response?.data?.data?.content,
            };
            await handleDocumentSubmit(data);
            // Reset all state variables
            setUseCase("");
            setPrimaryKey("");
            setResearchLevel(0); // Reset to initial value
            setLanguage("");
            setSelectedPersonalityTags([]);
            setSelectedToneTags([]);
            setPersonalityTags(personalities); // Reset personality tags
            setToneTags(tones); // Reset tone tags
            enqueueSnackbar("Document generated successfully", {
              variant: "success",
            });
          }
        } catch (error) {
          console.log(error);
          enqueueSnackbar("Failed to generate document", { variant: "error" });
        } finally {
          setLoading(false);
        }
      }
    }
  };

  return (
    <div className="h-[90vh] pb-32 mb-10 sm:min-h-[87vh] overflow-y-scroll w-full rounded-md border bg-[#f7f9ff] border-gray-300 p-4">
      <h2 className="text-2xl font-semibold mb-4 text-[#111827]">
        Write with AI
      </h2>
      <form onSubmit={handleSubmit}>
        {/* UseCase Drop-down */}
        <UseCaseDropdown
          selectedUseCase={useCase}
          setUseCase={setUseCase}
          setToneOpen={setToneOpen}
        />

        {/* primaryKeyword input */}
        <div className="mb-4">
          <label className="block text-[#64748B] font-medium text-lg mb-2">
            Primary Keywords
          </label>
          <input
            type="text"
            value={primaryKey}
            onChange={(e) => setPrimaryKey(e.target.value)}
            placeholder="AI writing assistant"
            className="w-full px-4 py-2 border font-semibold text-sm text-[#6B7280] border-gray-300 rounded-md outline-none"
          />
        </div>

        {/* Research level slider */}
        <ProgressBar
          researchLevel={researchLevel}
          setResearchLevel={setResearchLevel}
        />

        {/* Personality dropdown */}
        <div className="mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setPersonalityOpen(!personalityOpen);
              setToneOpen(false);
            }}
          >
            <label className="block text-[#64748B] font-medium text-lg mb-2">
              Set personality
            </label>
            {personalityOpen ? (
              <FiChevronUp className="text-[#64748B]" />
            ) : (
              <FiChevronDown className="text-[#64748B]" />
            )}
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
            }}
          >
            <label className="block text-[#64748B] font-medium text-lg mb-2">
              Set tone
            </label>
            {toneOpen ? (
              <FiChevronUp className="text-[#64748B]" />
            ) : (
              <FiChevronDown className="text-[#64748B]" />
            )}
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
              : "bg-[#989898] text-white cursor-not-allowed"
          }`}
          disabled={!allFieldsFilled}
        >
          <FaPenNib className={`text-white text-xl`} />
          {loading ? "Writing..." : "Write for me"}
        </button>
      </form>
    </div>
  );
};

export default Sidebar;
