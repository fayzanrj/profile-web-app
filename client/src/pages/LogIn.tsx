import { useEffect } from "react";
import AuthHeader from "../components/auth/AuthHeader";
import GoogleLogIn from "../components/auth/GoogleLogIn";
import LogInForm from "../components/auth/LogInForm";
import GridSplitView from "../components/shared/GridSplitView.";
import { useNavigate } from "react-router-dom";
import GetTokenId from "../libs/GetTokenId";

const Login = () => {
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
      <AuthHeader variant="LOGIN" />
      <LogInForm />
      <GoogleLogIn variant="LOGIN" />
    </GridSplitView>
  );
};

export default Login;
