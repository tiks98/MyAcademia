import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Message from "./Message";

const Profile = (props) => {
  const { isAuthenticated, user, googleLogin } = useContext(AuthContext);
  const [haveProfile, setHaveProfile] = useState(false);
  const [editEducationClicked, setEditEducationClicked] = useState(false);
  const [editWorkClicked, setEditWorkClicked] = useState(false);
  const [editProfileClicked, setEditProfileClicked] = useState(false);
  const [message, setMessage] = useState(null);
  const [profile, setProfile] = useState({
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    collegeName: "",
    location: "",
    IQ: 0,
    about: "",
    isFaculty: false,
  });
  const [education, setEducation] = useState([]);
  const [work, setWork] = useState([]);
  const [editEducation, setEditEducation] = useState({
    _id: "",
    collegeName: "",
    collegeLocation: "",
    courseName: "",
    graduationDate: "",
    currentCollege: false,
    username: "",
  });
  const [editWork, setEditWork] = useState({
    _id: "",
    position: "",
    employerName: "",
    startDate: "",
    endDate: "",
    currentJob: false,
    username: "",
  });

  useEffect(() => {
    const username = user.username;
    Axios({
      method: "GET",
      params: {
        username: username,
      },
      url: "http://localhost:4000/profile",
    }).then((data) => {
      console.log(data);
      if (data.data === null) {
        console.log("No Profile data found");
      } else {
        setProfile({
          ...profile,
          id: data.data._id,
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          username: data.data.username,
          email: data.data.email,
          collegeName: data.data.collegeName,
          location: data.data.location,
          IQ: data.data.IQ,
          about: data.data.about,
          isFaculty: data.data.isFaculty,
        });
        setHaveProfile(true);
      }
    });
    Axios({
      method: "GET",
      params: {
        username: username,
      },
      url: "http://localhost:4000/education",
    }).then((data) => {
      console.log(data);
      if (data.data === null) {
        console.log("No Education data found");
      } else {
        const item = [data.data];
        setEducation(item[0]);
        console.log(item[0]);
      }
    });
    Axios({
      method: "GET",
      params: {
        username: username,
      },
      url: "http://localhost:4000/work",
    }).then((data) => {
      console.log(data);
      if (data.data === null) {
        console.log("No Work data found");
      } else {
        const item = [data.data];
        setWork(item[0]);
        console.log(item[0]);
      }
    });
  }, []);

  const reloadPage = () => {
    window.location.reload(false);
  };

  const deleteProfile = () => {
    const profileId = profile.id;
    const url = "http://localhost:4000/profile/";
    const dynamicUrl = url + profileId;
    console.log(dynamicUrl);
    Axios({
      method: "delete",
      url: dynamicUrl,
    }).then((data) => {
      const { message } = data.data;
      setMessage(message);
      console.log(message);
      reloadPage();
    });
  };

  const resetForm = (e) => {
    e.target.value = "";
  };

  const onChangeProfile = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const onChangeEducation = (e) => {
    // e.preventDefault();
    setEditEducation({ ...editEducation, [e.target.name]: e.target.value });
  };

  const onChangeWork = (e) => {
    // e.preventDefault();
    setEditWork({ ...editWork, [e.target.name]: e.target.value });
  };

  const editEducationForm = (e) => {
    setEditEducationClicked(true);
    console.log("running education edit form");
  };

  const editWorkForm = (e) => {
    setEditWorkClicked(true);
    console.log("running work edit form");
  };

  const editProfileForm = (e) => {
    setEditProfileClicked(true);
    console.log("running edit profile form");
  };

  const onSubmitEducation = (e) => {
    const educationId = e.target.value;
    const url = "http://localhost:4000/education/";
    const dynamicUrl = url + educationId;
    console.log(educationId);
    console.log(dynamicUrl);
    Axios({
      method: "put",
      data: {
        collegeName: editEducation.collegeName,
        collegeLocation: editEducation.collegeLocation,
        courseName: editEducation.courseName,
        graduationDate: editEducation.graduationDate,
        currentCollege: editEducation.currentCollege,
        username: user.username,
      },
      withCredentials: true,
      url: dynamicUrl,
    }).then((data) => {
      const { message } = data.data;
      setMessage(message);
      console.log(message);
    });
  };

  const onSubmitWork = (e) => {
    const workId = e.target.value;
    const url = "http://localhost:4000/work/";
    const dynamicUrl = url + workId;
    console.log(workId);
    console.log(dynamicUrl);
    Axios({
      method: "put",
      data: {
        position: editWork.position,
        employerName: editWork.employerName,
        startDate: editWork.startDate,
        endDate: editWork.endDate,
        currentJob: editWork.currentJob,
        username: user.username,
      },
      withCredentials: true,
      url: dynamicUrl,
    }).then((data) => {
      const { message } = data.data;
      setMessage(message);
      console.log(message);
    });
  };

  const onSubmitProfile = (e) => {
    const profileId = profile.id;
    const url = "http://localhost:4000/profile/";
    const dynamicUrl = url + profileId;
    console.log(profileId);
    console.log(dynamicUrl);
    Axios({
      method: "put",
      data: {
        firstName: profile.firstName,
        lastName: profile.lastName,
        username: user.username,
        email: profile.email,
        collegeName: profile.collegeName,
        location: profile.location,
        IQ: profile.IQ,
        about: profile.about,
        isFaculty: profile.isFaculty,
      },
      withCredentials: true,
      url: dynamicUrl,
    }).then((data) => {
      const { message } = data.data;
      setMessage(message);
      console.log(message);
    });
  };

  const deleteEducation = (e) => {
    const educationId = e.target.value;
    const url = "http://localhost:4000/education/";
    const dynamicUrl = url + educationId;
    console.log(educationId);
    console.log(dynamicUrl);
    Axios({
      method: "delete",
      url: dynamicUrl,
    }).then((data) => {
      const { message } = data.data;
      setMessage(message);
      console.log(message);
      reloadPage();
    });
  };

  const deleteWork = (e) => {
    const workId = e.target.value;
    const url = "http://localhost:4000/work/";
    const dynamicUrl = url + workId;
    console.log(workId);
    console.log(dynamicUrl);
    Axios({
      method: "delete",
      url: dynamicUrl,
    }).then((data) => {
      const { message } = data.data;
      setMessage(message);
      console.log(message);
      reloadPage();
    });
  };

  return (
    <div>
      {!isAuthenticated ? <Redirect to="/login" /> : null}
      <h1>Profile</h1>
      {!haveProfile ? (
        <div className="noProfile">
          <h2>We don't have your Profile, Please make your Profile</h2>
          <Link to="/newprofile">
            <button className="btn btn-lg btn-primary">Create Profile</button>
          </Link>
        </div>
      ) : (
        <div>
          <h2>{!user.username ? null : <h2>Username: {user.username}</h2>}</h2>
          {/* {getProfile} */}
          <h5>ID: {profile.id}</h5>
          <h5>First Name: {profile.firstName}</h5>
          <h5>Last Name: {profile.lastName}</h5>
          <h5>Email: {profile.email}</h5>
          <h5>College Name: {profile.collegeName}</h5>
          <h5>Location: {profile.location}</h5>
          <h5>IQ: {profile.IQ}</h5>
          <h5>About Me: {profile.about}</h5>
          {!profile.isFaculty ? <h3>Student</h3> : <h3>Education Faculty</h3>}
          <div>
            {!editProfileClicked ? null : (
              <div>
                <form onSubmit={onSubmitProfile}>
                  <h1>Edit Your Profile</h1>
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      First Name:{" "}
                    </label>
                    <input
                      placeholder={profile.firstName}
                      onChange={onChangeProfile}
                      name="firstName"
                      type="text"
                      className="form-control"
                      value={profile.firstName}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Last Name:{" "}
                    </label>
                    <input
                      placeholder={profile.lastName}
                      onChange={onChangeProfile}
                      name="lastName"
                      type="text"
                      className="form-control"
                      value={profile.lastName}
                      required
                    />
                  </div>
                  <label htmlFor="username" className="form-label form-control">
                    Username: {user.username}
                  </label>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email:{" "}
                    </label>
                    <input
                      placeholder={profile.email}
                      onChange={onChangeProfile}
                      name="email"
                      type="email"
                      className="form-control"
                      value={profile.email}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="collegeName" className="form-label">
                      College Name:{" "}
                    </label>
                    <input
                      placeholder={profile.collegeName}
                      onChange={onChangeProfile}
                      name="collegeName"
                      type="text"
                      value={profile.collegeName}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="location" className="form-label">
                      Location:{" "}
                    </label>
                    <input
                      placeholder={profile.location}
                      onChange={onChangeProfile}
                      name="location"
                      type="text"
                      value={profile.location}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="IQ" className="form-label">
                      IQ:{" "}
                    </label>
                    <input
                      placeholder={profile.IQ}
                      onChange={onChangeProfile}
                      name="IQ"
                      type="number"
                      value={profile.IQ}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="about" className="form-label">
                      About:{" "}
                    </label>
                    <textarea
                      placeholder={profile.about}
                      onChange={onChangeProfile}
                      name="about"
                      type="textarea"
                      value={profile.about}
                      className="form-control"
                      rows="3"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="isFaculty" className="form-label">
                      Are you a Faculty:{" "}
                    </label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="isFaculty"
                        id="Yes"
                        value="true"
                        onChange={onChangeProfile}
                      />
                      <label className="form-check-label" htmlFor="Yes">
                        Yes
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="isFaculty"
                        id="No"
                        value="false"
                        onChange={onChangeProfile}
                        checked
                      />
                      <label className="form-check-label" htmlFor="No">
                        No
                      </label>
                    </div>
                  </div>
                  <button className="btn btn-lg btn-primary btn-block">
                    Submit
                  </button>
                </form>
              </div>
            )}
          </div>
          <h2>Education Details</h2>
          <Link to="/neweducation">
            <button className="btn btn-lg btn-primary">Add</button>
          </Link>
          <div>
            {education.map((item) => (
              <div className="card border-dark bg-light mb-3">
                <h4 className="item">ID: {item._id}</h4>
                <h4 className="item" value={item.collegeName}>
                  College Name: {item.collegeName}
                </h4>
                <h4 className="item" value={item.collegeLocation}>
                  College Location: {item.collegeLocation}
                </h4>
                <h4 className="item" value={item.courseName}>
                  Course Name: {item.courseName}
                </h4>
                <h4 className="item" value={item.graduationDate}>
                  Graduation Date: {item.graduationDate}
                </h4>
                {!item.currentCollege ? null : (
                  <h4 className="item" value={item.currentCollege}>
                    Current College
                  </h4>
                )}
                <button
                  className="btn btn-primary"
                  onClick={editEducationForm}
                  value={item._id}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={deleteEducation}
                  value={item._id}
                >
                  Delete
                </button>
                {!editEducationClicked ? null : (
                  <div>
                    <form>
                      <input
                        placeholder={item.collegeName}
                        onChange={onChangeEducation}
                        name="collegeName"
                        type="text"
                        className="form-control"
                        required
                      />
                      <input
                        placeholder={item.collegeLocation}
                        onChange={onChangeEducation}
                        name="collegeLocation"
                        type="text"
                        className="form-control"
                        required
                      />
                      <input
                        placeholder={item.courseName}
                        onChange={onChangeEducation}
                        name="courseName"
                        type="text"
                        className="form-control"
                        required
                      />
                      <input
                        placeholder={item.graduationDate}
                        onChange={onChangeEducation}
                        name="graduationDate"
                        type="date"
                        className="form-control"
                        required
                      />
                      <label htmlFor="currentCollege" className="form-label">
                        Is this your current college:{" "}
                      </label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="currentCollege"
                          id="Yes"
                          value="true"
                          onChange={onChangeEducation}
                        />
                        <label className="form-check-label" htmlFor="Yes">
                          Yes
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="currentCollege"
                          id="No"
                          value="false"
                          onChange={onChangeEducation}
                          checked
                        />
                        <label className="form-check-label" htmlFor="No">
                          No
                        </label>
                      </div>
                      <button
                        className="btn btn-lg btn-primary"
                        onClick={onSubmitEducation}
                        value={item._id}
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                )}
              </div>
            ))}
          </div>
          <h2>Work Details</h2>
          <Link to="/newwork">
            <button className="btn btn-lg btn-primary">Add</button>
          </Link>
          {work.map((item) => (
            <div className="card border-dark bg-light mb-3">
              <h4 className="item">Position: {item.position}</h4>
              <h4 className="item">Employer Name: {item.employerName}</h4>
              <h4 className="item">Start Date: {item.startDate}</h4>
              <h4 className="item">End Date: {item.endDate}</h4>
              {!item.currentJob ? null : <h4 className="item">Current Job</h4>}
              <button
                className="btn btn-primary"
                onClick={editWorkForm}
                value={item._id}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={deleteWork}
                value={item._id}
              >
                Delete
              </button>
              {!editWorkClicked ? null : (
                <div>
                  <form>
                    <input
                      placeholder={item.position}
                      onChange={onChangeWork}
                      name="position"
                      type="text"
                      className="form-control"
                      required
                    />
                    <input
                      placeholder={item.employerName}
                      onChange={onChangeWork}
                      name="employerName"
                      type="text"
                      className="form-control"
                      required
                    />
                    <input
                      placeholder={item.startDate}
                      onChange={onChangeWork}
                      name="startDate"
                      type="date"
                      className="form-control"
                      required
                    />
                    <input
                      placeholder={item.endDate}
                      onChange={onChangeWork}
                      name="endDate"
                      type="date"
                      className="form-control"
                      required
                    />
                    <label htmlFor="currentCollege" className="form-label">
                      Is this your current job:{" "}
                    </label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="currentJob"
                        id="Yes"
                        value="true"
                        onChange={onChangeWork}
                      />
                      <label className="form-check-label" htmlFor="Yes">
                        Yes
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="currentJob"
                        id="No"
                        value="false"
                        onChange={onChangeWork}
                        checked
                      />
                      <label className="form-check-label" htmlFor="No">
                        No
                      </label>
                    </div>
                    <button
                      className="btn btn-lg btn-primary"
                      onClick={onSubmitWork}
                      value={item._id}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              )}
            </div>
          ))}
          <button className="btn btn-danger btn-lg" onClick={deleteProfile}>
            Delete Profile
          </button>
          <button className="btn btn-lg btn-primary" onClick={editProfileForm}>
            Edit Profile
          </button>
          {message ? <Message message={message} /> : null}
        </div>
      )}
    </div>
  );
};

export default Profile;