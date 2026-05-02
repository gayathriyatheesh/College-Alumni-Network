const Event = require("../models/Event");

// @desc    Get all events
// @route   GET /api/events
// @access  Private
const getEvents = async (req, res, next) => {
  try {
    const { category, mode, upcoming, page = 1, limit = 10 } = req.query;

    let query = { isPublished: true };
    if (category) query.category = category;
    if (mode) query.mode = mode;
    if (upcoming === "true") query.date = { $gte: new Date() };

    const total = await Event.countDocuments(query);
    const events = await Event.find(query)
      .populate("organizer", "name avatar")
      .select("-rsvps")
      .sort({ date: 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ success: true, count: events.length, total, pages: Math.ceil(total / limit), currentPage: Number(page), events });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Private
const getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("organizer", "name avatar email")
      .populate("rsvps.user", "name avatar");

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    res.json({ success: true, event });
  } catch (error) {
    next(error);
  }
};

// @desc    Create event
// @route   POST /api/events
// @access  Private
const createEvent = async (req, res, next) => {
  try {
    const event = await Event.create({ ...req.body, organizer: req.user._id });
    res.status(201).json({ success: true, event });
  } catch (error) {
    next(error);
  }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private (organizer only)
const updateEvent = async (req, res, next) => {
  try {
    let event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ success: false, message: "Event not found" });

    if (event.organizer.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not authorized to update this event" });
    }

    event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, event });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private (organizer only)
const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ success: false, message: "Event not found" });

    if (event.organizer.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not authorized to delete this event" });
    }

    await event.deleteOne();
    res.json({ success: true, message: "Event removed" });
  } catch (error) {
    next(error);
  }
};

// @desc    RSVP to event
// @route   POST /api/events/:id/rsvp
// @access  Private
const rsvpEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: "Event not found" });

    const { status = "going" } = req.body;

    const existingRsvp = event.rsvps.find((r) => r.user.toString() === req.user._id.toString());

    if (existingRsvp) {
      existingRsvp.status = status;
    } else {
      if (event.maxAttendees && event.rsvps.filter((r) => r.status === "going").length >= event.maxAttendees) {
        return res.status(400).json({ success: false, message: "Event is full" });
      }
      event.rsvps.push({ user: req.user._id, status });
    }

    await event.save();
    res.json({ success: true, message: `RSVP updated to: ${status}`, rsvpCount: event.rsvps.length });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel RSVP
// @route   DELETE /api/events/:id/rsvp
// @access  Private
const cancelRsvp = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: "Event not found" });

    event.rsvps = event.rsvps.filter((r) => r.user.toString() !== req.user._id.toString());
    await event.save();

    res.json({ success: true, message: "RSVP cancelled" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getEvents, getEventById, createEvent, updateEvent, deleteEvent, rsvpEvent, cancelRsvp };
