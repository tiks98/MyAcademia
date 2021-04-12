const Score = require("../models/challenge");
const express = require("express");
const {
  addNewScore,
  getAllScore,
  getScorewithID,
  getScoreByUsername,
  UpdateScore,
  deleteScore,
  getScoreByFullname,
} = require("../controllers/scoreController");
const router = express.Router();

router.post("/newscore", addNewScore);

router.get("/getscore", getAllScore);

router.get("/score/:ScoreId", getScorewithID);

router.get("/score", getScoreByUsername);

router.get("/scorebyfullname", getScoreByFullname);

router.put("/score/:ScoreId", UpdateScore);

router.delete("/score/:ScoreId", deleteScore);

module.exports = router;
