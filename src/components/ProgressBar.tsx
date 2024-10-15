// "use client";
// import React from "react";

// interface ProgressBarProps {
//   researchLevel: number;
//   setResearchLevel: (level: number) => void;
// }

// const ProgressBar: React.FC<ProgressBarProps> = ({
//   researchLevel,
//   setResearchLevel,
// }) => {
//   const [hover, setHover] = React.useState<boolean>(false);

//   const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newValue = Number(e.target.value);
//     setResearchLevel(newValue);
//   };

//   const progressValue = `${researchLevel}%`;

//   return (
//     <div className="progressBar relative mb-4">
//       <label
//         htmlFor="steps-range"
//         className=" mb-2 flex justify-between items-center text-text-third font-medium"
//       >
//         Research Level
//         <span> ~ 2 min</span>
//       </label>
//       <input
//         id="steps-range"
//         type="range"
//         min="1"
//         max="100"
//         value={researchLevel}
//         step="1"
//         className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
//         onChange={handleRangeChange}
//         onMouseEnter={() => setHover(true)}
//         onMouseLeave={() => setHover(false)}
//         style={{
//           background: `linear-gradient(to right, #A6FF7C 0%, #A6FF7C ${
//             ((researchLevel - 1) / 99) * 100
//           }%, #E5E7EB ${((researchLevel - 1) / 99) * 100}%, #E5E7EB 100%)`,
//         }}
//       />

//       {/* Custom Thumb */}
//       <style jsx>{`
//         input[type='range']::-webkit-slider-thumb {
//           appearance: none;
//           width: 18px;
//           height: 18px;
//           border-radius: 50%;
//           background: #ffffff; /* White color */
//           cursor: pointer;
//           box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
//         }
//       `}</style>

//       {hover && (
//         <div
//           className="absolute top-20 left-0 transform translate-x-1/2 -translate-y-full mt-5 bg-white text-text-primary text-sm font-semibold rounded py-2 px-4 shadow-lg"
//           style={{ whiteSpace: "nowrap" }}
//         >
//           {progressValue}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProgressBar;



"use client";
import React from "react";

interface ProgressBarProps {
  researchLevel: number;
  setResearchLevel: (level: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  researchLevel,
  setResearchLevel,
}) => {
  const [hover, setHover] = React.useState<boolean>(false);

  // Function to calculate the dynamic time (~4 min is for 100%)
  const calculateTime = (level: number) => {
    const maxTimeInMinutes = 4; 
    const timeInMinutes = (level / 100) * maxTimeInMinutes;
    return timeInMinutes.toFixed(1); 
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setResearchLevel(newValue);
  };

  const progressValue = `${researchLevel}%`;

  return (
    <div className="progressBar relative mb-4">
      <label
        htmlFor="steps-range"
        className=" mb-2 flex justify-between items-center text-text-third font-medium"
      >
        Research Level
        <span> ~ {calculateTime(researchLevel)} min</span>
      </label>
      <input
        id="steps-range"
        type="range"
        min="1"
        max="100"
        value={researchLevel}
        step="1"
        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        onChange={handleRangeChange}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          background: `linear-gradient(to right, #A6FF7C 0%, #A6FF7C ${
            ((researchLevel - 1) / 99) * 100
          }%, #E5E7EB ${((researchLevel - 1) / 99) * 100}%, #E5E7EB 100%)`,
        }}
      />

      {/* Custom Thumb */}
      <style jsx>{`
        input[type='range']::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #ffffff; /* White color */
          cursor: pointer;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        }
      `}</style>

      {hover && (
        <div
          className="absolute top-20 left-0 transform translate-x-1/2 -translate-y-full mt-5 bg-white text-text-primary text-sm font-semibold rounded py-2 px-4 shadow-lg"
          style={{ whiteSpace: "nowrap" }}
        >
          {progressValue}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;

