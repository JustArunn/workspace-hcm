import React from "react";
import { useThemes } from "../../context/Context";

const Themes: React.FC = () => {
  const { bgColor, setBgColor, fontColor, setFontColor } = useThemes();

  const colorOptions = [
    { bg: "#0078D4", font: "#FFFFFF" }, // Microsoft - bg-blue-500, text-white
    { bg: "#22C55E", font: "#FFFFFF" }, // Green - bg-green-500, text-white
    { bg: "#EF4444", font: "#FFFFFF" }, // Red - bg-red-500, text-white
    { bg: "#A855F7", font: "#FFFFFF" }, // Purple - bg-purple-500, text-white
    { bg: "#1F2937", font: "#FFFFFF" }, // Gray - bg-gray-800, text-white
    { bg: "#D946EF", font: "#FFFFFF" }, // Pink - bg-pink-500, text-white
    { bg: "#6366F1", font: "#FFFFFF" }, // Indigo - bg-indigo-500

    // Added color options inspired by big companies
    { bg: "#FF9900", font: "#FFFFFF" }, // Amazon - bg-orange, text-white
    { bg: "#E63946", font: "#FFFFFF" }, // Spotify - bg-red, text-white
    { bg: "#00A6A6", font: "#FFFFFF" }, // Twitter - bg-teal, text-white
    { bg: "#4B6F44", font: "#FFFFFF" }, // Whole Foods - bg-dark-green, text-white
    { bg: "#F05023", font: "#FFFFFF" }, // Facebook - bg-orange-red, text-white
    { bg: "#1DA1F2", font: "#FFFFFF" }, // Twitter - bg-blue, text-white
    { bg: "#A500B5", font: "#FFFFFF" }, // Twitch - bg-purple, text-white
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Color Theme Selector</h1>
      <p className="mb-2">Choose your theme:</p>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {colorOptions.map(({ bg, font }, index) => (
          <div
            key={index}
            className="cursor-pointer p-4 rounded flex items-center justify-center"
            style={{ backgroundColor: bg, color: font }}
            onClick={() => {
              setBgColor(bg);
              setFontColor(font);
            }}
          >
            <span className="font-bold">{bg === "#FBBF24" ? "A" : "B"}</span>
          </div>
        ))}
      </div>
      <div
        className="p-6 rounded-md shadow-md"
        style={{ backgroundColor: bgColor, color: fontColor }}
      >
        <h2 className="text-xl">Preview</h2>
        <p>This is a preview of your selected theme.</p>
      </div>
    </div>
  );
};

export default Themes;
