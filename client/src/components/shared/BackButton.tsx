/**
 * BackButton Component:
 * - Renders a button to log out the user
 * -
 */

import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const nav = useNavigate();

  const goBack = () => nav("/user");
  return (
    <button onClick={goBack} className="my-">
      <p className="text-sm">&#x276E; Go back</p>
    </button>
  );
};

export default BackButton;
