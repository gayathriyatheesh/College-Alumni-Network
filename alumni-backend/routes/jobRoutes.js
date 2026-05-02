const express = require("express");
const router = express.Router();
const { getJobs, getJobById, createJob, updateJob, deleteJob, applyJob, getMyJobs } = require("../controllers/jobController");
const { protect } = require("../middleware/auth");

router.get("/", protect, getJobs);
router.get("/my-posts", protect, getMyJobs);
router.get("/:id", protect, getJobById);
router.post("/", protect, createJob);
router.put("/:id", protect, updateJob);
router.delete("/:id", protect, deleteJob);
router.post("/:id/apply", protect, applyJob);

module.exports = router;
