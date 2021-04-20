import React, { useContext, useEffect, useRef, useState } from "react";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { store } from "react-notifications-component";
import { AuthContext } from "../Context/AuthContext";
import Message from "./Message";
import Search from "./Search";
import defaultProfilePhoto from "../Images/default_profile_picture.png";
import MyProfile from "./MyProfile";
import NotificationPopUp from "./NotificationPopUp";
import styling from "../Styling/searchProfile.css";

const Profile = (props) => {
  const { isAuthenticated, user, googleLogin, myprofileId } = useContext(
    AuthContext
  );
  // const {profile} = useContext(ProfileContext)
  const [haveProfile, setHaveProfile] = useState(false);
  const [message, setMessage] = useState(null);
  const [myProfileID, setMyProfileId] = useState({
    mypid: "",
    firstName: "",
    lastName: "",
  });
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
  const [educations, setEducation] = useState([]);
  const [works, setWork] = useState([]);
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
  const [notificationPopUp, setNotificationPopUp] = useState({
    title: "",
    message: "",
    type: "",
  });
  useEffect(() => {
    const urlNow = window.location.href;
    const profileId = urlNow.slice(30);
    const url = "http://localhost:4000/profile/";
    const dynamicUrl = url + profileId;
    Axios({
      method: "GET",
      url: dynamicUrl,
    }).then((data) => {
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
    Axios({
      method: "GET",
      url: url,
      params: {
        username: user.username,
      },
    }).then((data) => {
      if (data.data === null) {
        console.log("No Profile data found");
      } else {
        setMyProfileId({
          ...myProfileID,
          mypid: data.data._id,
          firstName: data.data.firstName,
          lastName: data.data.lastName,
        });
      }
    });
  }, []);

  const getFriendshipStatus = (e) => {
    if (i === 0) {
      Axios({
        method: "GET",
        url: "http://localhost:4000/getfriends/status",
        params: {
          requester: user.username,
          recipient: profile.username,
        },
      }).then((data) => {
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
      if (friends.requester !== user.username) {
        Axios({
          method: "GET",
          url: "http://localhost:4000/getfriends/status",
          params: {
            requester: profile.username,
            recipient: user.username,
          },
        }).then((data) => {
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
        console.log("My Profile Id: " + myprofileId);
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
    });
    Axios({
      method: "put",
      data: {
        notification: `${myProfileID.firstName} ${myProfileID.lastName} has sent you friend request`,
        link: `http://localhost:3000/profile/${myProfileID.mypid}`,
      },
      url: `http://localhost:4000/addnotification/${profile.id}`,
    }).then((data) => {
      console.log(data.data);
      setNotificationPopUp({
        ...notificationPopUp,
        title: "Friend Request Sent",
        message: `You have sent a friend request to ${profile.firstName} ${profile.lastName}`,
        type: "info",
      });
      setTimeout(() => {
        reloadPage();
      }, 2000);
    });
  };

  const acceptRequest = () => {
    const friendshipId = friends._id;
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
      // setTimeout(() => {
      //   reloadPage();
      // }, 2000);
    });
    // if(friends.requester === user.username)
    const profileId = profile.id;
    const url2 = "http://localhost:4000/addfprofile/";
    const requesterUrl = url2 + profileId;
    console.log(profileId);
    console.log(requesterUrl);
    Axios({
      method: "put",
      params: {
        friend: friends.recipient,
      },
      url: requesterUrl,
    }).then((data) => {
      console.log(data.data);
    });
    const recipientId = myProfileID.mypid;
    console.log(recipientId);
    const recipientUrl = url2 + recipientId;
    console.log(recipientUrl);
    Axios({
      method: "put",
      params: {
        friend: friends.requester,
      },
      url: recipientUrl,
    }).then((data) => {
      console.log(data.data);
    });
    Axios({
      method: "put",
      data: {
        notification: `${myProfileID.firstName} ${myProfileID.lastName} has accepted your friend request`,
        link: `http://localhost:3000/profile/${myProfileID.mypid}`,
      },
      url: `http://localhost:4000/addnotification/${profile.id}`,
    }).then((data) => {
      console.log(data.data);
      setNotificationPopUp({
        ...notificationPopUp,
        title: "Friend Request Accepted",
        message: `You have accepted a friend request from ${profile.firstName} ${profile.lastName}`,
        type: "success",
      });
    });
  };

  const cancelRequest = () => {
    if (friends === null) {
      console.log("No friend data found");
    } else {
      const friendshipId = friends._id;
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
      const profileId = profile.id;
      const staticurl = "http://localhost:4000/rffprofile/";
      const requesterUrl = staticurl + profileId;
      console.log(profileId);
      console.log(requesterUrl);
      Axios({
        method: "put",
        params: {
          friend: friends.recipient,
        },
        url: requesterUrl,
      }).then((data) => {
        console.log(data.data);
      });
      const recipientId = myProfileID.mypid;
      console.log(recipientId);
      const recipientUrl = staticurl + recipientId;
      console.log(recipientUrl);
      Axios({
        method: "put",
        params: {
          friend: friends.requester,
        },
        url: recipientUrl,
      }).then((data) => {
        console.log(data.data);
      });
      if (friends.status === 2) {
        setNotificationPopUp({
          ...notificationPopUp,
          title: "Connection Removed",
          message: `You have removed your connection with ${profile.firstName} ${profile.lastName}`,
          type: "danger",
        });
        setTimeout(() => {
          reloadPage();
        }, 5000);
      } else {
        setNotificationPopUp({
          ...notificationPopUp,
          title: "Friend Request Canceled",
          message: `You have canceled a friend request from ${profile.firstName} ${profile.lastName}`,
          type: "danger",
        });
        setTimeout(() => {
          reloadPage();
        }, 5000);
      }
    }
  };

  const reloadPage = () => {
    window.location.reload(false);
  };

  return (
    <div className="profileSearch">
      {!isAuthenticated ? <Redirect to="/login" /> : null}
      {notificationPopUp.message !== "" ? (
        <NotificationPopUp notificationPopUp={notificationPopUp} />
      ) : null}
      {/* {!props.haveProfile ? <Redirect to="/myprofile" /> : null} */}
      <div>
        <div>
          <div className="profileImage">
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
          </div>
          <div className="userInfo">
            <h2 className="userName">
              {!profile.username ? null : <h2>Username: {profile.username}</h2>}
              {!profile.username ? null : getFriendshipStatus()}
            </h2>
            {/* <h3>
              {!myprofileId ? null : <h3>My Profile Id: {myprofileId} </h3>}
            </h3> */}
            <h3 className="profileID">
              {!myProfileID ? null : <h3>My Profile Id: {myProfileID.mypid}</h3>}
            </h3>
            <h5>Name: {profile.firstName} {profile.lastName}</h5>
            <h5>Email: {profile.email}</h5>
            <h5>College Name: {profile.collegeName}</h5>
            <h5>Location: {profile.location}</h5>
            <h5>IQ: {profile.IQ}</h5>
            <h5>About Me: {profile.about}</h5>
            {!profile.isFaculty ? <h5>Occupation: Student</h5> : <h5>Education Faculty</h5>}
            {!isFriends ? <h5 className="checkFriend">You Are Not friends</h5> : <h5 className="checkFriend">You Are Friends</h5>}
          </div>
          {!isFriends ? null : (
            <div>
              {profile.friends.length === 0 ? null : (
                <div>
                  {profile.friends.map((friend) => (
                    <div>
                      <h5 className="friend">Friend's Username: {friend}</h5>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {!isFriends ? (
            <div className="friendRequest">
              {friends.status === 1 ? (
                <div>
                  {friends.requester === user.username ? (
                    <div className="inlineBtn">
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
                        className="btn btn-success"
                        onClick={acceptRequest}
                      >
                        Accept Request
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={cancelRequest}
                      >
                        Delete Request
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <button className="btn btn-primary" onClick={sendRequest}>
                    Send Request
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="removeConnection">
              <button className="btn btn-danger" onClick={cancelRequest}>
                Remove Connection
              </button>
            </div>
          )}
          {message ? <Message message={message} /> : null}
          <div className="connection">
            {!isFriends ? null : (
              <div >
                <h5 className="header">Education Details</h5>
                {educations.map((education) => (
                  <div
                  className="card border-dark bg-light mb-3"
                    key={education._id}
                  >
                    
                    <h4 className="item" value={education.collegeName}>
                      College Name: {education.collegeName}
                    </h4>
                    <h4 className="item" value={education.collegeLocation}>
                      College Location: {education.collegeLocation}
                    </h4>
                    <h4 className="item" value={education.courseName}>
                      Course Name: {education.courseName}
                    </h4>
                    <h4 className="item" value={education.graduationDate}>
                      Graduation Date: {education.graduationDate.slice(0, 10)}
                    </h4>
                    {!education.currentCollege ? null : (
                      <h4 className="item" value={education.currentCollege}>
                        Current College
                      </h4>
                    )}
                  </div>
                ))}
                <h5 className="header">Work Details</h5>
                {works.map((work) => (
                  
                  <div
                  className="card border-dark bg-light mb-3"
                    key={work._id}
                  >
                    
                    <h4 className="item" value={work.position}>
                      Position: {work.position}
                    </h4>
                    <h4 className="item" value={work.employerName}>
                      Employer Name: {work.employerName}
                    </h4>
                    <h4 className="item">
                      Start Date: {work.startDate.slice(0, 10)}
                    </h4>
                    {!work.endDate ? null : (
                      <h4 className="item">
                        End Date: {work.endDate.slice(0, 10)}
                      </h4>
                    )}
                    {!work.currentJob ? null : (
                      <h4 className="item">Current Job</h4>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
