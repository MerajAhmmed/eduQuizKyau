import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAxios } from "../../hooks/useAxios";
import { useQuiz } from "../../hooks/useQuiz";
import NavigateQuize from "./NavigateQuize";
import QuizForm from "./QuizForm";
import ShowQuiz from "./ShowQuiz";

export default function AddQuiz() {
  const { api } = useAxios();
  const [editQuestion, setEditQuestion] = useState({
    status: false,
    id: null,
    question: null,
    correctAnswer: null,
  });
  const { quizSetId, questionId } = useParams();
  const { quizData, isLoading, fetchError, setQuizData } = useQuiz(quizSetId);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (quizData) {
      setQuestions([...quizData.Questions]);
    }
  }, [quizData]);

  const addQuiz = (quizData) => {
    setQuestions((prevQuizzes) => [...prevQuizzes, quizData]);
    toast.success("quiz add sucessfully");
  };

  const updateQuiz = (quizData) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.id === quizData.id ? quizData : question
      )
    );
    setEditQuestion({
      status: false,
      id: null,
      question: null,
      correctAnswer: null,
    });
    toast.success("quiz edit sucessfully");
  };

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/admin/questions/${id}`
      );

      const deleteQuestion = questions.filter((question) => question.id !== id);
      setQuestions(deleteQuestion);
      toast.success("delete successfully");
    } catch (error) {
      console.log(error);
    }
  };

  function handleEdit(question) {
    const formData = {
      quizTitle: question?.question,
      options: [
        {
          text: question?.options?.[0],
        },
        {
          text: question?.options?.[1],
        },
        {
          text: question?.options?.[2],
        },
        {
          text: question?.options?.[3],
        },
      ],
    };
    const correctAnswer = question?.options?.findIndex(
      (option) => option === question.correctAnswer
    );

    setEditQuestion({
      status: true,
      id: question?.id,
      question: formData,
      correctAnswer: correctAnswer,
    });
  }

  return (
    <div className="bg-[#F5F3FF] min-h-screen flex">
      <main className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8">
        <div>
          <NavigateQuize />

          <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-8 lg:gap-12">
            <div className="">
              <h2 className="text-3xl font-bold mb-4">{quizData?.title}</h2>
              <div className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-4">
                Total number of questions : {questions.length}
              </div>
              <p className="text-gray-600 mb-4">{quizData?.description}</p>

              <QuizForm
                addQuiz={addQuiz}
                quizSetId={quizSetId}
                editQuestion={editQuestion}
                updateQuiz={updateQuiz}
              />
            </div>

            <ShowQuiz
              questions={questions}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
