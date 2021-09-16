const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./User");
const logSchema = new Schema(
  {
    success: Boolean, // default false
    habit: { type: Schema.Types.ObjectId, ref: "Habit" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    late: Boolean,
  },
  { timestamps: true }
);
// pre save to add to user's logs
logSchema.pre("remove", async function (next) {
  console.log("REMOVING LOG");
  await User.findByIdAndUpdate(this.user, { logs: { $pull: this._id } });
  next();
});

const Habit = mongoose.model("Log", logSchema);
module.exports = Habit;
