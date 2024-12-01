import { useState } from "react";

import { QuizContext } from "../context";

export default function QuizProvider({ children }) {
  const [quizzes, setquizzes] = useState([]);
  const handleAddQuiz = (addQuiz) => {
    setquizzes((prev) => [...prev, addQuiz]);
  };
  return (
    <QuizContext.Provider value={{ quizzes, handleAddQuiz }}>
      {children}
    </QuizContext.Provider>
  );
}
