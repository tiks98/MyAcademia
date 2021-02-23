const Friendship = require("../models/friendship");

export const addFriend = (req, res) => {
  Friendship.findOne({ recipient: req.body.recipient }, async (err, doc) => {
    if (err)
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    if (doc) {
      res.json({
        message: { msgBody: "You are already Friends", msgError: true },
      });
    }
    if (!doc) {
      const newFriendship = new Friendship(req.body);
      await newFriendship.save();
      res.status(202).json({
        message: {
          msgBody: "Friend Request Successfully Sent",
          msgError: false,
        },
      });
    }
  });
};

export const getFriendsfromRequester = (req, res) => {
  Friendship.find({ requester: req.query.requester }, (err, Friendship) => {
    if (err) {
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    }
    res.json(Friendship);
  });
};

export const getFriendsStatus = (req, res) => {
  Friendship.find(
    { requester: req.query.requester, recipient: req.query.recipient },
    (err, Friendship) => {
      if (err) {
        res.status(500).json({
          message: { msgBody: "Error has Occured", msgError: true },
        });
      }
      res.json(Friendship);
    }
  );
};

export const getFriendsfromRecipient = (req, res) => {
  Friendship.find({ recipient: req.query.recipient }, (err, Friendship) => {
    if (err) {
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    }
    res.json(Friendship);
  });
};

export const getFriendshipwithID = (req, res) => {
  Friendship.findById(req.params.FriendshipId, (err, Friendship) => {
    if (err) {
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    }
    res.json(Friendship);
  });
};

export const updateRequest = (req, res) => {
  Friendship.findOneAndUpdate(
    { _id: req.params.FriendshipId },
    req.body,
    (err, Friendship) => {
      if (err) {
        res.status(500).json({
          message: { msgBody: "Error has Occured", msgError: true },
        });
      }
      res.json(Friendship);
    }
  );
};

export const deleteRequest = (req, res) => {
  Friendship.remove({ _id: req.params.FriendshipId }, (err, Friendship) => {
    if (err) {
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    }
    res.json({
      message: {
        msgBody: "Friend Request deleted successfully",
        msgError: false,
      },
    });
  });
};
