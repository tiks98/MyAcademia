// import logo from "../logo.svg";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Register from "./Register";
import Login from "./Login";
import Navbar from "./Navbar";
import Home from "./Home";
import Profile from "./Profile";
import ProfileForm from "./ProfileForm";
import EducationForm from "./EducationForm";
import WorkForm from "./WorkForm";

function App() {
  return (
    <Router>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/profile" component={Profile} />
      <Route path="/newprofile" component={ProfileForm} />
      <Route path="/neweducation" component={EducationForm} />
      <Route path="/newwork" component={WorkForm} />
    </Router>
  );
}

export default App;
