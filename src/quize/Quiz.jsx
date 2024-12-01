import { useEffect, useState } from "react";

export default function Quiz({
  quiz,
  handleNextQuiz,
  questionLength,
  selectedQuiz,
  handleSubmit,
  handlePrevQuiz,
  handleAnswer,
  answers,
}) {
  const [shuffledQuizData, setShuffledQuizData] = useState(null);

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  useEffect(() => {
    if (quiz) {
      const shuffledData = {
        ...quiz,
        options: shuffleArray([...quiz.options]),
      };
      setShuffledQuizData(shuffledData);
    }
  }, [quiz]);

  if (!shuffledQuizData) return null;

  return (
    <div className="bg-white p-6 !pb-2 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold">{quiz?.question}</h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {shuffledQuizData?.options?.map((option) => (
          <label
            className="flex items-center space-x-3 py-3 px-4 bg-primary/5 rounded-md text-lg"
            key={option}
          >
            <input
              type="checkbox"
              name="answer1"
              className="form-radio text-buzzr-purple"
              checked={answers.some(
                (answer) =>
                  answer.id === shuffledQuizData.id && answer.answer === option
              )}
              onChange={() => handleAnswer(shuffledQuizData.id, option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>

      <div className="w-full flex gap-3">
        {selectedQuiz !== 0 && (
          <button
            className="w-1/2 text-center ml-auto block bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold my-8"
            onClick={handlePrevQuiz}
          >
            Prev
          </button>
        )}
        {selectedQuiz === questionLength - 1 ? (
          <button
            className="w-1/2 text-center ml-auto block bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold my-8"
            onClick={handleSubmit}
          >
            Submit
          </button>
        ) : (
          <button
            className="w-1/2 text-center ml-auto block bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold my-8"
            onClick={handleNextQuiz}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
