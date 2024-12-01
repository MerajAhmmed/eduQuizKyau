import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../component/common/Header";
import useAuth from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";
import Quiz from "../Quiz";
import QuizScoreBoard from "./QuizScoreBoard";
import QuizScoreBoardProfile from "./QuizScoreBoardProfile";

export default function QuizPage() {
  const { quizSetId, userId } = useParams();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { api } = useAxios();
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizResult, setQuizResult] = useState(null);

  useEffect(() => {
    let ignore = false;
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/api/quizzes/${quizSetId}`
        );

        if (response.status === 200) {
          if (!ignore) {
            setQuizData(response.data.data);
          }
          setError(null);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();

    return () => {
      ignore = true;
    };
  }, [api, quizSetId]);

  function handleNextQuiz() {
    setSelectedQuiz((prev) => prev + 1);
  }

  function handlePrevQuiz() {
    setSelectedQuiz((prev) => prev - 1);
  }

  function handleAnswer(questionId, value) {
    const isAnswer = answers.find((answer) => answer.id === questionId);
    if (isAnswer) {
      if (isAnswer.answer === value) {
        const removeAnsewer = answers.filter(
          (answer) => answer.id !== questionId
        );
        setAnswers(removeAnsewer);
      } else {
        const newAnswer = answers.map((answer) => {
          return answer.id === questionId
            ? {
                ...answer,
                answer: value,
              }
            : answer;
        });
        setAnswers(newAnswer);
      }
    } else {
      setAnswers([
        ...answers,
        {
          id: questionId,
          answer: value,
        },
      ]);
    }
  }

  const submittedAnswer = () => {
    const fromatedAnswer = {};
    answers.forEach((answer) => (fromatedAnswer[answer.id] = answer.answer));

    return fromatedAnswer;
  };

  const handleSubmit = async () => {
    try {
      const res = await api.post(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/api/quizzes/${quizSetId}/attempt`,
        {
          answers: submittedAnswer(),
        }
      );
      toast.success("submit successfully");
      navigate(`/quiz/${quizSetId}/result/${auth?.user?.id}`);
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="bg-[#F5F3FF] min-h-screen">
      <div className="container mx-auto py-3">
        <Header />
        <main className="max-w-8xl mx-auto h-[calc(100vh-10rem)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full">
            <div className="lg:col-span-1 bg-white rounded-md p-6 h-full flex flex-col">
              <QuizScoreBoard quizData={quizData} selectedQuiz={selectedQuiz} />
              <QuizScoreBoardProfile />
            </div>

            <div className="lg:col-span-2 bg-white">
              <Quiz
                selectedQuiz={selectedQuiz}
                quiz={quizData?.questions?.[selectedQuiz]}
                questionLength={quizData?.questions?.length}
                handleNextQuiz={handleNextQuiz}
                handleSubmit={handleSubmit}
                handlePrevQuiz={handlePrevQuiz}
                handleAnswer={handleAnswer}
                answers={answers}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
