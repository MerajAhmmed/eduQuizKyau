export default function QuizScoreBoard({ quizData, selectedQuiz }) {
 
  const totalQuestions = quizData?.questions?.length;
  const totalParticipation = quizData?.stats?.total_attempts;
  const totoalRemaining = totalQuestions - selectedQuiz;


  return (
    <>
      <h2 className="text-4xl font-bold mb-4">{quizData?.title}</h2>
      <p className="text-gray-600 mb-4">{quizData?.description}</p>

      <div className="flex flex-col">
        <div className="w-fit bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
          Total number of questions : {totalQuestions}
        </div>

        <div className="w-fit bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
          Participation : {totalParticipation}
        </div>

        <div className="w-fit bg-gray-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
          Remaining : {totoalRemaining}
        </div>
      </div>
    </>
  );
}
