import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Field from "../../component/common/Field";
import { useAxios } from "../../hooks/useAxios";

export default function QuizForm({
  addQuiz,
  quizSetId,
  editQuestion,
  updateQuiz,
}) {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  const { api } = useAxios();
  const submitForm = async (formData) => {
    const newQuiz = {
      question: formData?.quizTitle,
      options: [
        formData?.options?.[0]?.text,
        formData?.options?.[1]?.text,
        formData?.options?.[2]?.text,
        formData?.options?.[3]?.text,
      ],
      correctAnswer: formData?.options?.[selectedOptionIndex]?.text,
    };

    if (editQuestion.status === true) {
      try {
        if (!editQuestion?.id) {
          setError("");
        }
        const response = await api.patch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/api/admin/questions/${
            editQuestion?.id
          }`,
          newQuiz
        );
        const quizData = response?.data?.data;
        updateQuiz(quizData);
        setSelectedOptionIndex(null);
        reset({
          quizTitle: null,
          options: null,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        if (!quizSetId) {
          return;
        }
        const response = await api.post(
          `${
            import.meta.env.VITE_SERVER_BASE_URL
          }/api/admin/quizzes/${quizSetId}/questions`,
          newQuiz
        );
        const quizData = response?.data?.data;
        addQuiz(quizData);
        reset();
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (editQuestion?.status) {
      reset({
        ...editQuestion?.question,
      });
      setSelectedOptionIndex(editQuestion?.correctAnswer);
    }
  }, [editQuestion, reset, setSelectedOptionIndex]);
  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">Create Quiz</h2>

        <Field>
          <div>
            <label
              htmlFor="quizTitle"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Question Title
            </label>
            <input
              {...register("quizTitle", {
                required: "Question title is required",
                validate: (value) =>
                  value.trim() !== "" || "Question cannot be whitespace",
              })}
              type="text"
              id="quizTitle"
              className="w-full mt-2 p-2 border border-input rounded-md bg-background text-foreground"
              placeholder="Enter quiz title"
            />
            {errors.quizTitle && (
              <p className="text-red-500 text-sm mt-1">
                {errors.quizTitle.message}
              </p>
            )}
          </div>
        </Field>

        <p className="text-sm text-gray-600 mt-4">Add Options</p>

        <div id="optionsContainer" className="space-y-2 mt-4">
          {Array(4)
            .fill(" ")
            .map((_, index) => (
              <Field key={index}>
                <div className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white">
                  <input
                    type="checkbox"
                    id={`option${index}`}
                    checked={index === selectedOptionIndex}
                    onChange={() => setSelectedOptionIndex(index)}
                    className="text-primary focus:ring-0 w-4 h-4"
                  />
                  <label htmlFor={`option${index}`} className="sr-only">
                    Option {index + 1}
                  </label>
                  <input
                    {...register(`options[${index}].text`, {
                      required: "option is required",
                    })}
                    type="text"
                    id={`optionText${index}`}
                    className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                    placeholder={`Option ${index + 1}`}
                  />
                </div>
              </Field>
            ))}
        </div>

        <div className="flex flex-col gap-2 md:flex-row">
          {editQuestion.status === true ? (
            <button
              type="submit"
              className="w-full p-2 rounded-md transition-colors  bg-primary text-white hover:bg-primary/90"
            >
              Update Quiz
            </button>
          ) : (
            <button
              type="submit"
              className="w-full p-2 rounded-md transition-colors  bg-primary text-white hover:bg-primary/90"
            >
              Save Quiz
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
