const User = require("../models/User");

exports.index = async (req, res) => {
  try {
    const users = await User.find().exec();
    res.send(users);
  } catch (error) {
    res.send(error);
  }
};

exports.create = async (req, res) => {
  try {
    const user = await User.create({ name: req.body.user });
    res.send(user);
  } catch (error) {
    res.send(error);
  }
};

exports.show = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).exec();
    res.send(user);
  } catch (error) {
    res.send(error);
  }
};

exports.update = async (req, res) => {
  try {
    await User.updateOne({ _id: req.params.userId }, req.body);
    res.send({ message: "success" });
  } catch (error) {
    res.status(500).send({ message: "failure" });
  }
};

exports.delete = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.send({ message: "success" });
  } catch (error) {
    res.status(500).send({ error });
  }
};
