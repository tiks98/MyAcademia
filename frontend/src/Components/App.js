// import logo from "../logo.svg";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Register from "./Register";
import Login from "./Login";
import Navbar from "./Navbar";
import Home from "./Home";
import MyProfile from "./MyProfile";
import ProfileForm from "./ProfileForm";
import EducationForm from "./EducationForm";
import WorkForm from "./WorkForm";
import Messaging from "./Messaging";
import Notification from "./Notification";
import Challenge from "./Challenge";
import Search from "./Search";
import Profile from "./Profile";
import NewBlog from "./NewBlog";

function App() {
  return (
    <Router>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/myprofile" component={MyProfile} />
      <Route path="/profile" component={Profile} />
      <Route path="/newprofile" component={ProfileForm} />
      <Route path="/neweducation" component={EducationForm} />
      <Route path="/newwork" component={WorkForm} />
      <Route path="/messaging" component={Messaging} />
      <Route path="/notification" component={Notification} />
      <Route path="/challenge" component={Challenge} />
      <Route path="/search" component={Search} />
      <Route path="/newblog" component={NewBlog} />
    </Router>
  );
}

export default App;
