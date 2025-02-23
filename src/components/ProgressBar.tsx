const ProgressBar = ({ progress }: { progress: number }) => {
  const totalDots = 10;
  return (
    <div className="flex space-x-2">
      {Array.from({ length: totalDots }).map((_, index) => (
        <div
          key={index}
          className={`w-3 h-3 rounded-full ${
            index < progress ? "bg-white" : "bg-gray-600 opacity-40"
          }`}
        />
      ))}
    </div>
  );
};

export default ProgressBar;
