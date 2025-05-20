import { useEffect, useState } from "react";

const HeroLoader = () => {
  const [text, setText] = useState("");
  const fullText = "Anjori Arts";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white font-['Playfair_Display'] relative">
      <h1 className="text-4xl md:text-6xl tracking-wide">
        {text}
      </h1>

      {text === fullText && (
        <>
          {/* Brush stroke */}
          <div className="w-40 h-[4px] bg-gradient-to-r from-pink-500 via-yellow-400 to-pink-500 mt-2 animate-brush" />

          {/* Tagline */}
          <p className="mt-6 text-lg text-gray-300 font-['Quicksand'] animate-fade-in">
            Where Imagination Finds Color
          </p>
        </>
      )}
    </div>
  );
};

export default HeroLoader;
