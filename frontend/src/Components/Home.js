import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Home = (props) => {
  const { isAuthenticated, user, googleLogin } = useContext(AuthContext);

  return (
    <div>
      {!isAuthenticated ? <Redirect to="/login" /> : null}
      <h1>Welcome Back</h1>
      <h2>{!user.username ? null : user.username}</h2>
    </div>
  );
};

export default Home;
