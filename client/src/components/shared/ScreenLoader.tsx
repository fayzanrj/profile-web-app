/**
 * ScreenLoader Component:
 * - Renders a spining loader that covers the whole screen with white background and spinning loader component in center.
 */

import { useEffect } from "react";
import Loader from "./Loader";

const ScreenLoader = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-svh">
      <Loader />
    </div>
  );
};

export default ScreenLoader;
