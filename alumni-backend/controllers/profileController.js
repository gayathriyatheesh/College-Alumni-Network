const Profile = require("../models/Profile");
const User = require("../models/User");

// @desc    Get current user profile
// @route   GET /api/profile/me
// @access  Private
const getMyProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id }).populate("user", "name email avatar role graduationYear department");

    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    res.json({ success: true, profile });
  } catch (error) {
    next(error);
  }
};

// @desc    Update current user profile
// @route   PUT /api/profile/me
// @access  Private
const updateMyProfile = async (req, res, next) => {
  try {
    const { bio, location, currentCompany, currentRole, skills, linkedin, github, website, experience, education } = req.body;

    const profileFields = {};
    if (bio !== undefined) profileFields.bio = bio;
    if (location !== undefined) profileFields.location = location;
    if (currentCompany !== undefined) profileFields.currentCompany = currentCompany;
    if (currentRole !== undefined) profileFields.currentRole = currentRole;
    if (skills !== undefined) profileFields.skills = Array.isArray(skills) ? skills : skills.split(",").map((s) => s.trim());
    if (linkedin !== undefined) profileFields.linkedin = linkedin;
    if (github !== undefined) profileFields.github = github;
    if (website !== undefined) profileFields.website = website;
    if (experience !== undefined) profileFields.experience = experience;
    if (education !== undefined) profileFields.education = education;

    const profile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      { $set: profileFields },
      { new: true, upsert: true, runValidators: true }
    ).populate("user", "name email avatar role graduationYear department");

    res.json({ success: true, profile });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all alumni profiles (with search/filter)
// @route   GET /api/profile
// @access  Private
const getAllProfiles = async (req, res, next) => {
  try {
    const { search, department, graduationYear, skills, page = 1, limit = 12 } = req.query;

    let userQuery = { role: { $in: ["alumni", "student"] } };
    if (department) userQuery.department = { $regex: department, $options: "i" };
    if (graduationYear) userQuery.graduationYear = graduationYear;

    const matchingUsers = await User.find(userQuery).select("_id");
    const userIds = matchingUsers.map((u) => u._id);

    let profileQuery = { user: { $in: userIds } };
    if (search) {
      profileQuery.$or = [
        { currentCompany: { $regex: search, $options: "i" } },
        { currentRole: { $regex: search, $options: "i" } },
        { bio: { $regex: search, $options: "i" } },
      ];
    }
    if (skills) {
      const skillArr = skills.split(",").map((s) => s.trim());
      profileQuery.skills = { $in: skillArr };
    }

    const total = await Profile.countDocuments(profileQuery);
    const profiles = await Profile.find(profileQuery)
      .populate("user", "name email avatar role graduationYear department")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ updatedAt: -1 });

    res.json({
      success: true,
      count: profiles.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: Number(page),
      profiles,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get profile by user ID
// @route   GET /api/profile/:userId
// @access  Private
const getProfileById = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.params.userId }).populate("user", "name email avatar role graduationYear department");

    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    res.json({ success: true, profile });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMyProfile, updateMyProfile, getAllProfiles, getProfileById };
