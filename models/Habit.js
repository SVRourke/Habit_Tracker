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
// pre save to add to user's habits
habitSchema.methods.createLogs = async function (success) {
  try {
    const log = new Log({
      success: success,
      habit: this._id,
      user: this.user,
      late: this.isLate,
    });
    await log.save();
    this.logs.push(log._id);
    await this.save();
    return log;
  } catch (error) {
    return error;
  }
};

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

// ? pre save add to user?

habitSchema.pre(
  "findOneAndDelete",
  { document: false, query: true },
  async function () {
    const doc = await this.model.findOne(this.getFilter());
    // delete logs
    await Log.deleteMany({ habit: doc._id });
    // delete user's reference
    await User.findByIdAndUpdate(
      { _id: doc.user },
      { $pull: { habits: doc._id } }
    );
  }
);

const currentTime = () => {
  return new Date()
    .toTimeString()
    .match(/^(\d{2}:\d{2}:\d{2})/)[0]
    .split(":")
    .slice(0, 2);
};

const Habit = mongoose.model("Habit", habitSchema);
module.exports = Habit;
