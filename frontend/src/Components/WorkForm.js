import React, { useContext, useEffect, useRef, useState } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import Message from "./Message";
import { AuthContext } from "../Context/AuthContext";

const WorkForm = (props) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  const [work, setWork] = useState({
    position: "",
    employerName: "",
    startDate: "",
    endDate: "",
    currentJob: false,
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
    setWork({ ...work, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setWork({
      position: "",
      employerName: "",
      startDate: "",
      endDate: "",
      currentJob: false,
      username: "",
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    Axios({
      method: "POST",
      data: {
        position: work.position,
        employerName: work.employerName,
        startDate: work.startDate,
        endDate: work.endDate,
        currentJob: work.currentJob,
        username: user.username,
      },
      withCredentials: true,
      url: "http://localhost:4000/newwork",
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
    <div className="work">
      {!isAuthenticated ? <Redirect to="/login" /> : null}
      <form onSubmit={onSubmit}>
        <h1>Add Your Work Details</h1>
        <div className="mb-3">
          <label htmlFor="position" className="form-label">
            Job Position:{" "}
          </label>
          <input
            placeholder="Enter Job Position"
            onChange={onChange}
            name="position"
            type="text"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="employerName" className="form-label">
            Name of your Employer:{" "}
          </label>
          <input
            placeholder="Enter Name of Employer"
            onChange={onChange}
            name="employerName"
            type="text"
            className="form-control"
            required
          />
        </div>
        <label htmlFor="username" className="form-label form-control">
          Username: {user.username}
        </label>
        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">
            Start Date:{" "}
          </label>
          <input
            placeholder="Enter Start Date"
            onChange={onChange}
            name="startDate"
            type="date"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">
            End Date:{" "}
          </label>
          <input
            placeholder="Enter End Date"
            onChange={onChange}
            name="endDate"
            type="date"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="currentCollege" className="form-label">
            Is this your Current Job:{" "}
          </label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="currentJob"
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
              name="currentJob"
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

export default WorkForm;
