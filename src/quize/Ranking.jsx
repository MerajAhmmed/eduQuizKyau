import avater from "../assets/avater.webp";
import { getOrdinalNumber } from "../utils/positionUtils";

export default function Ranking({ leaderboardData, userId }) {
  const rankingData = leaderboardData?.attempts
    ?.map((attemptRecord) => {
      const correctAnswersList = attemptRecord?.correct_answers;

      const totalScore = attemptRecord?.submitted_answers?.reduce(
        (scoreAccumulator, submittedResponse) => {
          const matchedAnswer = correctAnswersList?.find(
            (correctAnswer) =>
              correctAnswer.question_id === submittedResponse.question_id &&
              correctAnswer.answer === submittedResponse.answer
          );
          return matchedAnswer
            ? scoreAccumulator + matchedAnswer.marks
            : scoreAccumulator;
        },
        0
      );

      return {
        user: attemptRecord.user,
        totalScore,
      };
    })
    ?.sort((a, b) => b.totalScore - a.totalScore);

  let currentRank = 0;
  let previousScore = 0;

  const rankedData = rankingData?.map((userScoreRecord) => {
    if (currentRank === 0) {
      previousScore = userScoreRecord.totalScore;
      currentRank += 1;
    } else if (userScoreRecord.totalScore !== previousScore) {
      currentRank += 1;
      previousScore = userScoreRecord.totalScore;
    }

    return {
      ...userScoreRecord,
      rank: currentRank,
    };
  });
  const topRankedData = rankedData?.slice(0, 5);

  return (
    <div>
      <h1 className="text-2xl font-bold">Leaderboard</h1>
      <p className="mb-6">{leaderboardData?.quiz?.title}</p>
      <ul className="space-y-4">
        {topRankedData?.map(({ user, totalScore, rank }) => {
          const isCurrentUser = user?.id === userId;

          return (
            <li
              className={`flex items-center justify-between ${
                isCurrentUser ? "bg-red-400 rounded-full" : ""
              }`}
              key={user?.id}
            >
              <div className="flex items-center">
                <img
                  src={avater}
                  alt={user?.full_name}
                  className="object-cover w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">{user?.full_name}</h3>
                  <p className="text-sm text-gray-500">
                    {getOrdinalNumber(rank)}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="mr-2">{totalScore}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
