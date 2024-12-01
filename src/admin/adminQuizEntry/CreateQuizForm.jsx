import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAxios } from "../../hooks/useAxios";

export default function CreateQuizForm() {
  const { api } = useAxios();

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const submitForm = async (formData) => {
    const quizData = {
      title: formData["quiz-title"],
      description: formData["quiz-description"],
    };
    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/admin/quizzes/`,
        quizData
      );
      toast.success("Quiz Created Sucessfully");
      navigate("/admin/dashboard");
    } catch (err) {
      setError("submit", { message: "Failed to submit quiz." });
    }
  };
  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="mb-4">
        <label
          htmlFor="quiz-title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Quiz title
        </label>
        <input
          {...register("quiz-title", {
            required: "quiz title is required",
            validate: (value) =>
              value.trim() !== "" || "quiz title cannot be whitespace",
          })}
          type="text"
          id="quiz-title"
          name="quiz-title"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
          placeholder="Quiz"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="quiz-description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description (Optional)
        </label>
        <textarea
          {...register("quiz-description", {
            required: "quiz description is required",
            validate: (value) =>
              value.trim() !== "" || "quiz description cannot be whitespace",
          })}
          id="quiz-description"
          name="quiz-description"
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
          placeholder="Description"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full block text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Next
      </button>
    </form>
  );
}
