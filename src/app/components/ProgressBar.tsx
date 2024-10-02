"use client";
import { useState } from "react";
interface ProgressBarProps {
  setResearchLevel: (level: number) => void;
}
const ProgressBar: React.FC<ProgressBarProps> = ({ setResearchLevel }) => {
  const [progress, setProgress] = useState<number>(1);
  const [hover, setHover] = useState<boolean>(false);
  const [progressValue, setProgressValue] = useState<string>("1%");
  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setProgress(newValue);
    updateProgressValue(newValue);
  };
  const updateProgressValue = (value: number) => {
    const percentage = value;
    setProgressValue(`${percentage}%`);
    setResearchLevel(percentage);
  };
  return (
    <div className="progressBar relative mb-4">
      <label
        htmlFor="steps-range"
        className="block mb-2 text-[#64748B] font-medium text-lg"
      >
        Research Level
      </label>
      <input
        id="steps-range"
        type="range"
        min="1"
        max="100"
        value={progress}
        step="1"
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        onChange={handleRangeChange}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          background: `linear-gradient(to right, #6366F1 0%, #3B82F6 ${
            ((progress - 1) / 99) * 100
          }%, #E5E7EB ${((progress - 1) / 99) * 100}%, #E5E7EB 100%)`,
        }}
      />
      {hover && (
        <div
          className="absolute top-20 left-0 transform translate-x-1/2 -translate-y-full mt-1 bg-gray-700 text-white text-xs rounded py-1 px-2"
          style={{ whiteSpace: "nowrap" }}
        >
          {progressValue}
        </div>
      )}
    </div>
  );
};
export default ProgressBar;
