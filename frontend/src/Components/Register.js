import React, { useContext, useEffect, useRef, useState } from "react";
import Axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import Message from "./Message";

//creating class and extending the component
const Register = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  //making function getvalue to take value from input fields in the form
  const onChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setUser({ username: "", password: "" });
  };

  // creating register function and using axios to store the value in database
  // Reference: https://github.com/woodburydev/passport-local-video/blob/master/client/src/App.js
  const onSubmit = (e) => {
    e.preventDefault();
    Axios({
      method: "POST",
      data: {
        username: user.username,
        password: user.password,
      },
      withCredentials: true,
      url: "http://localhost:4000/user/register",
    }).then((data) => {
      const { message } = data.data;
      setMessage(message);
      resetForm();
      console.log(message);
      if (!message.msgError) {
        timerID = setTimeout(() => {
          props.history.push("/login");
        }, 2000);
      }
    });
  };

  // rendering the page with jsx elements
  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>Register</h1>
        <label htmlFor="username" className="sr-only">
          Username:{" "}
        </label>
        <input
          placeholder="Enter Username"
          onChange={onChange}
          name="username"
          type="text"
          className="form-control"
          required
        />
        <label htmlFor="password" className="sr-only">
          Password:{" "}
        </label>
        <input
          placeholder="Enter Password"
          onChange={onChange}
          name="password"
          type="password"
          className="form-control"
          required
        />
        <button className="btn btn-lg btn-primary btn-block">Submit</button>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default Register;
