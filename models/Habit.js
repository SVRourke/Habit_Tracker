const { NotExtended } = require("http-errors");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const Log = require("./Log");
const User = require("./User");

const habitSchema = new Schema({
  habit: String,
  all_day: Boolean, // TODO: default false
  goal_time: String,
  category: String,
  repetitions: Number, // default 1
  interval: String, // Day, week, month default Day
  user: { type: Schema.Types.ObjectId, ref: "User" },
  logs: [{ type: Schema.Types.ObjectId, ref: "Log" }],
});

habitSchema.methods.isLate = function (cb) {
  let [currentHour, currentMinutes] = currentTime();
  let [goalHour, goalMinutes] = this.goal_time.split(":");

  if (
    parseInt(currentHour) <= parseInt(goalHour) &&
    parseInt(currentMinutes) <= parseInt(goalMinutes)
  ) {
    return false;
  } else return true;
};

// TODO: FIX
habitSchema.pre("deleteOne", function (next) {
  console.log("deleted", this.logs);
  if (this && this.logs) {
    Log.find({ habit: this._id }, (logs, err) => {
      if (err) throw err;

      console.log(logs);
    });
    console.log(logs);
  }
  next();
});

const currentTime = () => {
  return new Date()
    .toTimeString()
    .match(/^(\d{2}:\d{2}:\d{2})/)[0]
    .split(":")
    .slice(0, 2);
};

const Habit = mongoose.model("Habit", habitSchema);
module.exports = Habit;
