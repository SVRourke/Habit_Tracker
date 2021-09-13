const Habit = require("../models/Log");
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
    const log = await Log.create({
      success: req.body.success,
      habit: habitId,
      user: userId,
    });
    const habit = await Habit.updateOne(
      { _id: habitId },
      { $push: { logs: log } }
    );
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
  res.send("Hello destroy");
};
