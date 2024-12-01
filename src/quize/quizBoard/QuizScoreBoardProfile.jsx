import avater from "../../assets/avater.webp";
import useAuth from "../../hooks/useAuth";

export default function QuizScoreBoardProfile() {
  const { auth } = useAuth();

  return (
    <div className="mt-auto flex items-center">
      <img
        src={avater}
        alt="Mr Hasan"
        className="w-10 h-10 rounded-full mr-3 object-cover"
      />
      <span className="text-black font-semibold">{auth?.user?.full_name}</span>
    </div>
  );
}
