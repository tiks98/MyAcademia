import React, { useContext, useState } from "react";
import { GoogleLogout } from "react-google-login";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";
import Message from "./Message";

const Logout = (props) => {
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const [message, setMessage] = useState(null);

  const onSuccess = () => {
    alert("Logout Successful");
    setIsAuthenticated(false);
    // props.history.push("/login");
  };

  const onClickLogoutHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
        // props.history.push("/login");
      } else setMessage(message);
    });
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={onClickLogoutHandler}
        href="/login"
      >
        Logout
      </button>
      <GoogleLogout
        clientId="255153393550-c00iv7khe28pcrheeitfh6p20h6ie83o.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
        href="/login"
      ></GoogleLogout>
      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default Logout;
