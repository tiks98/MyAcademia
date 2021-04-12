import React, { useContext, useState } from "react";
import Axios from "axios";
import GoogleLogin from "react-google-login";
import { refreshTokenSetup } from "../utils/refreshToken";
import { AuthContext } from "../Context/AuthContext";
import AuthService from "../Services/AuthService";
import Message from "./Message";
import { Link } from "react-router-dom";
import logoMain from "../Images/LogoMain.jpeg"
import logoHome from "../Images/LogoHomePage.jpeg"
import style from "../Styling/Registration-style.css";

//creating class and extending the component
const Login = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [googleLogin, setGoogleLogin] = useState(false);
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  //making function getvalue to take value from input fields in the form
  const onChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // creating login function and using axios to store the value in database
  // Reference: https://www.youtube.com/watch?v=7_fo3nrqiY8&t=1332s
  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.login(user).then((data) => {
      console.log(data);
      const { isAuthenticated, user, message } = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setGoogleLogin(false);
        authContext.setIsAuthenticated(isAuthenticated);
        props.history.push("/");
      } else setMessage(message);
    });
  };

  const responseSuccessGoogle = async (res) => {
    // res.preventDefault();
    // console.log(res.profileObj);
    try {
      const GoogleUserObject = await res.profileObj;
      console.log(GoogleUserObject);
      if (GoogleUserObject) {
        setUser({
          ...user,
          username: GoogleUserObject.givenName,
          password: GoogleUserObject.googleId,
        });
        console.log(user);
        if (user.username === "") {
          setMessage({
            msgBody: "Please Try Your Google Login Again",
            msgError: true,
          });
        }
      }
      refreshTokenSetup(res);
      Axios({
        method: "POST",
        data: {
          ...user,
          username: user.username,
          password: user.password,
        },
        withCredentials: true,
        url: "http://localhost:4000/user/register",
      }).then((data) => {
        const { message } = data.data;
        console.log(message);
        if (
          message.msgBody === "User Already Exists" ||
          message.msgError === true
        ) {
          setUser({
            ...user,
            username: user.username,
            password: user.password,
          });
          console.log(user);
          if (GoogleUserObject) {
            if (user.username === "") {
              setMessage({
                message: {
                  msgBody: "Please Try Again",
                  msgError: true,
                },
              });
            } else {
              AuthService.login(user).then((data) => {
                console.log(data);
                const { isAuthenticated, user, message } = data;
                if (isAuthenticated) {
                  authContext.setUser(user);
                  authContext.setGoogleLogin(true);
                  authContext.setIsAuthenticated(isAuthenticated);
                  console.log("Login Executed");
                  props.history.push("/");
                } else setMessage(message);
              });
            }
          }
        }
      });
    } catch (e) {
      console.error(e);
    }
  };

  const responseFailureGoogle = (res) => {};

  // rendering the page with jsx elements
  return (
    <div className="logoMain">
      <img src={logoMain}></img>
      <div className="login">
        <form onSubmit={onSubmit}>
          <h1>Login</h1>
          <div className="mb-3">
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
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="sr-only-password">
              Password:{" "}
            </label>
            <input
              placeholder="Enter Password"
              onChange={onChange}
              type="password"
              name="password"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3 col-12">
            <button className="btn tbn-lg btn-primary btn-submit">Submit</button>
          </div>
          <div className="mb-3 col-12">
            <GoogleLogin
              className="googleLogin"
              clientId="255153393550-c00iv7khe28pcrheeitfh6p20h6ie83o.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={responseSuccessGoogle}
              onFailure={responseFailureGoogle}
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}

            />
          </div>
          <div className="mb-3">
            <p> Not have Account? </p>
              <Link to="/register">
                <button className="btn btn-lg btn-primary" href="/register">
                  Create Account
                </button>
              </Link>
          </div>
        </form>
        {message ? <Message message={message} /> : null}
      </div>
    </div>
  );
};

export default Login;
