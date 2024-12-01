import UserProfile from "../component/auth/UserProfile";
import Footer from "../component/common/Footer";
import Header from "../component/common/Header";
import useAuth from "../hooks/useAuth";
import Quiz from "./QuizCards";

export default function Index() {
  const { auth } = useAuth();

  return (
    <div className="container mx-auto py-3">
      <Header />
      {auth?.tokens?.accessToken && <UserProfile />}
      <Quiz />
      <Footer />
    </div>
  );
}
