// import React from "react";

// const getStyle = (props) => {
//   let baseClass = "alert ";
//   if (props.message.msgError) baseClass = baseClass + "alert-danger";
//   else baseClass = baseClass + "alert-primary";
//   return baseClass + " text-center";
// };

// const Message = (props) => {
//   return (
//     <div className={getStyle(props)} role="alert">
//       {props.message.msgBody}
//     </div>
//   );
// };


import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './ChatFeed'

const projectID = 'ba51f22d-370e-42e6-96d5-d2bcd3c3d3c5';

const Message = (props) => {
  const { isAuthenticated, user, googleLogin } = useContext(AuthContext);
  return (
    <div>
    {!isAuthenticated ? <Redirect to="/login" /> : null}
    <ChatEngine
      height="100vh"
      projectID={projectID}
      userName={user.userName}
      userSecret="123123"
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
    />
    </div>
  );
};

export default Message;