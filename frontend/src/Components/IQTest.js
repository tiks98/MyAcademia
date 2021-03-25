import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const IQTest = (props) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  useEffect(() => {}, []);

  return (
    <div>
      {!isAuthenticated ? <Redirect to="/login" /> : null}
      <h1>Welcome To IQ Test</h1>
      <h2>{!user.username ? null : user.username}</h2>
    </div>
  );
};

export default IQTest;
