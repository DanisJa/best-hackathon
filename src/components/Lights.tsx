import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { IoSunny } from "react-icons/io5";

const ProgressBar = ({
  progress,
  onChange,
}: {
  progress: number;
  onChange: (newProgress: number) => void;
}) => {
  const totalDots = 10;
  const filledDots = progress / 10; // Each dot represents 10%

  return (
    <div className="flex space-x-2 cursor-pointer">
      {Array.from({ length: totalDots }).map((_, index) => {
        const newProgress = (index + 1) * 10;
        return (
          <div
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index < filledDots ? "bg-white" : "bg-gray-600 opacity-40"
            }`}
            onClick={() => onChange(newProgress)}
          />
        );
      })}
    </div>
  );
};

const Lights = () => {
  const [lightLevels, setLightLevels] = useState<number[]>(() => {
    // Initialize light levels from localStorage or default to [60, 60, 60, 60, 60, 60]
    const storedLevels = localStorage.getItem("lightLevels");
    return storedLevels ? JSON.parse(storedLevels) : Array(6).fill(60);
  });

  useEffect(() => {
    // Save light levels to localStorage whenever they change
    localStorage.setItem("lightLevels", JSON.stringify(lightLevels));
  }, [lightLevels]);

  const handleLightLevelChange = (index: number, newProgress: number) => {
    const newLightLevels = [...lightLevels];
    newLightLevels[index] = newProgress;
    setLightLevels(newLightLevels);
  };

  return (
    <Card className="p-6 rounded-lg shadow-md max-h-fit w-[350px] text-white">
      <div className="flex flex-col gap-6">
        {lightLevels.map((lightLevel, index) => (
          <div key={index} className="flex items-center justify-around">
            <Card className="bg-[#252525] max-w-fit py-4 px-4">
              <IoSunny className="text-3xl text-[#3DFF94]" />
            </Card>
            <div className="flex flex-col gap-4">
              <div className="w-full flex justify-between items-center">
                <p className="text-gray-400">Light {index + 1}</p>
                <p>{lightLevel}%</p>
              </div>
              <ProgressBar
                progress={lightLevel}
                onChange={(newProgress) =>
                  handleLightLevelChange(index, newProgress)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Lights;
