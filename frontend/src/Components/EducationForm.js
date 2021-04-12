import React, { useContext, useEffect, useRef, useState } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import Message from "./Message";
import { AuthContext } from "../Context/AuthContext";
import style from '../Styling/profilePage.css';

const EducationForm = (props) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  const [education, setEducation] = useState({
    collegeName: "",
    collegeLocation: "",
    courseName: "",
    graduationDate: "",
    currentCollege: false,
    username: "",
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
    setEducation({ ...education, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setEducation({
      collegeName: "",
      collegeLocation: "",
      courseName: "",
      graduationDate: "",
      currentCollege: false,
      username: "",
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    Axios({
      method: "POST",
      data: {
        collegeName: education.collegeName,
        collegeLocation: education.collegeLocation,
        courseName: education.courseName,
        graduationDate: education.graduationDate,
        currentCollege: education.currentCollege,
        username: user.username,
      },
      withCredentials: true,
      url: "http://localhost:4000/neweducation",
    }).then((data) => {
      console.log(data);
      const { message } = data.data;
      setMessage(message);
      resetForm();
      console.log(message);
      if (!message.msgError) {
        timerID = setTimeout(() => {
          props.history.push("/profile");
        }, 2000);
      }
    });
  };

  return (
    <div className="education">
      {!isAuthenticated ? <Redirect to="/login" /> : null}
      <form onSubmit={onSubmit}>
        <h1>Add Your Education Details</h1>
        <div className="mb-3">
          <label htmlFor="collegeName" className="form-label">
            College Name:{" "}
          </label>
          <input
            placeholder="Enter College or University Name"
            onChange={onChange}
            name="collegeName"
            type="text"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="collegeLocation" className="form-label">
            Location of College or University:{" "}
          </label>
          <input
            placeholder="Enter Location of College or University"
            onChange={onChange}
            name="collegeLocation"
            type="text"
            className="form-control"
            required
          />
        </div>
        <label htmlFor="username" className="form-label form-control">
          Username: {user.username}
        </label>
        <div className="mb-3">
          <label htmlFor="courseName" className="form-label">
            Name of your course:{" "}
          </label>
          <input
            placeholder="Enter Course Name"
            onChange={onChange}
            name="courseName"
            type="text"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="graduationDate" className="form-label">
            Enter Date of Graduation:{" "}
          </label>
          <input
            placeholder="Enter Graduation Date"
            onChange={onChange}
            name="graduationDate"
            type="date"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="currentCollege" className="form-label">
            Is this your Current College:{" "}
          </label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="currentCollege"
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
              name="currentCollege"
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
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default EducationForm;
