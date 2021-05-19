import React, { useEffect, useContext, useState } from "react";
import Axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import defaultProfilePhoto from "../Images/default_profile_picture.png";

const FriendsList = (props) => {
  const { isAuthenticated, user, googleLogin, myprofileId } = useContext(
    AuthContext
  );
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
  const [friendslist, setFriendsList] = useState([]);

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
          friends: data.data.friends,
        });
      }
    });
  }, []);

  const getFriendsDetails = () => {
    if (profile.friends === null || profile.friends.length === 0) {
      console.log("No profile friends found");
    } else {
      Axios({
        method: "GET",
        params: {
          username: profile.friends,
        },
        url: "http://localhost:4000/profile",
      }).then((data) => {
        if (data.data === null) {
        } else {
          const item = [data.data];
          setFriendsList(item);
          //   console.log(item[0]);
        }
      });
    }
  };

  const goToProfile = (e) => {
    console.log("goto profile clicked");
    const profileId = e.target.value;
    console.log(profileId);
    const url = "http://localhost:3000/profile/";
    const dynamicUrl = url + profileId;
    console.log(dynamicUrl);
    const gotourl = dynamicUrl.slice(21);
    props.history.push(gotourl);
  };

  return (
    <div>
      {getFriendsDetails()}
      {friendslist.map((friend) => (
        <div key={friend._id} className="card border-dark bg-light mb-3 media">
          {!friend.photoUrl ? (
            <img
              src={defaultProfilePhoto}
              alt="defaultProfilePhoto"
              className="align-self-start mr-3"
              style={{ width: "100px", height: "100px" }}
            ></img>
          ) : (
            <img
              src={friend.photoUrl}
              style={{ width: "100px", height: "100px" }}
              alt="profilePhoto"
              className="align-self-start mr-3"
            ></img>
          )}
          <h2 className="mt-0">
            {friend.firstName} {friend.lastName}
          </h2>
          <h4 className="item">{friend.location}</h4>
          <button onClick={goToProfile} value={friend._id}>
            Go to Profile
          </button>
        </div>
      ))}
    </div>
  );
};

export default FriendsList;
