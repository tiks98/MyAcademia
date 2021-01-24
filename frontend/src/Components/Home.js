import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import AuthService from "../Services/AuthService";

const Home = (props) => {
  const authContext = useContext(AuthContext);
  // const getUsername = () => {
  //   AuthService.isAuthenticated().then((data) => {
  //     console.log(data.username);
  //     console.log(authContext.username);
  //   });
  // };

  return (
    <div>
      <h1>Welcome Back</h1>
      {/* <h2>{getUsername}</h2> */}
    </div>
  );
};

export default Home;
