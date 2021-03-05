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
} = require("../controllers/profileController");
const router = express.Router();

router.post("/newprofile", addNewProfile);

router.get("/getprofile", getProfile);

router.get("/profile/:ProfileId", getProfilewithID);

router.get("/profile", getProfilewithUsername);

router.put("/profile/:ProfileId", UpdateProfile);

router.put("/addfprofile/:ProfileId", AddFriendInProfile);

router.put("/rffprofile/:ProfileId", RemoveFriend);

router.delete("/profile/:ProfileId", deleteProfile);

module.exports = router;
