import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import avater from "../assets/avater.webp";
import Header from "../component/common/Header";
import useAuth from "../hooks/useAuth";
import { useAxios } from "../hooks/useAxios";
import { getOrdinalNumber } from "../utils/positionUtils";
import Ranking from "./Ranking";

export default function LeaderboardPage({ children }) {
  const [leaderboardData, setLeaderboardData] = useState(null);
  const { api } = useAxios();
  const { auth } = useAuth();
  const { quizSetId } = useParams();
  useEffect(() => {
    let ignore = false;
    const fetchResult = async () => {
      try {
        const response = await api.get(
          `${
            import.meta.env.VITE_SERVER_BASE_URL
          }/api/quizzes/${quizSetId}/attempts`
        );

        if (response.status === 200) {
          if (!ignore) {
            setLeaderboardData(response.data.data);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchResult();
    return () => {
      ignore = true;
    };
  }, [api, quizSetId]);

  const userAttempt = leaderboardData?.attempts?.find(
    (attempt) => attempt.user.id === auth.user.id
  );

  const listOfCorrectAnswers = userAttempt?.correct_answers;

  const totalCorrectSubmissions = userAttempt?.submitted_answers?.reduce(
    (correctCount, submittedResponse) => {
      const isAnswerCorrect = listOfCorrectAnswers?.some(
        (correctResponse) =>
          correctResponse.question_id === submittedResponse.question_id &&
          correctResponse.answer === submittedResponse.answer
      );
      return isAnswerCorrect ? correctCount + 1 : correctCount;
    },
    0
  );

  const totalAchievedMarks = userAttempt?.submitted_answers?.reduce(
    (marksAccumulator, submittedResponse) => {
      const matchedAnswer = listOfCorrectAnswers?.find(
        (correctResponse) =>
          correctResponse.question_id === submittedResponse.question_id &&
          correctResponse.answer === submittedResponse.answer
      );
      return matchedAnswer
        ? marksAccumulator + matchedAnswer.marks
        : marksAccumulator;
    },
    0
  );
  const sortedLeaderboard = leaderboardData?.attempts?.sort((a, b) => {
    if (b.total_marks === a.total_marks) {
      return b.correct_answers.length - a.correct_answers.length;
    }
    return b.total_marks - a.total_marks;
  });

  const userPosition =
    sortedLeaderboard?.findIndex(
      (attempt) => attempt?.user?.id === auth?.user?.id
    ) + 1;

  return (
    <div className="bg-[#F5F3FF]  p-4">
      <Header />
      <main className="min-h-[calc(100vh-50px)] flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-primary rounded-lg p-6 text-white">
              <div className="flex flex-col items-center mb-6">
                <img
                  src={avater}
                  alt="Profile Pic"
                  className="w-20 h-20 rounded-full border-4 border-white mb-4 object-cover"
                />
                <h2 className="text-2xl font-bold">{auth?.user?.full_name}</h2>
                <p className="text-xl">
                  {getOrdinalNumber(userPosition)} Position
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-sm opacity-75">Mark</p>
                  <p className="text-2xl font-bold">{totalAchievedMarks}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm opacity-75">Correct</p>
                  <p className="text-2xl font-bold">
                    {totalCorrectSubmissions}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm opacity-75">Wrong</p>
                  <p className="text-2xl font-bold">
                    {userAttempt?.submitted_answers?.length -
                      totalCorrectSubmissions}
                  </p>
                </div>
              </div>
            </div>

            <Ranking
              leaderboardData={leaderboardData}
              userId={auth?.user?.id}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
