const mongoose = require("mongoose");
const { Schema } = mongoose;

const habitSchema = new Schema({
  habit: String,
  all_day: Boolean,
  goal_time: String,
  category: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  //   logs: [{type: Schema.Types.ObjectId, ref: "Log"}]
});

const Habit = mongoose.model("Habit", habitSchema);
module.exports = Habit;

// const date = new Date(dateString);
// date.setHours(hours, minutes);
