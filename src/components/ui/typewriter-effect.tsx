"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const words = [
  {
    text: "Plan",
  },
  {
    text: "schedule",
  },
  {
    text: "with",
  },
  {
    text: "Lumios Bot.",
    className: "text-blue-500 dark:text-blue-500",
  },
];

export const TimetableHeaderAnimation = () => {
  const [headerEnabled, setHeaderEnabled] = useState(true);

  useEffect(() => {
    setHeaderEnabled(
      localStorage.getItem("enableTimetableHeader") !== "Disabled",
    );
  }, []);

  if (!headerEnabled) return null;

  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });
  const renderWords = () => {
    return (
      <div>
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <span
                  key={`char-${index}`}
                  className={cn(`text-black dark:text-white`, word.className)}
                >
                  {char}
                </span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="my-6 mb-12 flex space-x-1">
      <motion.div
        className="overflow-hidden"
        initial={{ width: 0 }}
        animate={{ width: "fit-content" }}
        transition={{
          duration: 2,
          ease: "linear",
          delay: 1,
        }}
      >
        <div
          className="text-xs font-bold sm:text-base md:text-xl lg:text-3xl xl:text-5xl"
          style={{
            whiteSpace: "nowrap",
          }}
        >
          {renderWords()}{" "}
        </div>{" "}
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="block h-4 w-[4px] rounded-sm bg-blue-500 sm:h-6 xl:h-12"
      ></motion.span>
    </div>
  );
};
