const express = require("express");
const mongoose = require("mongoose");
const config = require("./Config");
const userRoutes = require("./src/routes/user");
const coursesRoutes = require("./src/routes/courses");
const enrollmentRoutes = require("./src/routes/enrollment");
const progressRoutes = require("./src/routes/progress");
const notificationsRoutes = require("./src/routes/notifications");

const app = express();

// Connect to MongoDB
mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Middleware
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/enrollment", enrollmentRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/notifications", notificationsRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
