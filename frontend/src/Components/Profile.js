import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Message from "./Message";

const Profile = (props) => {
  const { isAuthenticated, user, googleLogin } = useContext(AuthContext);
  const [haveProfile, setHaveProfile] = useState(false);
  const [message, setMessage] = useState(null);
  const [profile, setProfile] = useState({
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    collegeName: "",
    location: "",
    IQ: 0,
    about: "",
    isFaculty: false,
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
        console.log("No data found");
      } else {
        setProfile({
          ...profile,
          id: data.data._id,
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
        setHaveProfile(true);
      }
    });
  }, []);

  const editProfile = () => {
    // const profileId = profile.id;
    // const url = "http://localhost:4000/profile/";
    // const dynamicUrl = url + profileId;
    // Axios({
    //   method: "PUT",
    //   url: dynamicUrl,
    // });
  };

  const deleteProfile = () => {
    const profileId = profile.id;
    const url = "http://localhost:4000/profile/";
    const dynamicUrl = url + profileId;
    console.log(dynamicUrl);
    Axios({
      method: "delete",
      url: dynamicUrl,
    }).then((data) => {
      const { message } = data.data;
      setMessage(message);
      console.log(message);
    });
  };

  return (
    <div>
      {!isAuthenticated ? <Redirect to="/login" /> : null}
      <h1>Profile</h1>
      <h2>{!user.username ? null : <h2>Username: {user.username}</h2>}</h2>
      {/* {getProfile} */}
      <h3>ID: {profile.id}</h3>
      <h3>First Name: {profile.firstName}</h3>
      <h3>Last Name: {profile.lastName}</h3>
      <h3>Email: {profile.email}</h3>
      <h3>College Name: {profile.collegeName}</h3>
      <h3>Location: {profile.location}</h3>
      <h3>IQ: {profile.IQ}</h3>
      <h3>About Me: {profile.about}</h3>
      {!profile.isFaculty ? <h3>Student</h3> : <h3>Education Faculty</h3>}
      {/* <h3>{profile}</h3> */}
      {/* <button onClick={editProfile}>Edit Profile</button> */}
      <button onClick={deleteProfile}>Delete Profile</button>
      {/* <h2>{profile.firstName}</h2> */}
      {!haveProfile ? (
        <Link to="/newprofile">
          <button href="/newprofile">Create Profile</button>
        </Link>
      ) : (
        <button onClick={editProfile}>Edit Profile</button>
      )}
      {/* <Link to="/newprofile">
        <button href="/newprofile">Create Profile</button>
      </Link> */}
      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default Profile;
