const Education = require("../models/education");
const Work = require("../models/work");
const User = require("../models/user");
const express = require("express");
const {
  addNewWork,
  getWork,
  getWorkwithID,
  UpdateWork,
  deleteWork,
  getWorkwithUsername,
} = require("../controllers/workController");
const router = express.Router();

router.post("/newwork", addNewWork);

router.get("/getwork", getWork);

router.get("/work/:WorkId", getWorkwithID);

router.get("/work", getWorkwithUsername);

router.put("/work/:WorkId", UpdateWork);

router.delete("/work/:WorkId", deleteWork);

module.exports = router;
