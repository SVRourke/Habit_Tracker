const mongoose = require("mongoose");
const { Schema } = mongoose;

const logSchema = new Schema(
  {
    success: Boolean, // default false
  },
  { timestamps: true }
);

const Habit = mongoose.model("Log", logSchema);
module.exports = Habit;
