import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 rounded-full bg-primary-green animate-pulse"></div>
        <div className="w-4 h-4 rounded-full bg-primary-green animate-pulse delay-150"></div>
        <div className="w-4 h-4 rounded-full bg-primary-green animate-pulse delay-300"></div>
      </div>
    </div>
  );
};

export default Loading;
