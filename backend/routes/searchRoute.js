const express = require("express");
const {
  getProfilewithUsername,
  getProfilewithFirstName,
  getAllProfile,
  getProfileQuery,
  getProfileWithLocation,
} = require("../controllers/searchController");
const router = express.Router();

router.get("/search/profile", getProfilewithUsername);

router.get("/search/firstname", getProfilewithFirstName);

router.get("/search/location", getProfileWithLocation);

router.get("/search/all", getAllProfile);

router.get("/search/query", getProfileQuery);

module.exports = router;
