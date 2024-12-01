import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAxios } from "../../hooks/useAxios";
import QuizCard from "./QuizCard";

export default function QuizResultCorrectAnsShow({
  correctAnswers,
  submittedAnswers,
}) {
  const { quizSetId } = useParams();
  const { api } = useAxios();
  const [error, setError] = useState(null);
  const [quizzes, setQuizzes] = useState();

  useEffect(() => {
    let ignore = false;
    const fetchResult = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/api/quizzes/${quizSetId}`
        );

        if (response.status === 200) {
          if (!ignore) {
            setQuizzes(response.data.data);
          }
          setError(null);
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

  return (
    <div className="max-h-screen md:w-1/2 flex items-center justify-center h-full p-8">
      <div className="h-[calc(100vh-50px)] overflow-y-scroll ">
        <div className="px-4">
          {quizzes?.questions?.map((quiz, count) => {
            const submission = submittedAnswers?.find(
              (answer) => answer.question_id === quiz.id
            );

            return (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                count={count}
                submission={submission}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
