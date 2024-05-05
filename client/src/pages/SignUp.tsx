import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../components/auth/AuthHeader";
import GoogleLogIn from "../components/auth/GoogleLogIn";
import SignUpForm from "../components/auth/SignUpForm";
import GridSplitView from "../components/shared/GridSplitView.";
import GetTokenId from "../libs/GetTokenId";

const SignUp = () => {
  const nav = useNavigate();

  // Checking if user is already logged in
  useEffect(() => {
    const isLoggedIn = GetTokenId();

    //If user is logged in pushing him to dashboard
    if (isLoggedIn && isLoggedIn.accessToken && isLoggedIn.uid) {
      nav("/user");
      return;
    }
  }, []);

  return (
    <GridSplitView>
      <AuthHeader variant="SIGNUP" />
      <SignUpForm />
      <GoogleLogIn variant="SIGNUP" />
    </GridSplitView>
  );
};

export default SignUp;
