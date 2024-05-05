/**
 * LogInForm Component:
 * - Renders a form for users to log in.
 * - Handles form submission.
 * - Uses react-hook-form for form state management and validation.
 * - Displays loading screen while form submission is in progress.
 * - Navigates users to the user page after successful login.
 */

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import COLORS from "../../constants/Colors";
import {
  LogInInputType,
  logInFormSchema,
} from "../../utilities/formSchema/LogInFormSchema";
import InputField from "../shared/InputField";

import { auth } from "../../config/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import Loader from "../shared/Loader";

const LogInForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const nav = useNavigate();

  // useForm hook to handle form state and validation
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LogInInputType>({
    resolver: zodResolver(logInFormSchema),
  });

  // Function to set error and display toast message
  const setErrorAndToast = (field: "password" | "email", message: string) => {
    toast.error(message);
    setError(
      field,
      {
        type: "validate",
        message: message,
      },
      { shouldFocus: true }
    );
  };

  // Form submission handler
  const processForm: SubmitHandler<LogInInputType> = async (data) => {
    try {
      setIsLoading(true);
      const { email, password } = data;

      // Checking if password is at least 6 characters long
      if (password.length < 6) {
        setErrorAndToast("password", "Credentials do not match");
        return;
      }

      // Signing in user with email and password
      const res = await signInWithEmailAndPassword(auth, email, password);
      const token = await res.user.getIdToken();

      // Saving user ID and token in local storage to keep user logged in
      localStorage.setItem("profile_uid", res.user.uid);
      localStorage.setItem("profile_accessToken", token);
      toast.success("Logged in successfully!");
      nav("/user");
    } catch (error) {
      // Handling errors
      if (error instanceof FirebaseError && error.message) {
        switch (error.code) {
          case "auth/invalid-email":
            setErrorAndToast("email", "Invalid email address");
            break;
          case "auth/user-disabled":
            setErrorAndToast("email", "This account has been disabled");
            break;
          case "auth/invalid-credential":
          case "auth/user-not-found":
          case "auth/wrong-password":
            toast.error("Credentials do not match");
            break;
          default:
            toast.error("An error occurred. Please try again later.");
            console.error("Error:", error);
        }
      } else {
        console.error("Error:", error);
        toast.error("Some error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Rendering the form
  return (
    <form
      className="w-full px-2 py-4 max-w-96"
      onSubmit={handleSubmit(processForm)} // Handling form submission
    >
      {/* Input field for email */}
      <InputField
        id="email"
        label="Email"
        placeholder="e.g. admin"
        type="email"
        errors={errors}
        register={register}
        isDisabled={isLoading}
      />

      {/* Input field for password */}
      <InputField
        id="password"
        label="Password"
        placeholder="e.g. ******"
        type="password"
        errors={errors}
        register={register}
        isDisabled={isLoading}
      />

      {/* Submit button */}
      {isLoading ? (
        <div className="relative w-full my-4 text-center min-h-[3.25rem]">
          <Loader />
        </div>
      ) : (
        <button
          className="relative w-full h-10 my-4 text-lg text-white rounded-md"
          style={{ backgroundColor: COLORS.BG_PRIMARY }}
          type="submit"
          disabled={isLoading}
        >
          LOG IN
        </button>
      )}
    </form>
  );
};

export default LogInForm;
