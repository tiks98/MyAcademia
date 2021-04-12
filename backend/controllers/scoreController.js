const Score = require("../models/score");

export const addNewScore = (req, res) => {
  const newScore = new Score(req.body);

  newScore.save((err, Score) => {
    if (err) {
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    }
    res.json({
      Score,
      message: {
        msgBody: "Score Details is added successfully",
        msgError: false,
      },
    });
  });
};

export const getAllScore = (req, res) => {
  Score.find({}, (err, Score) => {
    if (err)
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    res.json(Score);
  });
};

export const getScorewithID = (req, res) => {
  Score.findById(req.params.ScoreId, (err, Score) => {
    if (err) {
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    }
    res.json(Score);
  });
};

export const getScoreByUsername = (req, res) => {
  Score.find({ username: req.query.username }, (err, Score) => {
    if (err) {
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    }
    res.json(Score);
  });
};

export const getScoreByFullname = (req, res) => {
  Score.find({ fullname: req.query.fullname }, (err, Score) => {
    if (err) {
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    }
    res.json(Score);
  });
};

export const UpdateScore = (req, res) => {
  Score.findOneAndUpdate(
    { _id: req.params.ScoreId },
    req.body,
    { new: true },
    (err, Score) => {
      if (err) {
        res.status(500).json({
          message: { msgBody: "Error has Occured", msgError: true },
        });
      }
      res.json(Score);
    }
  );
};

export const deleteScore = (req, res) => {
  Score.remove({ _id: req.params.ScoreId }, (err, Score) => {
    if (err) {
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    }
    res.json({
      message: {
        msgBody: "Your Challenge Detail is deleted successfully",
        msgError: false,
      },
    });
  });
};
