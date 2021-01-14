import React from "react";
import Axios from "axios";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  getUser = (Username) => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/user",
    }).then((res) => {
      this.setData(res.data);
      console.log(res.data.username);
      this.Username = res.data.username;
    });
    return Username;
  };

  render() {
    return <div>{<h1>Welcome Back {this.getUser.Username}</h1>}</div>;
  }
}

export default Home;
