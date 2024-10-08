import React from "react";
import { useThemes } from "../../context/Context";

interface IHeadingProps {
  children: React.ReactNode;
}
const Heading: React.FC<IHeadingProps> = ({ children }) => {
  const { bgColor } = useThemes();
  return (
    <h1
      style={{ color: bgColor }}
      className={`text-2xl font-bold mb-4 text-center`}
    >
      {children}
    </h1>
  );
};

export default Heading;
