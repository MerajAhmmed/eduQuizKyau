import { Link, useParams } from "react-router-dom";
import AdminUpdateQuizSetForm from "./adminQuizEntry/AdminUpdateQuizSetForm";
import CreateQuizForm from "./adminQuizEntry/CreateQuizForm";

export default function AdminQuizSetPage() {
  const { quizSetId } = useParams();
  return (
    <div className="bg-[#F5F3FF] min-h-screen flex">
      <main className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Link
              to="/admin/dashboard"
              className="inline-flex items-center text-sm text-gray-600 mb-6 hover:text-buzzr-purple"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
              Back to home
            </Link>

            <h2 className="text-3xl font-bold mb-6">
              Give your quiz title and description
            </h2>
            {quizSetId ? <AdminUpdateQuizSetForm /> : <CreateQuizForm />}
          </div>
        </div>
      </main>
    </div>
  );
}
