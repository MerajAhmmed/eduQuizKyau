import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAxios } from "../../hooks/useAxios";
import { useQuiz } from "../../hooks/useQuiz";

export default function AdminUpdateQuizSetForm() {
  const navigate = useNavigate();
  const { api } = useAxios();
  const { quizSetId } = useParams();
  const { quizData, setQuizData } = useQuiz(quizSetId);
  const [loading, setLoading] = useState(false);
  const [UnpublishLoading, setUnpublishLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (quizData) {
      reset({
        title: quizData?.title,
        description: quizData?.description,
        status: quizData.status === "draft" ? false : true,
      });
    }
  }, [quizData, reset]);

  const handleDelete = async () => {
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/admin/quizzes/${quizSetId}`
      );
      if (response.status === 200) {
        toast.success("Quiz Set Deleted Sucessfully");
        navigate("/admin/dashboard");
      }
    } catch (error) {
      setError("submit", { message: "Failed to delete quiz." });
    }
  };

  const publisQuiz = async () => {
    setLoading(true);
    try {
      const response = await api.patch(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/api/admin/quizzes/${quizSetId}`,
        { status: "published" }
      );
      toast.success("quiz Publish successfully");
    } catch (error) {
      setError("submit", { message: "Failed to publish quiz." });
    }
    setLoading(false);
  };

  const unpublishQuiz = async () => {
    setUnpublishLoading(true);
    try {
      const response = await api.patch(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/api/admin/quizzes/${quizSetId}`,
        { status: "draft" }
      );
      toast.success("Quiz Unpublished Successfully");
    } catch (error) {
      setError("submit", { message: "Failed to unpublish quiz." });
    }
    setUnpublishLoading(false);
  };

  const submitForm = async (quizData) => {
    const Data = {
      title: quizData.title,
      description: quizData.description,
    };
    try {
      const response = await api.patch(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/api/admin/quizzes/${quizSetId}`,
        Data
      );
      if (response.status === 200) {
        setQuizData({ ...quizData, ...Data });
        return true;
      }
    } catch (err) {
      setError("submit", { message: "Failed to update quiz." });
    }
    return false;
  };

  const handleNextClick = async () => {
    const isUpdated = await handleSubmit(submitForm)(); 
    if (isUpdated) {
      navigate(`/admin/quizPage/${quizSetId}/entry`);
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
          {...register("title")}
          type="text"
          id="title"
          name="title"
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
          {...register("description")}
          id="description"
          name="description"
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
          placeholder="Description"
        ></textarea>
      </div>
      {errors["quiz-title"] && (
        <p className="text-red-500 text-sm">{errors["quiz-title"].message}</p>
      )}

      <div className="mx-2 my-6 flex gap-2">
        <button
          type="button"
          className="w-full block text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          onClick={publisQuiz}
        >
          {loading && <FaSpinner className="animate-spin" />}
          Make Quiz Public
        </button>

        <button
          type="button"
          className="w-full block text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          onClick={unpublishQuiz}
        >
          {UnpublishLoading && <FaSpinner className="animate-spin" />}
          Unpublish Quiz
        </button>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          className="w-full block text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          onClick={handleDelete}
        >
          Delete
        </button>
        <Link
          to={`/admin/quizPage/${quizSetId}/entry`}
          type="submit"
          className="w-full block text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          onClick={handleNextClick}
        >
          Next
        </Link>
      </div>
    </form>
  );
}
