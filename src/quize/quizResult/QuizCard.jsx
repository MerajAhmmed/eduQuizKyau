export default function QuizCard({ quiz, count, submission }) {
  return (
    <div className="rounded-lg overflow-hidden shadow-sm mb-4">
      <div className="bg-white p-6 !pb-2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {count + 1}. {quiz?.question}
          </h3>
        </div>
        <div className="space-y-2">
          {quiz?.options?.map((option, index) => {
            const isSelected = option === submission?.answer;
            const isCorrect = option === quiz?.correctAnswer;
            const isWrong = isSelected && !isCorrect;
            return (
              <label
                className={`flex items-center space-x-3 ${
                  isCorrect ? "text-green-900 " : isWrong ? "text-red-500" : ""
                }`}
                key={index}
              >
                <input
                  type="radio"
                  name={quiz?.id}
                  className="form-radio text-buzzr-purple"
                  checked={isSelected}
                  readOnly
                />
                <span>{option}</span>
                {isWrong && (
                  <span className="ml-2 text-red-500 font-semibold">
                    Wrong Answer{" "}
                  </span>
                )}
                {isCorrect && (
                  <span className="ml-2 text-green-900 font-semibold">
                    Correct Answer
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
