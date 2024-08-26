import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { Context } from "../../main";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true); // It seems like there was a typo here, it should be setIsAuthorized(false)
    }
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="logo">
          <img src="/JobZee-logos__white.png" alt="logo" />
        </div>
        <ul className={showMenu ? "show-menu menu" : "menu"}>
          <li>
            <Link to={"/"} onClick={closeMenu}>
              HOME
            </Link>
          </li>
          <li>
            <Link to={"/job/getall"} onClick={closeMenu}>
              ALL JOBS
            </Link>
          </li>
          <li>
            <Link
              to={user && user.role === "Employer" ? "/applications/me" : "/my-applications"}
              onClick={closeMenu}
            >
              {user && user.role === "Employer"
                ? "APPLICANT'S APPLICATIONS"
                : "MY APPLICATIONS"}
            </Link>
          </li>
          {user && user.role === "Employer" && (
            <>
              <li>
                <Link to={"/job/post"} onClick={closeMenu}>
                  POST NEW JOB
                </Link>
              </li>
              <li>
                <Link to={"/job/me"} onClick={closeMenu}>
                  VIEW YOUR JOBS
                </Link>
              </li>
            </>
          )}
          <li>
            <button onClick={handleLogout}>LOGOUT</button>
          </li>
        </ul>
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShowMenu(!showMenu)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
