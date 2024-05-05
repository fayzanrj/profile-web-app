import { Link } from "react-router-dom";
import GridSplitView from "../components/shared/GridSplitView.";
import logo from "../assets/logo.png";
import COLORS from "../constants/Colors";

const Home = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 z-50 flex items-center justify-between w-full px-2 py-5 md:px-10">
        <img src={logo} alt="logo" className="w-20 md:w-28" />
        <ul>
          <li className="inline mx-1.5 md:mx-3 text-lg font-semibold text-black sm:text-white">
            <Link to={"/login"}>LOG IN</Link>
          </li>
          <li className="inline px-2 mx:px-4 py-1.5 md:py-2 mx-1.5 md:mx-3 text-lg font-semibold text-white bg-[#3B37FF] rounded-md sm:bg-white sm:text-black">
            <Link to={"/signup"}>SIGN UP</Link>
          </li>
        </ul>
      </nav>

      {/* Main content */}
      <GridSplitView>
        <div className="flex flex-col justify-center w-full gap-4 p-4 text-2xl md:pl-14">
          <p className="tracking-tighter text-semibold">
            Want to share your profile with a QR CODE&#63;
          </p>
          <p
            className="font-bold tracking-tight text-7xl"
            style={{
              color: COLORS.BG_PRIMARY,
            }}
          >
            WE GOT YOU&#33;
          </p>
        </div>
      </GridSplitView>
    </>
  );
};

export default Home;
