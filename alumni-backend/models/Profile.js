const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      maxlength: 500,
      default: "",
    },
    location: {
      type: String,
      trim: true,
      default: "",
    },
    currentCompany: {
      type: String,
      trim: true,
      default: "",
    },
    currentRole: {
      type: String,
      trim: true,
      default: "",
    },
    skills: [{ type: String, trim: true }],
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    website: { type: String, default: "" },
    experience: [
      {
        title: { type: String, required: true },
        company: { type: String, required: true },
        from: { type: Date, required: true },
        to: { type: Date },
        current: { type: Boolean, default: false },
        description: { type: String },
      },
    ],
    education: [
      {
        institution: { type: String, required: true },
        degree: { type: String, required: true },
        fieldOfStudy: { type: String },
        from: { type: Date, required: true },
        to: { type: Date },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
