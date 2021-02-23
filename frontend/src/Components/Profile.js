import React, { useContext, useEffect, useRef, useState } from "react";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Message from "./Message";
import Search from "./Search";
import defaultProfilePhoto from "../Images/default_profile_picture.png";

const Profile = (props) => {
  const { isAuthenticated, user, googleLogin } = useContext(AuthContext);
  const [haveProfile, setHaveProfile] = useState(false);
  const [message, setMessage] = useState(null);
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
  });
  const [education, setEducation] = useState([]);
  const [work, setWork] = useState([]);
  const [friends, setFriends] = useState([]);
  const [isFriends, setIsFriends] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [friendship, setFriendship] = useState({
    requester: "",
    recipient: "",
    status: 0,
  });
  const [i, setI] = useState(0);
  let timerID = useRef(null);

  useEffect(() => {
    const urlNow = window.location.href;
    const profileId = urlNow.slice(30);
    console.log(profileId);
    const url = "http://localhost:4000/profile/";
    const dynamicUrl = url + profileId;
    Axios({
      method: "GET",
      url: dynamicUrl,
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

  const getFriendshipStatus = (e) => {
    if (i == 0) {
      Axios({
        method: "GET",
        url: "http://localhost:4000/getfriends/status",
        params: {
          requester: user.username,
          recipient: profile.username,
        },
      }).then((data) => {
        console.log(data);
        if (data.data.length === 0) {
          console.log("No Friendship Found");
        } else {
          const item = data.data[0];
          console.log(item);
          if (item.status === 2) {
            setIsFriends(true);
          }
          setFriends(item);
        }
      });
      if (friends.requester != user.username) {
        Axios({
          method: "GET",
          url: "http://localhost:4000/getfriends/status",
          params: {
            requester: profile.username,
            recipient: user.username,
          },
        }).then((data) => {
          console.log(data);
          if (data.data.length === 0) {
            console.log("No Friendship Found");
          } else {
            const item = data.data[0];
            console.log(item);
            if (item.status === 2) {
              setIsFriends(true);
            }
            setFriends(item);
          }
        });
      }
      Axios({
        method: "GET",
        params: {
          username: profile.username,
        },
        url: "http://localhost:4000/education",
      }).then((data) => {
        console.log(data);
        if (data.data === null) {
          console.log("No Education data found");
        } else {
          const item = [data.data];
          setEducation(item[0]);
          console.log(item[0]);
        }
      });
      Axios({
        method: "GET",
        params: {
          username: profile.username,
        },
        url: "http://localhost:4000/work",
      }).then((data) => {
        console.log(data);
        if (data.data === null) {
          console.log("No Work data found");
        } else {
          const item = [data.data];
          setWork(item[0]);
          console.log(item[0]);
        }
      });
      setI(1);
    }
  };

  const sendRequest = () => {
    Axios({
      method: "post",
      data: {
        requester: user.username,
        recipient: profile.username,
        status: 1,
      },
      url: "http://localhost:4000/sendfriendrequest",
    }).then((data) => {
      const { message } = data.data;
      setMessage(message);
      console.log(message);
      setRequestSent(true);
      setTimeout(() => {
        reloadPage();
      }, 2000);
    });
  };

  const acceptRequest = () => {
    const friendshipId = friends._id;
    console.log(friendshipId);
    const url = "http://localhost:4000/updaterequest/";
    const dynamicUrl = url + friendshipId;
    Axios({
      method: "put",
      data: {
        status: 2,
      },
      url: dynamicUrl,
    }).then((data) => {
      const { message } = data.data;
      setMessage(message);
      console.log(message);
      setIsFriends(true);
      setTimeout(() => {
        reloadPage();
      }, 2000);
    });
  };

  const cancelRequest = () => {
    if (friends === null) {
      console.log("No friend data found");
    } else {
      const friendshipId = friends._id;
      console.log(friendshipId);
      const url = "http://localhost:4000/deleterequest/";
      const dynamicUrl = url + friendshipId;
      Axios({
        method: "delete",
        url: dynamicUrl,
      }).then((data) => {
        const { message } = data.data;
        setMessage(message);
        console.log(message);
        reloadPage();
      });
    }
  };

  const reloadPage = () => {
    window.location.reload(false);
  };

  return (
    <div>
      {!isAuthenticated ? <Redirect to="/login" /> : null}
      <div>
        <div>
          {!profile.photoUrl ? (
            <img
              src={defaultProfilePhoto}
              alt="defaultProfilePhoto"
              style={{ width: "200px", height: "200px" }}
            ></img>
          ) : (
            <img
              src={profile.photoUrl}
              style={{ width: "200px", height: "200px" }}
              alt="profilePhoto"
            ></img>
          )}
          <h2>
            {!profile.username ? null : <h2>Username: {profile.username}</h2>}
            {!profile.username ? null : getFriendshipStatus()}
          </h2>
          <h5>First Name: {profile.firstName}</h5>
          <h5>Last Name: {profile.lastName}</h5>
          <h5>Email: {profile.email}</h5>
          <h5>College Name: {profile.collegeName}</h5>
          <h5>Location: {profile.location}</h5>
          <h5>IQ: {profile.IQ}</h5>
          <h5>About Me: {profile.about}</h5>
          {!profile.isFaculty ? <h3>Student</h3> : <h3>Education Faculty</h3>}
          <div>
            {!isFriends ? (
              <div>
                {friends.requester === user.username ? (
                  <div>
                    {friends.status === 1 ? (
                      <div>
                        <button className="btn btn-secondary" disabled>
                          Sent Request
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={cancelRequest}
                        >
                          Cancel Request
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          className="btn btn-primary"
                          onClick={sendRequest}
                        >
                          Send Request
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <button className="btn btn-success" onClick={acceptRequest}>
                      Accept Request
                    </button>
                    <button className="btn btn-danger" onClick={cancelRequest}>
                      Delete Request
                    </button>
                  </div>
                )}
              </div>
            ) : null}
            {message ? <Message message={message} /> : null}
          </div>
          <div>
            {!isFriends ? <h1>not friends</h1> : <h1>friends</h1>}
            {!isFriends ? null : (
              <div>
                {education.map((item) => {
                  <div className="card border-dark bg-light mb-3">
                    <h4 className="item" value={item.collegeName}>
                      College Name: {item.collegeName}
                    </h4>
                    <h4 className="item" value={item.collegeLocation}>
                      College Location: {item.collegeLocation}
                    </h4>
                    <h4 className="item" value={item.courseName}>
                      Course Name: {item.courseName}
                    </h4>
                    <h4 className="item" value={item.graduationDate}>
                      Graduation Date: {item.graduationDate.slice(0, 10)}
                    </h4>
                    {!item.currentCollege ? null : (
                      <h4 className="item" value={item.currentCollege}>
                        Current College
                      </h4>
                    )}
                  </div>;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
