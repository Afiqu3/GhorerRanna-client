import React from "react";
import { RingLoader } from "react-spinners";
import useTheme from "../../hooks/useTheme";

const LoadingSpinner = () => {
  const { theme } = useTheme();
  if (theme === "dark") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black z-50">
        <RingLoader color="#00FFFF" size={100} />
      </div>
    );
  }
  return (
    <div className="flex justify-center bg-primary items-center min-h-screen">
      <RingLoader color="#FEA116" size={100} />
    </div>
  );
};

export default LoadingSpinner;