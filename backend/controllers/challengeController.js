const Challenge = require("../models/challenge");

export const addNewChallengeQuestion = (req, res) => {
  const newChallenge = new Challenge(req.body);

  newChallenge.save((err, Challenge) => {
    if (err) {
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    }
    res.json({
      Challenge,
      message: {
        msgBody: "Challenge Details is added successfully",
        msgError: false,
      },
    });
  });
};

export const getChallengeQuestions = (req, res) => {
  Challenge.find({}, (err, Challenge) => {
    if (err)
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    res.json(Challenge);
  });
};

export const getChallengeQuestionwithID = (req, res) => {
  Challenge.findById(req.params.ChallengeId, (err, Challenge) => {
    if (err) {
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    }
    res.json(Challenge);
  });
};

export const getSingleChallengeQuestion = (req, res) => {
  Challenge.find({ question: req.query.question }, (err, Challenge) => {
    if (err) {
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    }
    res.json(Challenge);
  });
};

export const UpdateChallengeQuestion = (req, res) => {
  Challenge.findOneAndUpdate(
    { _id: req.params.ChallengeId },
    req.body,
    { new: true },
    (err, Challenge) => {
      if (err) {
        res.status(500).json({
          message: { msgBody: "Error has Occured", msgError: true },
        });
      }
      res.json(Challenge);
    }
  );
};

export const deleteChallengeQuestion = (req, res) => {
  Challenge.remove({ _id: req.params.ChallengeId }, (err, Challenge) => {
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
