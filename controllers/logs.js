const Habit = require("../models/Habit");
const Log = require("../models/Log");
const User = require("../models/User");

exports.index = async (req, res) => {
  try {
    const logs = await Log.find({ habit_id: req.params.habitId }).exec();
    res.send(logs);
  } catch (error) {
    res.send(error);
  }
};

exports.create = async (req, res) => {
  const { userId, habitId } = req.params;
  try {
    const habit = await Habit.findById(habitId).exec();
    const log = await Log.create({
      success: req.body.success,
      habit: habitId,
      user: userId,
      late: habit.isLate(),
    });
    habit.logs.push(log);
    await habit.save();
    const user = await User.updateOne(
      { _id: userId },
      { $push: { logs: log } }
    );
    res.send(log);
  } catch (error) {
    res.send(error);
  }
};
exports.show = async (req, res) => {
  res.send("Hello show");
};
exports.update = async (req, res) => {
  res.send("Hello update");
};
exports.destroy = async (req, res) => {
  const { userId, habitId, logId } = req.params;

  const user = await User.findByIdAndUpdate(userId, {
    $pull: { logs: logId },
  }).exec();

  const habit = await Habit.findByIdAndUpdate(habitId, {
    $pull: { logs: logId },
  }).exec();

  await Log.findByIdAndDelete(logId);

  res.send("success");
};
