import axios, { AxiosError } from "axios";
import { useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InfoForm from "../components/infoForm/InfoForm";
import ScreenLoader from "../components/shared/ScreenLoader";
import GetTokenId from "../libs/GetTokenId";
import BackButton from "../components/shared/BackButton";
import LogOut from "../components/shared/LogOut";

const EditProfile = () => {
  const nav = useNavigate();
  const [user, setUser] = useState<UserProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Checking if user is logged in and fetch user data if available
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
        if (res) setUser(res.data.user);
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          // Redirecting to appropriate pages based on error and authentication status
          if (isLoggedIn.accessToken && isLoggedIn.uid) {
            if (error?.response?.status === 404) nav("/completeProfile");
          } else {
            localStorage.removeItem("profile_accessToken");
            localStorage.removeItem("profile_uid");
            nav("/login");
          }
        }
      } finally {
        setIsLoading(false);
      }
    };
    getUser();
  }, []);

  // Displaying loading screen while fetching user data
  if (isLoading) {
    return <ScreenLoader />;
  }

  if (!user) {
    const handleClick = () => {
      localStorage.removeItem("profile_accessToken");
      localStorage.removeItem("profile_uid");
    };
    return (
      <main className="flex flex-col items-center justify-center h-svh">
        <p className="text-xl font-bold">OOPS SOME OCCUR OCCURED</p>
        <Link to="/login" className="my-2 font-semibold" onClick={handleClick}>
          Go back to LOG IN
        </Link>
      </main>
    );
  }

  // Displaying inform with all userdata for user to update
  return (
    <main className="flex flex-col items-center justify-center min-h-svh">
      <div className="flex items-center justify-between w-full p-2 md:px-20">
        {/* Go back button */}
        <BackButton />
        {/* Log out button */}
        <LogOut />
      </div>
      <InfoForm variant="UPDATE_PROFILE" {...user} />
    </main>
  );
};

export default EditProfile;
