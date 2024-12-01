import { useEffect, useState } from "react";
import { useAxios } from "./useAxios";

export const useQuizzes = () => {
  const { api } = useAxios();

  const [quizList, setQuizList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState({
    isError: false,
    statusCode: null,
    errorMessage: null,
  });

  useEffect(() => {
    let shouldIgnore = false;
    setIsLoading(true);

    const fetchAdminQuizzes = async () => {
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
          setQuizList(response.data);
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

    fetchAdminQuizzes();

    return () => {
      shouldIgnore = true;
    };
  }, [api]);

  return { quizList, isLoading, fetchError };
};
