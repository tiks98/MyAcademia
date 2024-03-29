import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import NotificationPopUp from "./NotificationPopUp";
import styling from "../Styling/notification.css";

const Notification = (props) => {
  const { isAuthenticated, user, googleLogin } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [dateNow] = useState(new Date());
  var [ISOstring] = useState("");
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
    notifications: [Object],
  });
  const [profileNotification, setProfileNotification] = useState([]);
  const [Notification, setNotification] = useState({
    notification: "",
    username: "",
    link: "",
    created_date: "",
  });
  const [showNotification, setShowNotification] = useState(true);
  const [i, setI] = useState(0);
  const [notificationPopUp, setNotificationPopUp] = useState({
    title: "",
    message: "",
    type: "",
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
        console.log(data.data);
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
      params: {
        username: user.username,
      },
      url: "http://localhost:4000/getnotificationsprofile",
    }).then((data) => {
      console.log(data.data);
      setProfileNotification(data.data);
    });
    console.log(profile.notifications[1]);
    ISOstring = dateNow.toISOString().slice(0, 10);
    console.log(ISOstring);
  }, []);

  const CheckFriendsNotifications = () => {
    if (i === 0) {
      Axios({
        method: "GET",
        params: {
          username: profile.friends,
        },
        url: "http://localhost:4000/getnotifications",
      }).then((data) => {
        console.log(data);
        if (data.data === null) {
          console.log("No Notifications Found");
        } else {
          setNotifications(data.data);
        }
      });
      setI(1);
    }
  };

  const reloadPage = () => {
    window.location.reload(false);
  };

  // const deleteNotification = (e) => {
  //   const url = "http://localhost:4000/deletenotification/";
  //   const notificationId = e.target.value;
  //   const dynamicUrl = url + notificationId;
  //   e.preventDefault();
  //   Axios({
  //     method: "delete",
  //     url: dynamicUrl,
  //   }).then((data) => {
  //     console.log(data);
  //     reloadPage();
  //   });
  // };

  const deleteProfileNotification = (e) => {
    const url = "http://localhost:4000/removenotification/";
    const profileID = profile.id;
    const notificationId = e.target.value;
    const dynamicUrl = url + profileID;
    console.log(notificationId);
    e.preventDefault();
    Axios({
      method: "PUT",
      params: {
        NotificationId: notificationId,
      },
      url: dynamicUrl,
    }).then((data) => {
      console.log(data.data.notifications);
      reloadPage();
    });
  };

  const deleteAllProfileNotification = (e) => {
    const url = "http://localhost:4000/removeallnotifications/";
    const profileID = profile.id;
    const notificationId = e.target.value;
    const dynamicUrl = url + profileID;
    console.log(notificationId);
    e.preventDefault();
    Axios({
      method: "PUT",
      url: dynamicUrl,
    }).then((data) => {
      console.log(data.data);
      reloadPage();
    });
  };

  const readByUser = (notification) => {
    const notificationID = notification._id;
    console.log(notification);
    if (notification.readByUser === false) {
      Axios({
        method: "put",
        params: {
          NotificationId: notificationID,
          readByUser: true,
        },
        url: `http://localhost:4000/editnotification/${profile.id}`,
      }).then((data) => {
        console.log(data.data);
        props.history.push(`${notification.link.slice(21)}`);
      });
    } else {
      props.history.push(`${notification.link.slice(21)}`);
      console.log("readbyuser not working properly");
    }
  };

  const handleHideNotification = () => {
    setShowNotification(false);
  };

  const handleShowNotification = () => {
    setShowNotification(true);
  };

  return (
    <div className="notificationMain">
      {!isAuthenticated ? <Redirect to="/login" /> : null}
      <h1 className="main">Welcome to Notification Page</h1>
      <h2 className="userName">{!user.username ? null : user.username}</h2>
      {notificationPopUp.message !== "" ? (
        <NotificationPopUp notificationPopUp={notificationPopUp} />
      ) : null}
      <h4 className="headerPersonal">Personal Notifications</h4>
      <hr className="lineMain"></hr>
      {profileNotification.length === 0 ? (
        <h3 className="empty">You have no personal notifications</h3>
      ) : (
        <div className="notificationBtn">
          <button
            className="btn btn-danger btn-delete"
            onClick={deleteAllProfileNotification}
          >
            Delete
          </button>
          {profileNotification
            .sort((a, b) => {
              if (
                a.notiCreationDate.slice(0, 4) ===
                b.notiCreationDate.slice(0, 4)
              ) {
                if (
                  a.notiCreationDate.slice(5, 7) ===
                  b.notiCreationDate.slice(5, 7)
                )
                  return (
                    b.notiCreationDate.slice(8, 10) -
                    a.notiCreationDate.slice(8, 10)
                  );
                else
                  return (
                    b.notiCreationDate.slice(5, 7) -
                    a.notiCreationDate.slice(5, 7)
                  );
              } else
                return (
                  b.notiCreationDate.slice(0, 4) -
                  a.notiCreationDate.slice(0, 4)
                );
            })
            .map((notification) => (
              <div className="notificationBox">
                {notification === null ? null : (
                  <div>
                    {notification.readByUser ? (
                      <div
                        key={notification._id}
                        onClick={() => readByUser(notification)}
                        className="card border-dark bg-light mb-3"
                      >
                        <h4>{notification.notification}</h4>
                        <h4>{notification.notiCreationDate.slice(0, 10)}</h4>
                        <button
                          className="btn-danger btn-submit"
                          onClick={deleteProfileNotification}
                          value={notification._id}
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <div
                        key={notification._id}
                        className="card border-dark text-white bg-info mb-3"
                      >
                        <h4 onClick={() => readByUser(notification)}>
                          {notification.notification}
                        </h4>
                        <h4>{notification.notiCreationDate.slice(0, 10)}</h4>
                        <button
                          className="btn-danger btn-submit"
                          onClick={deleteProfileNotification}
                          value={notification._id}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
      {profile.friends.length === 0 ? null : CheckFriendsNotifications()}
      <h4 className="headerCommon">Common Notifications</h4>
      <hr className="line"></hr>
      <div className="notificationCommon">
        {showNotification ? (
          <div>
            {notifications.length === 0 ? (
              <h4 className="empty">You don't have any common notifications</h4>
            ) : (
              <div>
                <button
                  className="btn btn-primary"
                  onClick={handleHideNotification}
                >
                  Hide Notifications
                </button>
                {notifications
                  .sort((a, b) => {
                    if (
                      a.created_date.slice(1, 4) === b.created_date.slice(1, 4)
                    ) {
                      if (
                        a.created_date.slice(6, 7) ===
                        b.created_date.slice(6, 7)
                      )
                        return (
                          b.created_date.slice(9, 10) -
                          a.created_date.slice(9, 10)
                        );
                      else
                        return (
                          b.created_date.slice(6, 7) -
                          a.created_date.slice(6, 7)
                        );
                    } else
                      return (
                        b.created_date.slice(1, 4) - a.created_date.slice(1, 4)
                      );
                  })
                  .map((notification) => (
                    <div className="commonBox">
                      <div
                        key={notification._id}
                        className="card border-dark bg-light mb-3 box"
                      >
                        <Link to={notification.link.slice(21)}>
                          <h4>{notification.notification}</h4>
                        </Link>
                        <h4>{notification.username}</h4>
                        {notification.created_date.slice(0, 10) !== ISOstring ? (
                          <div className="date">
                            <h5>{notification.created_date.slice(0, 10)}</h5>
                          </div>
                        ) : (
                          <div className="date">
                            <h5>Today</h5>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <h4>
              Your Notifications are hidden click here to see your notifications
            </h4>
            <button
              className="btn btn-primary"
              onClick={handleShowNotification}
            >
              Show All Notifications
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
