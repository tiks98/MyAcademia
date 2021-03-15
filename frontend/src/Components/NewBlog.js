import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import { AuthContext } from "../Context/AuthContext";

function    completeSubmission ()  {
    return(
        <Redirect to = "/" />
    );
}

function New(props) {
    const [inputs, setInputs] = useState({});
    const [redirect, setRedirect] = useState(false);
  
    const { isAuthenticated, user, googleLogin, myprofileId } = useContext(
        AuthContext
      );

      const onSubmit = (e) => {
        e.preventDefault();
        Axios({
          method: "POST",
          data: {
            collegeName: education.collegeName,
            collegeLocation: education.collegeLocation,
            courseName: education.courseName,
            graduationDate: education.graduationDate,
            currentCollege: education.currentCollege,
            username: user.username,
          },
          withCredentials: true,
          url: "http://localhost:4000/newblog",
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
  
    function handleInputChange(event) {
      event.persist();
  
      const { name, value } = event.target;
  
      setInputs(inputs => {
        inputs[name] = value;
        return inputs;
      });
    }
  
    if (redirect) return <Redirect to="/index" />;
  
    return (
      <div className="container">
        <header>
          <h1>Want to add Something new {!user.username ? null : user.username}</h1>
        </header>
  
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Blog Story</label>
              <textarea
                className="form-control"
                name="blog"
                required="required"
                onChange={handleInputChange}
              />
              <input type="file" ref={el} onChange={handleChange} />
            </div>
  
            <div className="form-group">
              <button className="btn btn-dark" type="submit" onClick={completeSubmission} >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  export default New;