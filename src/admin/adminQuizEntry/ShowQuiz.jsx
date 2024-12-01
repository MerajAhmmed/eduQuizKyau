export default function ShowQuiz({ questions, handleDelete, handleEdit }) {
  return (
    <div className="px-4">
      {questions?.map((question, index) => (
        <div key={index} className="rounded-lg overflow-hidden shadow-sm mb-4">
          <div className="bg-white p-6 !pb-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {index + 1}. {question?.question}
              </h3>
            </div>
            <div className="space-y-2">
              {question?.options.map((option, optionIndex) => (
                <label
                  key={optionIndex}
                  className={`flex items-center space-x-3 ${
                    option.isCorrect ? "font-bold text-green-600" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name={`answer${index}`}
                    className="form-radio text-buzzr-purple"
                    checked={option.isCorrect}
                    readOnly
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex space-x-4 bg-primary/10 px-6 py-2">
            <button
              className="text-red-600 hover:text-red-800 font-medium"
              onClick={() => handleDelete(question.id)}
            >
              Delete
            </button>
            <button
              className="text-primary hover:text-primary/80 font-medium"
              onClick={() => handleEdit(question)}
            >
              Edit Question
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
