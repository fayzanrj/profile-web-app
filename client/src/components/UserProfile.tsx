/**
 * UserProfile Component:
 * - Renders a div with user's information
 * - Renders two buttons to delete and edit the user's data
 */

import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { handleApiError } from "../libs/HandleApiError";

// Props
interface ProfileProps {
  user: UserProps | null;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserProfile: React.FC<ProfileProps> = ({ user, setIsLoading }) => {
  const nav = useNavigate();

  // Function to handle profile deletion
  const deleteProfile = async () => {
    setIsLoading(true);
    const accessToken = localStorage.getItem("profile_accessToken") || "";
    if (!user) throw new Error();
    try {
      // API CALL
      await axios.delete(
        `${import.meta.env.VITE_SERVER_HOST}/api/v1/user/deleteUser/${
          user.uid
        }`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // loging out user
      localStorage.removeItem("profile_accessToken");
      localStorage.removeItem("profile_uid");
      toast.success("Profile deleted successfully");
      nav("/login");
    } catch (error) {
      console.error("Error deleting profile:", error);
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (user === null) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-xl font-semibold">OOPS NO USER FOUND!</p>
      </div>
    );
  }

  return (
    <section className="px-2 py-4 bg-gray-100 shadow-md">
      <div className="flex flex-wrap items-center justify-center gap-5 overflow-hidden text-ellipsis">
        <div className="text-center min-w-64">
          <div className="relative">
            <img
              src={user?.coverPic}
              alt="coverPic"
              className="object-cover w-64 mx-auto border border-gray-300 h-36"
            />
            <img
              src={user?.profilePic}
              width={60}
              height={60}
              alt="profilepic"
              className="object-cover mx-auto my-4 border border-gray-300 rounded-full aspect-square"
            />
          </div>
          <h2 className="mt-2 text-2xl font-semibold">{user.name}</h2>
          <h2 className="mt-1 text-xl">@{user.username}</h2>
        </div>

        <table className="max-w-[50%]">
          <tbody>
            <tr>
              <td className="px-2 py-1">Username</td>
              <td className="px-2 py-1">{user.username}</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Email</td>
              <td className="px-2 py-1">{user.email}</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Phone no</td>
              <td className="px-2 py-1">{user.phoneNumber}</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Profession</td>
              <td className="px-2 py-1">{user.profession}</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Education level</td>
              <td className="px-2 py-1">{user.educationLevel}</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Gender</td>
              <td className="px-2 py-1">{user.gender}</td>
            </tr>
            <tr className="align-top">
              <td className="px-2 py-1">Bio</td>
              <td className="px-2 py-1">{user.bio}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="my-10 text-center">
        <Link to="/user/editProfile">
          <button className="mx-2 py-1.5 w-28 bg-stone-600 text-white rounded-md px-1">
            Edit Profile
          </button>
        </Link>
        <button
          className="mx-2 py-1.5 w-28 bg-red-500 rounded-md px-1 text-white"
          onClick={deleteProfile}
        >
          Delete Profile
        </button>
      </div>
    </section>
  );
};

export default UserProfile;
