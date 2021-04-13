import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './ChatFeed'
import './Chat.css'

const projectID = 'ba51f22d-370e-42e6-96d5-d2bcd3c3d3c5';

 const Messaging = () => {
  const { isAuthenticated, user, googleLogin } = useContext(AuthContext);
  if(!isAuthenticated){return(<Redirect to="/login" />)}

  return (
    <ChatEngine
      height="100vh"
      projectID={projectID}
      userName={user.username}
      userSecret="123123"
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      onNewMessage={() => new Audio('https://firebasestorage.googleapis.com/v0/b/myacademia-group-project.appspot.com/o/juntos-607.mp3?alt=media&token=a434fcc9-b49b-4b94-a6a3-e9a32157faf7').play()}
    />
  );
};

export default Messaging;