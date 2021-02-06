const Education = require("../models/education");
const User = require("../models/user");

export const addNewEducation = (req, res) => {
  const newEducation = new Education(req.body);

  newEducation.save((err, Education) => {
    if (err) {
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    }
    res.json({
      Education,
      message: {
        msgBody: "Education Details is added successfully",
        msgError: false,
      },
    });
  });
};

export const getEducation = (req, res) => {
  Education.findOne({ username: req.body.username }, async (err, doc) => {
    if (err)
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    if (doc) res.json(Education);

    if (!doc) {
      res.json({
        message: {
          msgBody: "Please Enter Your Education Details",
          msgError: true,
        },
      });
    }
  });
};

export const getEducationwithID = (req, res) => {
  Education.findById(req.params.EducationId, (err, Education) => {
    if (err) {
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    }
    res.json(Education);
  });
};

export const getEducationwithUsername = (req, res) => {
  Education.find({ username: req.query.username }, (err, Education) => {
    if (err) {
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    }
    res.json(Education);
  });
};

export const UpdateEducation = (req, res) => {
  Education.findOneAndUpdate(
    { _id: req.params.EducationId },
    req.body,
    { new: true },
    (err, Education) => {
      if (err) {
        res.status(500).json({
          message: { msgBody: "Error has Occured", msgError: true },
        });
      }
      res.json(Education);
    }
  );
};

export const deleteEducation = (req, res) => {
  Education.remove({ _id: req.params.EducationId }, (err, Education) => {
    if (err) {
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    }
    res.json({
      message: {
        msgBody: "Your Education Detail is deleted successfully",
        msgError: false,
      },
    });
  });
};
