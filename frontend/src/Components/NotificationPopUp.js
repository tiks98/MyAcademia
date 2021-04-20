import React from "react";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import "animate.css/animate.css";

const Noti = (props) => {
  store.addNotification({
    title: props.notificationPopUp.title,
    message: `${props.notificationPopUp.message}.`,
    type: `${props.notificationPopUp.type}`,
    insert: "top",
    container: "top-right",
    animationIn: ["animated fadeIn"],
    animationOut: ["animated fadeOut"],
    dismiss: {
      duration: 3000,
      showIcon: true,
    },
    width: 600,
  });
};

const NotificationPopUp = (props) => {
  return <div>{props.notificationPopUp === null ? null : Noti(props)}</div>;
};

export default NotificationPopUp;
