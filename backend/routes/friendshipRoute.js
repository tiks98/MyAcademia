const express = require("express");

const {
  addFriend,
  getFriendsfromRequester,
  getFriendsfromRecipient,
  getFriendshipwithID,
  updateRequest,
  deleteRequest,
  getFriendsStatus,
} = require("../controllers/friendshipController");

const router = express.Router();

router.post("/sendfriendrequest", addFriend);

router.get("/getfriends/requester", getFriendsfromRequester);

router.get("/getfriends/status", getFriendsStatus);

router.get("/getfriends/recipient", getFriendsfromRecipient);

router.get("/getfriends/:FriendshipId", getFriendshipwithID);

router.put("/updaterequest/:FriendshipId", updateRequest);

router.delete("/deleterequest/:FriendshipId", deleteRequest);

module.exports = router;
