import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaGoogle } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function OAuth() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // 🔥 ADD

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await axios.post(
        "/api/auth/google",
        {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        },
        { withCredentials: true },
      );

      // 🔥 THIS FIXES PROFILE + IMAGE
      login(res.data.user);

      navigate("/");
    } catch (error) {
      console.log("could not sign in with google", error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="
        w-full bg-white text-black py-3 rounded-lg flex border
        items-center justify-center gap-3 mb-6
        cursor-pointer
        transition-all duration-300
        hover:shadow-xl hover:-translate-y-1
        active:scale-95
      "
    >
      <FaGoogle className="text-red-500 text-lg" />
      Continue with Google
    </button>
  );
}
