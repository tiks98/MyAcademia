import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";


const Home = (props) => {
  const { isAuthenticated, user, googleLogin, myprofileId } = useContext(
    AuthContext
  );
  const authContext = useContext(AuthContext);
  const [i, SetI] = useState(false);
  const [blogs, setBlogs] = useState([])
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
          friends: data.data.friends
        });
      }
    });
  }, []);

  const getMyProfile = () => {
    if (i === false) {
      authContext.setMyProfileId(profile.id);
      console.log(myprofileId);
      console.log("Profile ID");
      // console.log(myprofileId);
      SetI(true);
    }
  };

  useEffect(() => {
    Axios.get("http://localhost:4000/getblog")
      .then(result => setBlogs(result.data))
      .catch(err => console.error(err));
  }, []);

  const blogCreation = (e) => {
    if(e.type == "video"){
      return(
        <iframe width="420" height="315"
        src={e.contentURL}>
        </iframe>
      )
    }else if(e.type =="image"){
      return(
        <img src = {e.contentURL} width="420" height="315"/>
      )
    }else if(e.type = "pdf"){
      return(
        <embed src={e.contentURL} />
      )
    }else {
      return(
        <link href={e.contentURL} width  />
        )
    }
  }

  const Post = (blog, key) => {

    if(blog.username == profile.username){
      return(        
        <div className = "blogArea" key={key}>
          <div>{blog.username}</div>
          <div>{blog.postdate}</div>
          <div>{blog.content}</div>
        {blogCreation(blog)}
      </div>)
    }

    if(blog.sharing == "connections"){
      console.log(profile.friends);
      if(profile.friends.find((e) => {return e==blog.username}) != undefined){
        return(        
          <div className = "blogArea" key={key}>
            <div>{blog.username}</div>
            <div>{blog.postdate}</div>
            <div>{blog.content}</div>
          {blogCreation(blog)}
        </div>)
      }
    }else{
      return(        
      <div className = "blogArea" key={key}>
        <div>{blog.username}</div>
        <div>{blog.postdate}</div>
        <div>{blog.content}</div>
      {blogCreation(blog)}
    </div>)
  }
  }

  return (
    <div>
      {!isAuthenticated ? <Redirect to="/login" /> : null}
      <h1>Welcome Back</h1>
      <h2>{!user.username ? null : user.username}</h2>
      {/* <h2>{!profile.id ? null : profile.id}</h2> */}
      {/* {profile} */}
      {/* <h2>{!myprofileId ? null : myprofileId}</h2> */}
      {!profile.id ? null : getMyProfile()}
      {/* {getMyProfile()} */}
      <h2>{myprofileId}</h2>
      <Link className="Links" to={`/newblog`}>Add New Blog</Link>
      {blogs.map((blog, key) => ( 
        Post(blog, key)
))}
    </div>
  );
};

export default Home;
