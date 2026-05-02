const express = require("express");
const router = express.Router();
const { getMyProfile, updateMyProfile, getAllProfiles, getProfileById } = require("../controllers/profileController");
const { protect } = require("../middleware/auth");

router.get("/", protect, getAllProfiles);
router.get("/me", protect, getMyProfile);
router.put("/me", protect, updateMyProfile);
router.get("/:userId", protect, getProfileById);

module.exports = router;
