import React, { useContext, useState } from "react";
import GoogleLogin from "react-google-login";
import { refreshTokenSetup } from "../utils/refreshToken";
import { AuthContext } from "../Context/AuthContext";
import AuthService from "../Services/AuthService";
import Message from "./Message";
import { Link } from "react-router-dom";

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

  const responseSuccessGoogle = (res) => {
    console.log(res.profileObj);
    refreshTokenSetup(res);
    authContext.setUser({
      ...user,
      username: res.profileObj.givenName,
      password: res.profileObj.googleId,
    });
    authContext.setGoogleLogin(true);
    authContext.setIsAuthenticated(true);
    props.history.push("/");
  };

  const responseFailureGoogle = (res) => {};

  // rendering the page with jsx elements
  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>login</h1>
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
          <label htmlFor="password" className="sr-only">
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
        <div className="mb-3">
          <button className="btn btn-lg btn-primary btn-block">Submit</button>
        </div>
        <div className="mb-3 col-12">
          <GoogleLogin
            clientId="255153393550-c00iv7khe28pcrheeitfh6p20h6ie83o.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseSuccessGoogle}
            onFailure={responseFailureGoogle}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
          />
        </div>
        <div className="mb-3 col-12">
          <Link to="/register">
            <button className="btn btn-lg btn-primary" href="/register">
              Create Account
            </button>
          </Link>
        </div>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default Login;
