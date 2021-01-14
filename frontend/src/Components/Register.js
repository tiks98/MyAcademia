import React from "react";
import Axios from "axios";

//creating class and extending the component
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registerUsername: "",
      registerPassword: "",
    };
  }

  //making function getvalue to take value from input fields in the form
  getValue = (e) => {
    const registerUsername = e.target.value;
    const registerPassword = e.target.value;

    this.setState({
      registerUsername: registerUsername,
      registerPassword: registerPassword,
    });
  };

  // creating register function and using axios to store the value in database
  // Reference: https://github.com/woodburydev/passport-local-video/blob/master/client/src/App.js
  register = () => {
    Axios({
      method: "POST",
      data: {
        username: this.state.registerUsername,
        password: this.state.registerPassword,
      },
      withCredentials: true,
      url: "http://localhost:4000/register",
    }).then((res) => console.log(res));
  };

  // rendering the page with jsx elements
  render() {
    return (
      <div>
        Register Here
        <div>
          <h1>Register</h1>
          <input
            placeholder="username"
            onChange={this.getValue}
            ref={(input) => (this.registerUsername = input)}
            name="username"
          />
          <input
            placeholder="password"
            onChange={this.getValue}
            ref={(input) => (this.registerUsername = input)}
            name="password"
          />
          <button onClick={this.register}>Submit</button>
        </div>
      </div>
    );
  }
}

export default Register;
