const Profile = require("../models/profile");

export const getProfilewithUsername = (req, res) => {
  Profile.find({ username: req.query.username }, (err, Profile) => {
    if (err) {
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    }
    res.json(Profile);
  });
};

export const getProfilewithFirstName = (req, res) => {
  Profile.find(
    { firstName: new RegExp(req.query.firstName, "i") },
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

export const getProfileWithLocation = (req, res) => {
  Profile.find(
    { location: new RegExp(req.query.location, "i") },
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

export const getAllProfile = (req, res) => {
  Profile.find({}, (err, Profile) => {
    if (err) {
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    }
    res.json(Profile);
  });
};

export const getProfileQuery = (req, res) => {
  Profile.find(req.body, (err, Profile) => {
    if (err) {
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    }
    res.json(Profile);
  });
};
