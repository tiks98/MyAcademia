import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";
import { GoogleLogout } from "react-google-login";

const Navbar = (props) => {
  const {
    isAuthenticated,
    user,
    setIsAuthenticated,
    setUser,
    googleLogin,
    setGoogleLogin,
  } = useContext(AuthContext);

  const onLogoutSuccess = (res) => {
    alert("Logout Successful");
    setIsAuthenticated(false);
    setGoogleLogin(false);
  };

  const onFailure = () => {
    alert("Logout Unsuccessful, Please try again later");
  };

  const onClickLogoutHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };

  const unauthenticatedNavbar = () => {
    return (
      <>
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
        <Link to="/profile">
          <li className="nav-item nav-link">Profile</li>
        </Link>
        {!googleLogin ? (
          <button
            type="button"
            className="btn btn-link nav-item nav-link"
            onClick={onClickLogoutHandler}
          >
            Logout
          </button>
        ) : (
          <GoogleLogout
            clientId="255153393550-c00iv7khe28pcrheeitfh6p20h6ie83o.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={onLogoutSuccess}
            onFailure={onFailure}
            href="/login"
          ></GoogleLogout>
        )}
      </>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="navbar-brand">MyAcademia</div>
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
            {!isAuthenticated ? unauthenticatedNavbar() : authenticatedNavbar()}
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
