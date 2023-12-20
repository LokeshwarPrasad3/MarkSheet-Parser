import "../CSS/Navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // state which store current width of window
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // used to slide window when responsive design
  const [showResNavbar, setShowResNavbar] = useState(false);

  // toggle sliding window
  const toggleResNavbar = () => {
    setShowResNavbar(!showResNavbar);
  };

  useEffect(() => {
    // function set current innerWidth
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
      console.log(window.innerWidth);
    };
    // Attach event listener for window resize
    window.addEventListener("resize", handleWindowResize);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [windowWidth]);

  return (
    <>
      {/* navbar structure */}
      <nav
        id="navbar"
        className="navbar-container z-50 text-white flex justify-between items-center md:px-5 sticky top-0 h-20 shadow-md shadow-red-300 min-w-[100%] font-overpass bg-slate-900"
      >
        <header className="flex justify-center items-center gap-2 pl-3">
          <Link
            to="/"
            id="heading_logo"
            className="no-underline flex justify-center align-center"
          >
            <img
              src="/images/best.jpg"
              alt="Lokeshwar"
              className="h-12 w-12 rounded-full"
            />
          </Link>
          <h1 className="heading_name pl-2 text-2xl font-semibold text-white font-signika cursor-pointer">
            Lokeshwar Prasad
          </h1>
        </header>
        {/* show navbar-menu */}
        <div
          id="navbar_menu"
          className={`${
            showResNavbar ? "left-[0%]" : "left-[100%]"
          } flex items-center custom-transition`}
        >
          <ul id="nav_ul" className="flex font-signika gap-3">
            <li className="nav_list list-none flex justify-center items-center">
              <Link
                onClick={toggleResNavbar}
                className="nav_link text-lg no-underline px-2 py-[1px] cursor-pointer text-white rounded-md transition-all duration-300 ease-in hover:bg-slate-300 hover:text-black"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav_list list-none flex justify-center items-center">
              <Link
                onClick={toggleResNavbar}
                className="nav_link text-lg no-underline px-2 py-[1px] cursor-pointer text-white rounded-md transition-all duration-300 ease-in hover:bg-slate-300 hover:text-black"
                to="/"
              >
                ContactUs
              </Link>
            </li>
            <li className="nav_list list-none flex justify-center items-center">
              <Link
                onClick={toggleResNavbar}
                className="nav_link text-lg no-underline px-2 py-[1px] cursor-pointer text-white rounded-md transition-all duration-300 ease-in hover:bg-slate-300 hover:text-black"
                to="https://github.com/LokeshwarPrasad3"
              >
                AboutUs
              </Link>
            </li>
          </ul>
        </div>
        <div
          className={`menu_button ${
            windowWidth < 800 ? "block" : "hidden"
          } flex justify-center items-center`}
        >
          {showResNavbar ? (
            <CloseIcon
              onClick={toggleResNavbar}
              style={{ fontSize: "2.2rem" }}
              className={`absolute right-3 cursor-pointer`}
            />
          ) : (
            <MenuIcon
              onClick={toggleResNavbar}
              style={{ fontSize: "2.2rem" }}
              className={`absolute right-3 cursor-pointer`}
            />
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
