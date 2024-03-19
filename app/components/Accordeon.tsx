'use client';

import { useCallback, useEffect, useState } from "react";

import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

interface AccordeonProps {
  question: string;
  answer: string;
}
export const Accordeon: React.FC<AccordeonProps> = ({
  question,
  answer,
}) => {
  
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleAnswer = useCallback(() => {
    setShowAnswer((showAnswer) => !showAnswer);

  }, [])

  return (
    <div 
      className="
        flex
        flex-col
        mt-8
        border
        shadow-sm
        gap-4
        p-4
        hover:shadow-xl
        rounded-lg
        "
    >
      <div 
        onClick={toggleAnswer}
        className="
          flex 
          flex-row
          justify-between
          items-center
          w-full
          cursor-pointer
          "
      >
        <div
          className="
          text-lg
          font-semibold  
            transition
          "
        >
          {question}
      </div>
      {showAnswer ? <MdKeyboardArrowUp size={20}/> : <MdKeyboardArrowDown size={20}/>}
      

      </div>
      {showAnswer && (
        <div 
          className={`
            text-md
            font-light 
            text-neutral-700
            transition-opacity
            delay-300
            duration-300
            ease-in-out
            ${showAnswer ? "translate-y-0" : "translate-y-100"}
            ${showAnswer ? "opacity-100" : "opacity-0"}
            `}
        
        >
          {answer}
        </div>
      )}
      
    </div>
  )
}
