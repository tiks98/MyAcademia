const Profile = require("../models/profile");
const User = require("../models/user");
const express = require("express");
const {
  addNewProfile,
  getProfile,
  getProfilewithID,
  UpdateProfile,
  deleteProfile,
  getProfilewithUsername,
  RemoveFriend,
  AddFriendInProfile,
  AddNotification,
  RemoveNotification,
  GetNotificationfromProfile,
  GetNotificationfromProfileUsername,
  RemoveAllNotificationInProfile,
  EditNotification,
} = require("../controllers/profileController");
const router = express.Router();

router.post("/newprofile", addNewProfile);

router.get("/getprofile", getProfile);

router.get("/profile/:ProfileId", getProfilewithID);

router.get("/profile", getProfilewithUsername);

router.put("/profile/:ProfileId", UpdateProfile);

router.put("/addfprofile/:ProfileId", AddFriendInProfile);

router.put("/rffprofile/:ProfileId", RemoveFriend);

router.get("/getnotificationsprofile", GetNotificationfromProfileUsername);

router.get("/getnotificationsprofile/:ProfileId", GetNotificationfromProfile);

router.put("/addnotification/:ProfileId", AddNotification);

router.put("/editnotification/:ProfileId", EditNotification);

router.put("/removenotification/:ProfileId", RemoveNotification);

router.put(
  "/removeallnotifications/:ProfileId",
  RemoveAllNotificationInProfile
);

router.delete("/profile/:ProfileId", deleteProfile);

module.exports = router;
