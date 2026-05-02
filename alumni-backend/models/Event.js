const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    date: {
      type: Date,
      required: [true, "Event date is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    mode: {
      type: String,
      enum: ["online", "offline", "hybrid"],
      default: "offline",
    },
    meetLink: {
      type: String,
      default: "",
    },
    banner: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      enum: ["reunion", "seminar", "workshop", "networking", "other"],
      default: "other",
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rsvps: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        status: { type: String, enum: ["going", "interested", "not_going"], default: "going" },
        rsvpAt: { type: Date, default: Date.now },
      },
    ],
    maxAttendees: {
      type: Number,
      default: null,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
