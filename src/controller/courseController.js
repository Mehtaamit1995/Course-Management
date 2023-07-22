const Course = require("../models/course");

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;
    const teacher = req.user._id; // The authenticated teacher's ID will be available in the request due to middleware

    // Validate input data
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }

    // Create a new course
    const course = new Course({ title, description, teacher });
    await course.save();

    res.status(201).json({ message: "Course created successfully", course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a course
exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Validate input data
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }

    // Find and update the course
    const course = await Course.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json({ message: "Course updated successfully", course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the course
    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
