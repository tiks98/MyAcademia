const Education = require("../models/education");
const User = require("../models/user");
const express = require("express");
const {
  addNewEducation,
  getEducation,
  getEducationwithID,
  UpdateEducation,
  deleteEducation,
  getEducationwithUsername,
} = require("../controllers/educationController");
const router = express.Router();

router.post("/neweducation", addNewEducation);

router.get("/geteducation", getEducation);

router.get("/education/:EducationId", getEducationwithID);

router.get("/education", getEducationwithUsername);

router.put("/education/:EducationId", UpdateEducation);

router.delete("/education/:EducationId", deleteEducation);

module.exports = router;
