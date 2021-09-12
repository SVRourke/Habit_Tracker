const Habit = require("../models/Habit");

exports.index = async (req, res) => {
  try {
    const habits = await Habit.find().exec();
    res.send(habits);
  } catch (error) {
    res.send(error);
  }
};

exports.create = async (req, res) => {
  //   try {
  //     const user = await Habit.create({ name: req.body.user });
  //     res.send(user);
  //   } catch (error) {
  //     res.send(error);
  //   }
  res.send({ params: req.body });
};

exports.show = async (req, res) => {
  // try {
  //     const user = await User.findById(req.params.userId).exec();
  //     res.send(user);
  // } catch (error) {
  //     res.send(error);
  // }
  res.send("show");
};

exports.update = async (req, res) => {
  // try {
  //     await User.updateOne({ _id: req.params.userId }, req.body);
  //     res.send({ message: "success" });
  // } catch (error) {
  //     res.status(500).send({ message: "failure" });
  // }
  res.send("update");
};

exports.delete = async (req, res) => {
  res.send("update");
  //   try {
  //     await User.findByIdAndDelete(req.params.userId);
  //     res.send({ message: "success" });
  //   } catch (error) {
  //     res.status(500).send({ error });
  //   }
};
