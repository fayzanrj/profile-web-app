/**
 * SignUpForm Component:
 * - Renders a form for users to sign up.
 * - Handles form submission.
 * - Uses react-hook-form for form state management and validation.
 * - Displays loading screen while form submission is in progress.
 * - Navigates users to the user page after successful sign up.
 */

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import COLORS from "../../constants/Colors";
import {
  SignUpFormSchema,
  SignUpInputType,
} from "../../utilities/formSchema/SignUpFormSchema";
import InputField from "../shared/InputField";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import toast from "react-hot-toast";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import Loader from "../shared/Loader";

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const nav = useNavigate();

  // useForm hook to handle form state and validation
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpInputType>({
    resolver: zodResolver(SignUpFormSchema),
  });

  // Function to set error and display toast message
  const setErrorAndToast = (
    field: "password" | "email" | "confirmPassword",
    message: string
  ) => {
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
  const processForm: SubmitHandler<SignUpInputType> = async (data) => {
    try {
      setIsLoading(true);
      const { confirmPassword, email, password } = data;

      // Validating password length
      if (password.length < 6) {
        setErrorAndToast("password", "Password must be at least 6 characters");
        return;
      }

      // Validating password match
      if (password !== confirmPassword) {
        setErrorAndToast("confirmPassword", "Passwords do not match");
        return;
      }

      // Creating user with email and password
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const token = await res.user.getIdToken();

      // Saving user ID an token in local storage to keep user logged in
      localStorage.setItem("profile_uid", res.user.uid);
      localStorage.setItem("profile_accessToken", token);
      toast.success("Account created successfully!");
      nav("/completeProfile");
    } catch (error) {
      // Handling error
      if (error instanceof FirebaseError && error.message) {
        switch (error.code) {
          case "auth/weak-password":
            setErrorAndToast("password", "Password too weak");
            break;
          case "auth/email-already-in-use":
            setErrorAndToast("email", "Email already in use");
            break;
          default:
            toast.error("Some error occurred");
        }
      } else {
        console.error("Error:", error);
        toast.error("Some error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="w-full px-2 py-4 max-w-96"
      onSubmit={handleSubmit(processForm)}
    >
      {/* Email Input Field */}
      <InputField
        id="email"
        label="Email"
        placeholder="e.g. admin"
        type="email"
        errors={errors}
        register={register}
        isDisabled={isLoading}
      />

      {/* Password Input Field*/}
      <InputField
        id="password"
        label="Password"
        placeholder="e.g. ******"
        type="password"
        errors={errors}
        register={register}
        isDisabled={isLoading}
      />

      {/* Confirm Password Input field */}
      <InputField
        id="confirmPassword"
        label="Confirm Password"
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
          className="relative w-full h-10 my-4 text-lg text-white rounded-md disabled:opacity-50"
          style={{ backgroundColor: COLORS.BG_PRIMARY }}
          type="submit"
          disabled={isLoading}
        >
          SIGN UP
        </button>
      )}
    </form>
  );
};

export default SignUpForm;
