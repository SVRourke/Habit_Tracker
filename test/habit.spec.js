const assert = require("assert");
const { expect } = require("chai");

const {
  dbConnect,
  dbDisconnect,
  clearDB,
} = require("./test_helpers/dbConnect");

const User = require("../models/User");
const Habit = require("../models/Habit");
const Log = require("../models/Log");

describe("Habit Model", async function () {
  before(async function () {
    dbConnect();
  });

  beforeEach(async function () {
    const user = await User.create({ name: "Sam" });
    // const habit = await Habit.create({ habit: "pushups", user: user._id });
    const habit = await user.createHabit({
      habit: "pushups",
    });

    await habit.createLog(true);
    await habit.createLog(true);
    await habit.createLog(true);
  });
  // afterEach(async function () {
  //   clearDB();
  // });
  it("can create & save a valid habit", async function () {
    const user = await User.findOne({ name: "Sam" }).exec();
    const habit = await Habit.findOne({ habit: "pushups" }).exec();
    const logs = await Log.find({ habit: habit._id });

    assert.equal(habit, habit);
  });

  after(async function () {
    clearDB();
    dbDisconnect();
  });
});
