const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const Task = require("./models/Task");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ✅ CORRECT MongoDB Connection (NO OPTIONS)
mongoose
  .connect("mongodb://127.0.0.1:27017/todoApp")
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Get all tasks
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Add task
app.post("/add", async (req, res) => {
  const { task } = req.body;
  if (!task || task.trim() === "") {
    return res.status(400).json({ error: "Task cannot be empty" });
  }
  await Task.create({ title: task });
  res.json({ success: true });
});

// Delete task
app.delete("/delete/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
