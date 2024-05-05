/**
 * GoogleLogIn Component:
 * - Renders a button for Log in / Sign up the user with their google account.
 * - Navigates users to the user page after successful login/signup.
 *
 * Props:
 * - variant: Indicates the form, button is part of (LOGIN or SIGNUP).
 */

import { FcGoogle } from "react-icons/fc";
import Splitter from "./Splitter";
import { auth, googleProvider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Props
interface GoogleLogInProps {
  variant: "LOGIN" | "SIGNUP";
}

const GoogleLogIn: React.FC<GoogleLogInProps> = ({ variant }) => {
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();

  // Function to handle Google sign-in
  const logInWithGoogle = async () => {
    try {
      setIsLoading(false);
      const res = await signInWithPopup(auth, googleProvider);
      const token = await res.user.getIdToken();

      // Saving user ID and token in local storage to keep user logged in
      localStorage.setItem("profile_uid", res.user.uid);
      localStorage.setItem("profile_accessToken", token);

      // Displaying success toast and navigating to user page
      toast.success("Logged in successfully!");
      nav("/user");
    } catch (error) {
      console.error("Google sign-in error:", error);
      // toast.error("Failed to sign in with Google. Please try again later.");
    }
  };

  return (
    <div className="w-full p-2 max-w-96">
      <Splitter />
      {/* Google sign-in button */}
      <button
        className="flex items-center justify-center w-full gap-2 py-3 my-6 border border-gray-200 rounded-md shadow-lg drop-shadow-md disabled:opacity-50"
        onClick={logInWithGoogle}
        disabled={isLoading}
      >
        <FcGoogle size={"1.6rem"} />
        <p className="font-semibold">
          {/* Changing button text based on variant */}
          {variant === "LOGIN" ? "LOG IN" : "SIGN UP"} WITH GOOGLE
        </p>
      </button>
    </div>
  );
};

export default GoogleLogIn;
