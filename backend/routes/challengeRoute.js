const Challenge = require("../models/challenge");
const express = require("express");
const {
  addNewChallengeQuestion,
  getChallengeQuestions,
  getChallengeQuestionwithID,
  getSingleChallengeQuestion,
  UpdateChallengeQuestion,
  deleteChallengeQuestion,
} = require("../controllers/challengeController");
const router = express.Router();

router.post("/newchallenge", addNewChallengeQuestion);

router.get("/getchallenge", getChallengeQuestions);

router.get("/challenge/:ChallengeId", getChallengeQuestionwithID);

router.get("/singlequestion", getSingleChallengeQuestion);

router.put("/challenge/:ChallengeId", UpdateChallengeQuestion);

router.delete("/challenge/:ChallengeId", deleteChallengeQuestion);

module.exports = router;
