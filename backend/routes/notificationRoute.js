const express = require("express");

const {
  addNotification,
  getNotificationFromUsername,
  getNotificationwithID,
  updateNotification,
  deleteNotification,
} = require("../controllers/notificationController");

const router = express.Router();

router.post("/addnotification", addNotification);

router.get("/getnotifications", getNotificationFromUsername);

router.get("/getnotifications/:NotificationId", getNotificationwithID);

router.put("/updatenotification/:NotificationId", updateNotification);

router.delete("/deletenotification/:NotificationId", deleteNotification);

module.exports = router;
