const mongoose = require("mongoose");
const { Schema } = mongoose;

const logSchema = new Schema(
  {
    success: Boolean, // default false
    habit: { type: Schema.Types.ObjectId, ref: "Habit" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Habit = mongoose.model("Log", logSchema);
module.exports = Habit;
