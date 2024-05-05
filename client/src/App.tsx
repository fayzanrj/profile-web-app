import { Toaster } from "react-hot-toast";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import User from "./pages/User";
import CompleteInfo from "./pages/CompleteInfo";
import EditProfile from "./pages/EditProfile";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/login", element: <LogIn /> },
    { path: "/profile/:username", element: <Profile /> },
    { path: "/user", element: <User /> },
    { path: "/user/editProfile", element: <EditProfile /> },
    { path: "/completeProfile", element: <CompleteInfo /> },
  ]);

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
