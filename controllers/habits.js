const Habit = require("../models/Habit");
const User = require("../models/User");
const Log = require("../models/Log");

exports.index = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.params.userId }).exec();
    res.send(habits);
  } catch (error) {
    res.send(error);
  }
};

exports.create = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const habit = newHabit({ ...req.body, user: req.params.userId });
    await habit.save();
    res.send(habit);
  } catch (error) {
    res.send(error);
  }
};

exports.show = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.habitId).exec();
    res.send(habit);
  } catch (error) {
    res.send(error);
  }
};

exports.update = async (req, res) => {
  try {
    await Habit.updateOne({ _id: req.params.habitId }, req.body);
    res.send({ message: "success" });
  } catch (error) {
    res.status(500).send({ message: "failure" });
  }
};

exports.delete = async (req, res) => {
  const { userId, habitId } = req.params;

  try {
    // TODO: remove from user
    const user = await User.findById(userId);
    await user.dropHabit(habitId)


    res.send("hello");
  } catch (error) {
    res.status(500).send({ error });
  }
};
