const express = require("express");
const Log = require("../models/Log");

const router = express.Router();

router.post("/", async (req, res) => {
  const { userId, logs } = req.body;
  const userLog = await Log.findOneAndUpdate(
    { userId },
    { $push: { logs: { $each: logs } } },
    { upsert: true, new: true }
  );
  res.json(userLog);
});

router.get("/", async (req, res) => {
  const { userId } = req.query;
  const userLog = await Log.findOne({ userId });
  if (!userLog) return res.json({ logs: [] }); // Return empty logs instead of 404
  res.json(userLog);
});


module.exports = router;
