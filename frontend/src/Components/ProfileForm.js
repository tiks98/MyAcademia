import React, { useContext, useEffect, useRef, useState } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import Message from "./Message";
import { AuthContext } from "../Context/AuthContext";

const ProfileForm = (props) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  const [profile, setProfile] = useState({
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
  const [message, setMessage] = useState(null);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  //making function onChange to take value from input fields in the form
  const onChange = (e) => {
    e.preventDefault();
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const reloadPage = () => {
    window.location.reload(false);
  };

  const resetForm = (e) => {
    setProfile({
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
  };

  const onSubmit = (e) => {
    e.preventDefault();
    Axios({
      method: "POST",
      data: {
        photoUrl: profile.photoUrl,
        firstName: profile.firstName,
        lastName: profile.lastName,
        username: user.username,
        email: profile.email,
        collegeName: profile.collegeName,
        location: profile.location,
        IQ: profile.IQ,
        about: profile.about,
        isFaculty: profile.isFaculty,
      },
      withCredentials: true,
      url: "http://localhost:4000/newprofile",
    }).then((data) => {
      const { message } = data.data;
      setMessage(message);
      resetForm();
      console.log(message);
      if (!message.msgError) {
        timerID = setTimeout(() => {
          props.history.push("/myprofile");
        }, 2000);
      }
    });
  };

  return (
    <div className="createProfile">
      {!isAuthenticated ? <Redirect to="/login" /> : null}
      <form onSubmit={onSubmit}>
        <h1>Create Your Profile</h1>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name:{" "}
          </label>
          <input
            placeholder="Enter First Name"
            onChange={onChange}
            name="firstName"
            type="text"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name:{" "}
          </label>
          <input
            placeholder="Enter Last Name"
            onChange={onChange}
            name="lastName"
            type="text"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="photoUrl" className="form-label">
            Profile Photo:{" "}
          </label>
          <input
            placeholder="Please Enter a URL"
            onChange={onChange}
            name="photoUrl"
            type="text"
            className="form-control"
          />
        </div>
        <label htmlFor="username" className="form-label form-control">
          Username: {user.username}
        </label>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:{" "}
          </label>
          <input
            placeholder="Enter Email"
            onChange={onChange}
            name="email"
            type="email"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="collegeName" className="form-label">
            College Name:{" "}
          </label>
          <input
            placeholder="Enter College Name"
            onChange={onChange}
            name="collegeName"
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location:{" "}
          </label>
          <input
            placeholder="Enter Location"
            onChange={onChange}
            name="location"
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="about" className="form-label">
            About:{" "}
          </label>
          <textarea
            placeholder="About Yourself"
            onChange={onChange}
            name="about"
            type="textarea"
            className="form-control"
            rows="3"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="isFaculty" className="form-label">
            Are you a Faculty:{" "}
          </label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="isFaculty"
              id="Yes"
              value="true"
              onChange={onChange}
            />
            <label className="form-check-label" htmlFor="Yes">
              Yes
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="isFaculty"
              id="No"
              value="false"
              onChange={onChange}
              checked
            />
            <label className="form-check-label" htmlFor="No">
              No
            </label>
          </div>
        </div>
        <button className="btn btn-lg btn-primary btn-block">Submit</button>
        <button
          className="btn btn-lg btn-secondary btn-block"
          onClick={reloadPage}
        >
          Cancel
        </button>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default ProfileForm;
