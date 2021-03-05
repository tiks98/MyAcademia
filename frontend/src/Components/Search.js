import React, { useContext, useState } from "react";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Message from "./Message";
import Profile from "./Profile";
import defaultProfilePhoto from "../Images/default_profile_picture.png";

const Search = (props) => {
  const { isAuthenticated, user, googleLogin } = useContext(AuthContext);
  const [Query, setQuery] = useState(null);
  const [location, setLocation] = useState(false);
  const [firstName, setFirstName] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profiles, setProfiles] = useState([]);
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
  });

  const onChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const locationSelected = (e) => {
    e.preventDefault();
    setLocation(true);
    setFirstName(false);
    console.log("Location Selected");
  };

  const firstNameSelected = (e) => {
    e.preventDefault();
    setFirstName(true);
    setLocation(false);
    console.log("First Name Selected");
  };

  const getAllProfile = () => {
    Axios({
      method: "GET",
      url: "http://localhost:4000/search/all",
    }).then((data) => {
      if (data.data === null) {
        console.log("No data found");
      } else {
        const item = [data.data];
        setProfiles(item[0]);
        console.log(profiles[0]);
      }
    });
  };

  const goToProfile = (e) => {
    console.log("goto profile clicked");
    const profileId = e.target.value;
    console.log(profileId);
    const url = "http://localhost:3000/profile/";
    const dynamicUrl = url + profileId;
    console.log(dynamicUrl);
    const gotourl = dynamicUrl.slice(21);
    props.history.push(gotourl);
  };

  const getProfile = (e) => {
    e.preventDefault();
    const query = Query;
    const url = "http://localhost:4000/search/profile";
    const dynamicUrl = url;
    console.log();
    Axios({
      method: "GET",
      params: {
        username: query,
      },
      url: dynamicUrl,
    }).then((data) => {
      console.log(data);
      if (data.data === null) {
        console.log("No data found");
      } else {
        const item = data.data;
        setProfile(item[0]);
        console.log(item[0]);
      }
    });
  };

  const searchQuery = (e) => {
    if (location === true) {
      e.preventDefault();
      const query = Query;
      console.log(query);
      const url = "http://localhost:4000/search/location";
      const dynamicUrl = url;
      console.log();
      Axios({
        method: "GET",
        params: {
          location: e.target.value,
        },
        url: dynamicUrl,
      }).then((data) => {
        console.log(data);
        if (data.data === null) {
          console.log("No data found");
        } else {
          const item = [data.data];
          setProfiles(item[0]);
          console.log(profiles);
        }
      });
    } else {
      e.preventDefault();
      const query = Query;
      console.log(query);
      const url = "http://localhost:4000/search/firstName";
      const dynamicUrl = url;
      console.log();
      Axios({
        method: "GET",
        params: {
          firstName: e.target.value,
        },
        url: dynamicUrl,
      }).then((data) => {
        console.log(data);
        if (data.data === null) {
          console.log("No data found");
        } else {
          const item = [data.data];
          setProfiles(item[0]);
          console.log(profiles);
        }
      });
    }
  };

  return (
    <div>
      {!isAuthenticated ? <Redirect to="/login" /> : null}
      <div>
        <h1>Search for anything</h1>
      </div>
      <div>
        <form className="d-flex" onSubmit={searchQuery}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={searchQuery}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>
      <div>
        {!location ? (
          <div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                onSelect={locationSelected}
                onChange={locationSelected}
              />
              <label className="form-check-label" for="flexRadioDefault1">
                Location
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                onSelect={firstNameSelected}
                onChange={firstNameSelected}
                checked
              />
              <label className="form-check-label" for="flexRadioDefault2">
                First Name
              </label>
            </div>
          </div>
        ) : (
          <div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                onSelect={locationSelected}
                onChange={locationSelected}
                checked
              />
              <label className="form-check-label" for="flexRadioDefault1">
                Location
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                onSelect={firstNameSelected}
                onChange={firstNameSelected}
              />
              <label className="form-check-label" for="flexRadioDefault2">
                First Name
              </label>
            </div>
          </div>
        )}
      </div>
      <div>
        <button className="btn btn-primary" onClick={getAllProfile}>
          See All Profiles
        </button>
      </div>
      <div>
        {profiles.map((item) => (
          <div className="card border-dark bg-light mb-3" key={item._id}>
            {!item.photoUrl ? (
              <img
                src={defaultProfilePhoto}
                alt="defaultProfilePhoto"
                style={{ width: "100px", height: "100px" }}
              ></img>
            ) : (
              <img
                src={item.photoUrl}
                style={{ width: "100px", height: "100px" }}
                alt="profilePhoto"
              ></img>
            )}
            <h4 className="item" onClick={goToProfile} value={item._id}>
              Name: {item.firstName} {item.lastName}
            </h4>
            <h5 className="item">College Name: {item.collegeName}</h5>
            <h5 className="item">Location: {item.location}</h5>
            <button
              className="btn btn-primary"
              onClick={goToProfile}
              value={item._id}
            >
              Go to Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
