import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";


const Home = (props) => {
  const { isAuthenticated, user, googleLogin, myprofileId } = useContext(
    AuthContext
  );
  const authContext = useContext(AuthContext);
  const [i, SetI] = useState(false);
  const [profile, setProfile] = useState({
    id: "",
    photoUrl: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    collegeName: "",
    location: "",
    IQ: 0,
    about: "",
    isFaculty: false,
    friends: [],
  });

  useEffect(() => {
    const username = user.username;
    Axios({
      method: "GET",
      params: {
        username: username,
      },
      url: "http://localhost:4000/profile",
    }).then((data) => {
      console.log(data);
      if (data.data === null) {
        console.log("No Profile data found");
      } else {
        setProfile({
          ...profile,
          id: data.data._id,
          photoUrl: data.data.photoUrl,
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          username: data.data.username,
          email: data.data.email,
          collegeName: data.data.collegeName,
          location: data.data.location,
          IQ: data.data.IQ,
          about: data.data.about,
          isFaculty: data.data.isFaculty,
        });
      }
    });
  }, []);

  const sayHi = () => {
    alert("Hello Guys");
  } 
  const getMyProfile = () => {
    if (i === false) {
      authContext.setMyProfileId(profile.id);
      console.log(myprofileId);
      console.log("Profile ID");
      // console.log(myprofileId);
      SetI(true);
    }
  };



  return (
    <div>
      {!isAuthenticated ? <Redirect to="/login" /> : null}
      <h1>Welcome Back</h1>
      <h2>{!user.username ? null : user.username}</h2>
      {/* <h2>{!profile.id ? null : profile.id}</h2> */}
      {/* {profile} */}
      {/* <h2>{!myprofileId ? null : myprofileId}</h2> */}
      {!profile.id ? null : getMyProfile()}
      {/* {getMyProfile()} */}
      <h2>{myprofileId}</h2>
      <Link className="Links" to={`/newblog`}>Add New Blog</Link>
    </div>
  );
};

export default Home;
