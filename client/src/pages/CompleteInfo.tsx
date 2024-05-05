import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfoForm from "../components/infoForm/InfoForm";
import ScreenLoader from "../components/shared/ScreenLoader";
import GetTokenId from "../libs/GetTokenId";
import axios, { AxiosError } from "axios";

const CompleteInfo = () => {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Checking if user is logged in and fetching user data if available
  useLayoutEffect(() => {
    const isLoggedIn = GetTokenId();

    if (!isLoggedIn || !isLoggedIn.accessToken || !isLoggedIn.uid) {
      // Redirecting to login page if user is not logged in
      nav("/login");
      nav(0);
      return;
    }

    // Function to fetch user data
    const getUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_HOST}/api/v1/user/getUser/${
            isLoggedIn.uid
          }`
        );

        // Redirecting to user profile page if user data is available
        if (res) nav("/user");
      } catch (error) {
        // Handling errors
        if (error instanceof AxiosError) {
          // Redirecting to login page if user data is not found and there's no accessToken and userId in local storage
          if (error?.response?.status !== 404) {
            localStorage.removeItem("profile_accessToken");
            localStorage.removeItem("profile_uid");
            nav("/login");
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Calling getUser function
    getUser();
  }, []);

  // Displaying loading screen while fetching user data
  if (isLoading) {
    return <ScreenLoader />;
  }

  // Displaying complete information form once user data fetching is complete
  return (
    <main className="flex flex-col items-center justify-center min-h-svh">
      <InfoForm variant="COMPLETE_PROFILE" />
    </main>
  );
};

export default CompleteInfo;
