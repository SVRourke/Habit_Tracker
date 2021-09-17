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
logSchema.pre("remove", { document: false, query: true }, async function () {
  const log = await this.model.findOne(this.getFilter());
  await User.findByIdAndUpdate(log.user, { $pull: { logs: log._id } });
});

const Habit = mongoose.model("Log", logSchema);
module.exports = Habit;
