"use client";
import React from "react";
import { motion } from "motion/react";

// Helper function to interpolate between two hex colors
function interpolateColor(color1: string, color2: string, factor: number): string {
  const c1 = color1.replace('#', '').match(/.{2}/g)!.map(hex => parseInt(hex, 16));
  const c2 = color2.replace('#', '').match(/.{2}/g)!.map(hex => parseInt(hex, 16));
  
  const result = c1.map((channel, i) => {
    return Math.round(channel + factor * (c2[i] - channel));
  });
  
  return `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
}

export default function ColourfulText({ text }: { text: string }) {
  const startColor = "#6A1383"; // purple - from original gradient
  const endColor = "#38B6FF";   // blue - from original gradient

  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Split text into words to prevent mid-word breaking
  const words = text.split(" ");
  const textArray = text.split("");
  const totalChars = textArray.length;

  return (
    <>
      {words.map((word, wordIndex) => {
        const wordStartIndex = words.slice(0, wordIndex).join(" ").length + (wordIndex > 0 ? 1 : 0);
        
        return (
          <span key={`word-${wordIndex}-${count}`} className="inline-block">
            {word.split("").map((char, charIndex) => {
              const index = wordStartIndex + charIndex;
    const position = index / Math.max(totalChars - 1, 1);
    const color = interpolateColor(startColor, endColor, position);
    
    return (
      <motion.span
        key={`${char}-${count}-${index}`}
                  initial={{ y: 0 }}
        animate={{
          color: color,
          y: [0, -3, 0],
          scale: [1, 1.01, 1],
          filter: ["blur(0px)", `blur(5px)`, "blur(0px)"],
          opacity: [1, 0.8, 1],
        }}
        transition={{
          duration: 0.5,
          delay: index * 0.05,
        }}
                  className="inline font-sans tracking-tight"
      >
        {char}
      </motion.span>
    );
            })}
            {wordIndex < words.length - 1 && <span className="inline">&nbsp;</span>}//ads spacing on colorful text.txt
          </span>
        );
      })}
    </>
  );
}
