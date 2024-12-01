import { useEffect, useState } from "react";
import { useAxios } from "./useAxios";

export const useQuiz = (quizSetId) => {
  const { api } = useAxios();

  const [quizData, setQuizData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState({
    isError: false,
    statusCode: null,
    errorMessage: null,
  });

  useEffect(() => {
    let shouldIgnore = false;
    setIsLoading(true);

    const fetchQuizData = async () => {
      setFetchError({
        isError: false,
        statusCode: null,
        errorMessage: null,
      });

      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/api/admin/quizzes`
        );

        if (!shouldIgnore && response.status === 200) {
          const matchingQuiz = response?.data?.find(
            (quiz) => quiz.id === quizSetId
          );

          if (matchingQuiz) {
            setQuizData(matchingQuiz);
          } else {
            setFetchError({
              isError: true,
              statusCode: 404,
              errorMessage: "Quiz not found.",
            });
          }
        }
      } catch (err) {
        setFetchError({
          isError: true,
          statusCode: err?.response?.status,
          errorMessage: err?.response?.data?.message || err.message,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizData();

    return () => {
      shouldIgnore = true;
    };
  }, [api, quizSetId]);

  return { quizData, isLoading, fetchError, setQuizData };
};
