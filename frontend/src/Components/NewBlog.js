import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import {app} from '../base';
import Select from 'react-select'

function New(props) {
    const {isAuthenticated, user} = useContext(
        AuthContext
      );

    const options =[
      {label:"Connections", value:"connections"},
      {label:"Everyone", value:"everyone"}
    ]
  

    let file;
    let storageRef;
    let fileRef;
    let link = "";
    let fileType = "";
    let ext = "";

    const [inputs, setInputs] = useState({
        username: user.username,
        content : "",
        contentURL:"",
        file:""
    });
    const [redirect, setRedirect] = useState(false);

    const [s] = useState({
      option:options[0].value
    })

    const handleChange = (option) =>{
        s.option = option
        console.log(option);
    }
    

    const fileUpload = async () => {
      ext = file.name.split('.')[1];
      let x = Math.floor((Math.random() * 100000000000000) + 1).toString() + '.'+ ext;
      storageRef = app.storage().ref()
      fileRef = storageRef.child(x)
      fileRef.getDownloadURL().then(e => console.log(e.toString()))
      
      await fileRef.put(file).then(async () => {
        console.log('Completed')
    })

    return console.log('completed')
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        await fileUpload()

        await fileRef.getDownloadURL().then(e => link =  e.toString())

        if(ext == "mp4" || ext == "mov" || ext == "wmv" || ext == "flv" || ext == "avi" || ext == "avchd" || ext == "webm" ||ext == "mkv" || ext == "mp3"){
          fileType = "video";
        }else if(ext == "jpeg" || ext == "jpg"|| ext == "png" || ext == "gif" || ext =="tiff" || ext == "psd" || ext == "raw"){
          fileType = "image";
        }else if(ext == "pdf"){
          fileType = "pdf";
        }else{
          fileType = "url"
        }


        if(file)
        Axios({
            method: "POST",
            data: {
                username: inputs.username,
                content: inputs.content,
                contentURL: link,
                type: fileType,
                sharing: s.option.value
            },
            withCredentials: true,
            url: "http://localhost:4000/addblog",
          }).then((data) => console.log("Completed "  + data))
      };
  
    function handleInputChange(event) {
      event.persist();
  
      const { name, value } = event.target;
  
      setInputs(inputs => {
        inputs[name] = value;
        return inputs;
      });
  }

  function fileChange(e){
    file = e.target.files[0];
  }
  
    if (redirect) return <Redirect to="/index" />;
  
    return (
      <div className="container">
        {!isAuthenticated ? <Redirect to="/login" /> : null}
        <header>
          <h1>Want to add Something new {!user.username ? null : user.username}</h1>
        </header>
  
        <div>
          <form >
            <div className="form-group">
              <label>Blog Story</label>
              <textarea
                className="form-control"
                name="content"
                required="required"
                onChange={handleInputChange}
              />
              <input type="file" onChange={fileChange}/>
              
              <Select defaultValue={options[0]} onChange={handleChange} options={options}/>
            </div>
  
            <div className="form-group">
              <button className="btn btn-dark" type="submit" onClick={onSubmit} >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  export default New;