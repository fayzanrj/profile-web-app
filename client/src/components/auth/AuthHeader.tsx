/**
 * AuthHeader Component:
 * - Renders a header for Auth Forms (SIGNUP OR LOGIN).
 *
 * Props:
 * - variant: Indicates that which form, header is part of (LOGIN or SIGNUP).
 */

import { Link } from "react-router-dom";

// Props
interface AuthHeaderProps {
  variant: "LOGIN" | "SIGNUP";
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ variant }) => {
  // Defining variables for title and link text based on the variant prop
  let title: string;
  let linkText: string;
  let linkTo: string;
  let message: string;

  // Assigning values based on the variant prop
  if (variant === "LOGIN") {
    title = "LOGIN";
    linkText = "Sign Up";
    linkTo = "/signup";
    message = "Don't have an account? ";
  } else {
    title = "SIGNUP";
    linkText = "Log in";
    linkTo = "/login";
    message = "Already have an account? ";
  }

  return (
    <div className="w-full px-2 max-w-96">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="my-2 text-sm">
        {message}
        {/* Link to sign up or log in page */}
        <Link to={linkTo} className="font-semibold">
          {linkText}
        </Link>
      </p>
    </div>
  );
};

export default AuthHeader;
