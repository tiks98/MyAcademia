import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

//creating class and extending the component
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUsername: "",
      loginPassword: "",
    };
  }

  //making function getvalue to take value from input fields in the form
  getValue = (e) => {
    const loginUsername = e.target.value;
    const loginPassword = e.target.value;

    this.setState({
      loginUsername: loginUsername,
      loginPassword: loginPassword,
    });
  };

  // creating login function and using axios to store the value in database
  // Reference: https://github.com/woodburydev/passport-local-video/blob/master/client/src/App.js
  login = () => {
    Axios({
      method: "POST",
      data: {
        username: this.state.loginUsername,
        password: this.state.loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:4000/login",
    }).then((res) => console.log(res));
  };

  // rendering the page with jsx elements
  render() {
    return (
      <div>
        login Here
        <div>
          <h1>login</h1>
          <input
            placeholder="username"
            onChange={this.getValue}
            ref={(input) => (this.loginUsername = input)}
            name="username"
          />
          <input
            placeholder="password"
            onChange={this.getValue}
            ref={(input) => (this.loginUsername = input)}
            name="password"
          />
          <Link to="/">
            <button href="/" onClick={this.login}>
              Submit
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Login;
