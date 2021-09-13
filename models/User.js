const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  birthday: Date,
  habits: [{ type: Schema.Types.ObjectId, ref: "Habit" }],
  logs: [{ type: Schema.Types.ObjectId, ref: "Log" }],
});

const User = mongoose.model("User", userSchema);
module.exports = User;

// TODO: REFACTOR as an ES6 Class with Schema.loadClass(classname)
