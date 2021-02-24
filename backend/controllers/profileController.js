import mongoose from "mongoose";
const Profile = require("../models/profile");
const User = require("../models/user");

export const addNewProfile = (req, res) => {
  Profile.findOne({ username: req.body.username }, async (err, doc) => {
    if (err)
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    if (doc) {
      res.json({
        message: { msgBody: "Your Profile Already Exists", msgError: true },
      });
    }
    if (!doc) {
      const newProfile = new Profile(req.body);
      await newProfile.save();
      res.status(202).json({
        message: { msgBody: "Profile Successfully Created", msgError: false },
      });
    }
  });
};

export const getProfile = (req, res) => {
  Profile.findOne({ username: req.body.username }, async (err, doc) => {
    if (err)
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    if (doc) res.json(Profile);

    if (!doc) {
      res.json({
        message: { msgBody: "Please Create a Profile", msgError: true },
      });
    }
  });
};

export const getProfilewithID = (req, res) => {
  Profile.findById(req.params.ProfileId, (err, Profile) => {
    if (err) {
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    }
    res.json(Profile);
  });
};

export const getProfilewithUsername = (req, res) => {
  Profile.findOne({ username: req.query.username }, (err, Profile) => {
    if (err) {
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    }
    res.json(Profile);
  });
};

export const UpdateProfile = (req, res) => {
  Profile.findOneAndUpdate(
    { _id: req.params.ProfileId },
    req.body,
    { new: true },
    (err, Profile) => {
      if (err) {
        res.status(500).json({
          message: { msgBody: "Error has Occured", msgError: true },
        });
      }
      res.json(Profile);
    }
  );
};

export const RemoveFriend = (req, res) => {
  Profile.findOneAndUpdate(
    { _id: req.params.ProfileId },
    { $pull: { friends: req.query.friend } },
    { new: true },
    (err, Profile) => {
      if (err) {
        res.status(500).json({
          message: { msgBody: "Error has Occured", msgError: true },
        });
      }
      res.json(Profile);
    }
  );
};

export const deleteProfile = (req, res) => {
  Profile.remove({ _id: req.params.ProfileId }, (err, Profile) => {
    if (err) {
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    }
    res.json({
      message: {
        msgBody: "Your Profile is deleted successfully",
        msgError: false,
      },
    });
  });
};
