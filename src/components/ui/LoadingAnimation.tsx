import React from "react";
import { TfiGithub } from "react-icons/tfi";

const LoadingAnimation = () => {
  return (
    <>
      <div className="flex flex-row mt-2 gap-2">
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]">
          <TfiGithub />
        </div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]">
          <TfiGithub />
        </div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]">
          <TfiGithub />
        </div>
      </div>
    </>
  );
};

export default LoadingAnimation;
