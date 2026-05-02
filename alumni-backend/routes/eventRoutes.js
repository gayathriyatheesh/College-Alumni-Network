const express = require("express");
const router = express.Router();
const { getEvents, getEventById, createEvent, updateEvent, deleteEvent, rsvpEvent, cancelRsvp } = require("../controllers/eventController");
const { protect } = require("../middleware/auth");

router.get("/", protect, getEvents);
router.get("/:id", protect, getEventById);
router.post("/", protect, createEvent);
router.put("/:id", protect, updateEvent);
router.delete("/:id", protect, deleteEvent);
router.post("/:id/rsvp", protect, rsvpEvent);
router.delete("/:id/rsvp", protect, cancelRsvp);

module.exports = router;
