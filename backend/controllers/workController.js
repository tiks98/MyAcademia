const Work = require("../models/work");
const User = require("../models/user");

export const addNewWork = (req, res) => {
  const newWork = new Work(req.body);

  newWork.save((err, Work) => {
    if (err) {
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    }
    res.json({
      Work,
      message: {
        msgBody: "Your Work Details added successfully",
        msgError: false,
      },
    });
  });
};

export const getWork = (req, res) => {
  Work.findOne({ username: req.body.username }, async (err, doc) => {
    if (err)
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    if (doc) res.json(Work);

    if (!doc) {
      res.json({
        message: { msgBody: "Please Enter Your Work Details", msgError: true },
      });
    }
  });
};

export const getWorkwithID = (req, res) => {
  Work.findById(req.params.WorkId, (err, Work) => {
    if (err) {
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    }
    res.json(Work);
  });
};

export const getWorkwithUsername = (req, res) => {
  Work.find({ username: req.query.username }, (err, Work) => {
    if (err) {
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    }
    res.json(Work);
  });
};

export const UpdateWork = (req, res) => {
  Work.findOneAndUpdate(
    { _id: req.params.WorkId },
    req.body,
    { new: true },
    (err, Work) => {
      if (err) {
        res.status(500).json({
          message: { msgBody: "Error has Occured", msgError: true },
        });
      }
      res.json(Work);
    }
  );
};

export const deleteWork = (req, res) => {
  Work.remove({ _id: req.params.WorkId }, (err, Work) => {
    if (err) {
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    }
    res.json({
      message: {
        msgBody: "Your Work Detail is deleted successfully",
        msgError: false,
      },
    });
  });
};
