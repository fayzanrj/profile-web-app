import axios from "axios";
import { useLayoutEffect, useState } from "react";
import { FaFemale, FaMale, FaPhone } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import ScreenLoader from "../components/shared/ScreenLoader";

const Profile = () => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams() as { username: string };

  useLayoutEffect(() => {
    // Function to fetch user data
    const getUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_HOST}/api/v1/user/getUserByUsername/${
            params.username
          }`
        );

        // Setting user data if fetched successfully
        if (res) setUser(res.data.user);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getUser();
  }, []);

  // Rendering loading screen if data is being fetched
  if (isLoading) {
    return <ScreenLoader />;
  }

  // Rendering message if no user found
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-svh">
        <p className="text-xl font-semibold">OOPS NO USER FOUND!</p>
      </div>
    );
  }

  return (
    <main>
      {/* Buttons for editing profile and accessing QR code */}
      {user.uid === localStorage.getItem("profile_uid") && (
        <div className="p-10 text-right">
          <Link to="/user/editProfile">
            <button className="mx-2 py-1.5 w-28 bg-stone-600 text-white rounded-md px-1">
              Edit Profile
            </button>
          </Link>
          <Link to="/user">
            <button className="mx-2 py-1.5 w-28 font-semibold px-1">
              Get QR Code
            </button>
          </Link>
        </div>
      )}

      {/* Profile details */}
      <div className="flex flex-wrap justify-center p-10 gap-x-20">
        {/* User profile section */}
        <div className="relative min-w-64">
          <img
            src={user.coverPic}
            alt="coverPic"
            className="object-cover h-40 mx-auto border border-gray-300 w-72 aspect-square drop-shadow-2xl opacity-85"
          />
          <img
            src={user.profilePic}
            width={70}
            height={70}
            alt="profilepic"
            className="absolute object-cover mx-auto transform -translate-x-1/2 -translate-y-1/2 bg-gray-300 border border-gray-300 rounded-full shadow-xl drop-shadow-xl aspect-square top-1/2 left-1/2"
          />
          <h2 className="mt-12 mb-4 text-2xl font-semibold text-center">
            {user.name}
          </h2>
          <div>
            <p>
              <IoMail className="inline-block" size={"1.2rem"} />
              <span className="inline-block mx-2">{user.email}</span>
            </p>
            <p className="text-left">
              <FaPhone className="inline-block" size={"1rem"} />
              <span className="inline-block mx-3">{user.phoneNumber}</span>
            </p>
            <p className="text-left">
              {user.gender === "Male" ? (
                <FaMale className="inline-block" size={"1rem"} />
              ) : (
                <FaFemale className="inline-block" size={"1rem"} />
              )}{" "}
              <span className="inline-block mx-3">{user.gender}</span>
            </p>
          </div>
        </div>

        {/* Additional user details */}
        <div className="max-w-[36rem]">
          <p className="my-4 text-2xl font-semibold">{user.profession}</p>
          <p className="my-4 text-lg font-semibold">{user.educationLevel}</p>
          <h2 className="text-lg">{user.bio}</h2>
        </div>
      </div>
    </main>
  );
};

export default Profile;
