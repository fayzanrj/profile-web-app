import axios, { AxiosError } from "axios";
import { useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import QRCode from "../components/QRCode";
import UserProfile from "../components/UserProfile";
import ScreenLoader from "../components/shared/ScreenLoader";
import GetTokenId from "../libs/GetTokenId";
import LogOut from "../components/shared/LogOut";

const User = () => {
  const nav = useNavigate();
  const [user, setUser] = useState<UserProps | null>(null);
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
        // Setting user data if available
        if (res) setUser(res.data.user);
      } catch (error) {
        // Handling errors
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
        // Updating loading state once user data fetching is complete
        setIsLoading(false);
      }
    };

    // Calling getUser function
    getUser();
  }, []);

  // Rendering loading screen if data is being fetched
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

  return (
    // Displaying user profile and QR code components once user data fetching is complete
    <main className="w-full p-2 min-svh md:px-20 md:py-10 ">
      {/* Displaying greetings */}
      <div className="flex flex-wrap items-center justify-between">
        <h1 className="text-2xl font-semibold">Welcome {user?.name}</h1>
        <LogOut />
      </div>

      <div className="grid grid-cols-1 my-10 sm:grid-cols-2">
        {/* Displaying user profile options */}
        <UserProfile user={user} setIsLoading={setIsLoading} />

        {/* Displaying QR code */}
        <QRCode username={user?.username || ""} />
      </div>
    </main>
  );
};

export default User;
