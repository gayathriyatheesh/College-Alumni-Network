const Job = require("../models/Job");

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Private
const getJobs = async (req, res, next) => {
  try {
    const { type, location, skills, search, page = 1, limit = 10 } = req.query;

    let query = { isActive: true };
    if (type) query.type = type;
    if (location) query.location = { $regex: location, $options: "i" };
    if (skills) {
      const skillArr = skills.split(",").map((s) => s.trim());
      query.skills = { $in: skillArr };
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Job.countDocuments(query);
    const jobs = await Job.find(query)
      .populate("postedBy", "name avatar")
      .select("-applicants")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ success: true, count: jobs.length, total, pages: Math.ceil(total / limit), currentPage: Number(page), jobs });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Private
const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("postedBy", "name avatar email")
      .populate("applicants.user", "name avatar");

    if (!job) return res.status(404).json({ success: false, message: "Job not found" });

    res.json({ success: true, job });
  } catch (error) {
    next(error);
  }
};

// @desc    Post a job
// @route   POST /api/jobs
// @access  Private
const createJob = async (req, res, next) => {
  try {
    const job = await Job.create({ ...req.body, postedBy: req.user._id });
    res.status(201).json({ success: true, job });
  } catch (error) {
    next(error);
  }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private (poster only)
const updateJob = async (req, res, next) => {
  try {
    let job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });

    if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not authorized to update this job" });
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, job });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private (poster only)
const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });

    if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not authorized to delete this job" });
    }

    await job.deleteOne();
    res.json({ success: true, message: "Job removed" });
  } catch (error) {
    next(error);
  }
};

// @desc    Apply to a job
// @route   POST /api/jobs/:id/apply
// @access  Private
const applyJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });

    const alreadyApplied = job.applicants.some((a) => a.user.toString() === req.user._id.toString());
    if (alreadyApplied) {
      return res.status(400).json({ success: false, message: "You have already applied to this job" });
    }

    job.applicants.push({ user: req.user._id });
    await job.save();

    res.json({ success: true, message: "Application submitted successfully", applicantCount: job.applicants.length });
  } catch (error) {
    next(error);
  }
};

// @desc    Get my posted jobs
// @route   GET /api/jobs/my-posts
// @access  Private
const getMyJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, jobs });
  } catch (error) {
    next(error);
  }
};

module.exports = { getJobs, getJobById, createJob, updateJob, deleteJob, applyJob, getMyJobs };
