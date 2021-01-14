import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
// import user from "../../../backend/app";
// import app from "../../../backend/app";

const Navbar = (props) => {
  //   const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(
  //     app
  //   );

  const unauthenticatedNavbar = () => {
    return (
      <>
        <Link to="/">
          <li className="nav-item nav-link">Home</li>
        </Link>
        <Link to="/login">
          <li className="nav-item nav-link">Login</li>
        </Link>
        <Link to="/register">
          <li className="nav-item nav-link">Register</li>
        </Link>
      </>
    );
  };

  const authenticatedNavbar = () => {
    return (
      <>
        <Link to="/">
          <li className="nav-item nav-link">Home</li>
        </Link>
        <Link to="/logout">
          <li className="nav-item nav-link">Logout</li>
        </Link>
      </>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/">
          <div className="navbar-brand">MyAcademia</div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* {!isAuthenticated ? unauthenticatedNavbar() : authenticatedNavbar()} */}
            {unauthenticatedNavbar()}
          </ul>
          <span className="navbar-text">
            Navbar text with an inline element
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
