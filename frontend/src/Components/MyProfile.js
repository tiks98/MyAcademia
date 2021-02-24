import React, { useContext, useEffect, useRef, useState } from "react";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Message from "./Message";
import defaultProfilePhoto from "../Images/default_profile_picture.png";
import Profile from "./Profile";
import AuthService from "../Services/AuthService";

const MyProfile = (props) => {
  const { isAuthenticated, user, googleLogin, myprofileId } = useContext(
    AuthContext
  );
  const authContext = useContext(AuthContext);
  const [haveProfile, setHaveProfile] = useState(false);
  // const [myprofileId, setMyProfileId] = useState(null);
  const [editEducationClicked, setEditEducationClicked] = useState(false);
  const [editWorkClicked, setEditWorkClicked] = useState(false);
  const [editProfileClicked, setEditProfileClicked] = useState(false);
  const [message, setMessage] = useState(null);
  const [profile, setProfile] = useState({
    id: "",
    photoUrl: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    collegeName: "",
    location: "",
    IQ: 0,
    about: "",
    isFaculty: false,
    friends: [],
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
          photoUrl: data.data.photoUrl,
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          username: data.data.username,
          email: data.data.email,
          collegeName: data.data.collegeName,
          location: data.data.location,
          IQ: data.data.IQ,
          about: data.data.about,
          isFaculty: data.data.isFaculty,
          friends: data.data.friends,
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
    console.log(profile.isFaculty);
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
    const educationId = e.target.value;
    const url = "http://localhost:4000/education/";
    const dynamicUrl = url + educationId;
    console.log(educationId);
    console.log(dynamicUrl);
    Axios({
      method: "GET",
      url: dynamicUrl,
    }).then((data) => {
      console.log(data);
      if (data.data === null) {
        console.log("No Education Details found");
      } else {
        setEditEducation({
          ...editEducation,
          _id: data.data._id,
          collegeName: data.data.collegeName,
          collegeLocation: data.data.collegeLocation,
          courseName: data.data.courseName,
          username: data.data.username,
          graduationDate: data.data.graduationDate,
          currentCollege: data.data.currentCollege,
        });
      }
    });
  };

  const editWorkForm = (e) => {
    setEditWorkClicked(true);
    console.log("running work edit form");
    const workId = e.target.value;
    const url = "http://localhost:4000/work/";
    const dynamicUrl = url + workId;
    console.log(workId);
    console.log(dynamicUrl);
    Axios({
      method: "GET",
      url: dynamicUrl,
    }).then((data) => {
      console.log(data);
      if (data.data === null) {
        console.log("No Work Details found");
      } else {
        setEditWork({
          ...editWork,
          _id: data.data._id,
          position: data.data.position,
          employerName: data.data.employerName,
          startDate: data.data.startDate,
          endDate: data.data.endDate,
          username: data.data.username,
          currentJob: data.data.currentJob,
        });
      }
    });
  };

  const editProfileForm = (e) => {
    setEditProfileClicked(true);
    console.log("running edit profile form");
  };

  const onSubmitEducation = (e) => {
    const educationId = editEducation._id;
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
    reloadPage();
  };

  const onSubmitWork = (e) => {
    const workId = editWork._id;
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
        photoUrl: profile.photoUrl,
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
          {!profile.photoUrl ? (
            <img
              src={defaultProfilePhoto}
              alt="defaultProfilePhoto"
              style={{ width: "200px", height: "200px" }}
            ></img>
          ) : (
            <img
              src={profile.photoUrl}
              style={{ width: "200px", height: "200px" }}
              alt="profilePhoto"
            ></img>
          )}
          <h2>{!user.username ? null : <h2>Username: {user.username}</h2>}</h2>
          <h5>First Name: {profile.firstName}</h5>
          <h5>Last Name: {profile.lastName}</h5>
          <h5>Email: {profile.email}</h5>
          <h5>College Name: {profile.collegeName}</h5>
          <h5>Location: {profile.location}</h5>
          <h5>IQ: {profile.IQ}</h5>
          <h5>About Me: {profile.about}</h5>
          {!profile.isFaculty ? <h3>Student</h3> : <h3>Education Faculty</h3>}
          <h4>Friends List:</h4>
          {profile.friends.length === 0 ? null : (
            <div>
              {profile.friends.map((friend) => (
                <div>
                  <h5>Friend's Username: {friend}</h5>
                </div>
              ))}
            </div>
          )}
          <button className="btn btn-danger btn-lg" onClick={deleteProfile}>
            Delete Profile
          </button>
          <Link to="#profileForm">
            <button
              className="btn btn-lg btn-primary"
              onClick={editProfileForm}
            >
              <a href="#profileForm"></a>
              Edit Profile
            </button>
          </Link>
          <div id="profileForm">
            {!editProfileClicked ? null : (
              <div>
                <form onSubmit={onSubmitProfile}>
                  <h1>Edit Your Profile</h1>
                  <div className="mb-3">
                    <label htmlFor="photoUrl" className="form-label">
                      Profile Photo:{" "}
                    </label>
                    <input
                      placeholder="Please Enter a URL"
                      onChange={onChangeProfile}
                      name="photoUrl"
                      type="url"
                      className="form-control"
                      value={profile.photoUrl}
                    />
                  </div>
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
                        onClick={onChangeProfile}
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
                        onClick={onChangeProfile}
                        onChange={onChangeProfile}
                      />
                      <label className="form-check-label" htmlFor="No">
                        No
                      </label>
                    </div>
                  </div>
                  <button className="btn btn-lg btn-primary btn-block">
                    Submit
                  </button>
                  <button className="btn btn-lg btn-secondary btn-block">
                    Cancel
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
                  Graduation Date: {item.graduationDate.slice(0, 10)}
                </h4>
                {!item.currentCollege ? null : (
                  <h4 className="item" value={item.currentCollege}>
                    Current College
                  </h4>
                )}
                <button
                  className="btn btn-primary"
                  onClick={editEducationForm}
                  href="#educationForm"
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
              </div>
            ))}
            {!editEducationClicked ? null : (
              <div id="educationForm">
                <form onSubmit={onSubmitEducation}>
                  <h2>Edit Education Details</h2>
                  <input
                    placeholder={editEducation.collegeName}
                    onChange={onChangeEducation}
                    name="collegeName"
                    type="text"
                    className="form-control"
                    value={editEducation.collegeName}
                    required
                  />
                  <input
                    placeholder={editEducation.collegeLocation}
                    onChange={onChangeEducation}
                    name="collegeLocation"
                    type="text"
                    className="form-control"
                    value={editEducation.collegeLocation}
                    required
                  />
                  <input
                    placeholder={editEducation.courseName}
                    onChange={onChangeEducation}
                    name="courseName"
                    type="text"
                    className="form-control"
                    value={editEducation.courseName}
                    required
                  />
                  <input
                    placeholder={editEducation.graduationDate.slice(0, 10)}
                    onChange={onChangeEducation}
                    name="graduationDate"
                    type="date"
                    className="form-control"
                    value={editEducation.graduationDate.slice(0, 10)}
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
                      onClick={onChangeEducation}
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
                      onClick={onChangeEducation}
                    />
                    <label className="form-check-label" htmlFor="No">
                      No
                    </label>
                  </div>
                  <button className="btn btn-lg btn-primary">Submit</button>
                  <button className="btn btn-lg btn-secondary">Cancel</button>
                </form>
              </div>
            )}
          </div>
          <h2>Work Details</h2>
          <Link to="/newwork">
            <button className="btn btn-lg btn-primary">Add</button>
          </Link>
          {work.map((item) => (
            <div className="card border-dark bg-light mb-3">
              <h4 className="item">Position: {item.position}</h4>
              <h4 className="item">Employer Name: {item.employerName}</h4>
              <h4 className="item">
                Start Date: {item.startDate.slice(0, 10)}
              </h4>
              {!item.endDate ? null : (
                <h4 className="item">End Date: {item.endDate.slice(0, 10)}</h4>
              )}

              {!item.currentJob ? null : <h4 className="item">Current Job</h4>}
              <button
                className="btn btn-primary"
                onClick={editWorkForm}
                href="#workForm"
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
            </div>
          ))}
          {!editWorkClicked ? null : (
            <div id="workForm">
              <form onSubmit={onSubmitWork}>
                <h2>Edit Work Details</h2>
                <input
                  placeholder={editWork.position}
                  onChange={onChangeWork}
                  name="position"
                  type="text"
                  className="form-control"
                  value={editWork.position}
                  required
                />
                <input
                  placeholder={editWork.employerName}
                  onChange={onChangeWork}
                  name="employerName"
                  type="text"
                  className="form-control"
                  value={editWork.employerName}
                  required
                />
                <input
                  placeholder={editWork.startDate.slice(0, 10)}
                  onChange={onChangeWork}
                  name="startDate"
                  type="date"
                  className="form-control"
                  value={editWork.startDate.slice(0, 10)}
                  required
                />
                <input
                  placeholder={editWork.endDate.slice(0, 10)}
                  onChange={onChangeWork}
                  name="endDate"
                  type="date"
                  className="form-control"
                  value={editWork.endDate.slice(0, 10)}
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
                    onClick={onChangeWork}
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
                    onClick={onChangeWork}
                  />
                  <label className="form-check-label" htmlFor="No">
                    No
                  </label>
                </div>
                <button className="btn btn-lg btn-primary">Submit</button>
                <button className="btn btn-lg btn-secondary">Cancel</button>
              </form>
            </div>
          )}
          {message ? <Message message={message} /> : null}
        </div>
      )}
    </div>
  );
};

export default MyProfile;
