const mongoose = require("mongoose");
const { Schema } = mongoose;

const Habit = require("./Habit");

const userSchema = new Schema({
  name: String,
  birthday: Date,
  habits: [{ type: Schema.Types.ObjectId, ref: "Habit" }],
  logs: [{ type: Schema.Types.ObjectId, ref: "Log" }],
});

userSchema.methods.createHabit = async function (habitAttributes) {
  try {
    const habit = new Habit({ ...habitAttributes, user: this._id });
    await habit.save();

    this.habits.push(habit);
    await this.save();
    return habit;
  } catch (error) {
    return error;
  }
};

userSchema.methods.dropHabit = async function (habitId) {
  try {
    this.habits.pull({ _id: habitId });
    await Habit.findOneAndDelete({ _id: habitId });
  } catch (error) {
    return error;
  }
  // find habit and delete

  // remove habits from user
};

const User = mongoose.model("User", userSchema);
module.exports = User;

// TODO: REFACTOR as an ES6 Class with Schema.loadClass(classname)
