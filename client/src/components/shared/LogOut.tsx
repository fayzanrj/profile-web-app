/**
 * LogOut Component:
 * - Renders a log out button to log users out
 * -
 */

import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const nav = useNavigate();

  // Function to log out the user
  const logOut = () => {
    nav("/login");

    localStorage.removeItem("profile_accessToken");
    localStorage.removeItem("profile_uid");
  };

  return (
    <button className="my-2 text-sm" onClick={logOut}>
      Log out
    </button>
  );
};

export default LogOut;
