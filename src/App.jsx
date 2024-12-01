import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashBoard from "./admin/adminDashboard/AdminDashBoard";
import AddQuiz from "./admin/adminQuizEntry/AddQuiz";
import AdminQuizSetPage from "./admin/AdminQuizSetPage";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import LeaderboardPage from "./quize/LeaderboardPage";
import QuizPage from "./quize/quizBoard/QuizPage";
import QuizRsult from "./quize/quizResult/QuizRsult";
import AdminRoute from "./route/AdminRoute";
import UserRoute from "./route/UserRoute";
export default function App() {
  return (
    <>
      <Routes>
        <Route element={<UserRoute />}>
          <Route element={<QuizPage />} path="/quiz/:quizSetId" />
          <Route element={<LeaderboardPage />} path="/leaderboard/:quizSetId" />
          <Route
            element={<QuizRsult />}
            path="/quiz/:quizSetId/result/:userId"
          />
        </Route>

        <Route element={<Index />} path="/" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<RegistrationPage />} path="/register" />

        <Route path="/admin" element={<AdminRoute />}>
          <Route element={<AdminDashBoard />} path="dashboard" />
          <Route element={<AdminQuizSetPage />} path="quizPage" />
          <Route element={<AdminQuizSetPage />} path=":quizSetId/edit" />
          <Route element={<AddQuiz />} path="quizPage/:quizSetId/entry" />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}
