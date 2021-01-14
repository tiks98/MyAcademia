// import logo from "../logo.svg";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Register from "./Register";
import Login from "./Login";
import Navbar from "./Navbar";
import Home from "./Home";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Router>
    );
  }
}

export default App;
