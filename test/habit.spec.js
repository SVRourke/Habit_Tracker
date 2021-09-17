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
    const user = await User.create({ name: "Test User" });
    // const habit = await Habit.create({ habit: "pushups", user: user._id });
    const habit = await user.createHabit({
      habit: "pushups",
    });

    await habit.createLog(true);
    await habit.createLog(true);
    await habit.createLog(true);
  });

  // beforeEach(async function () {
  // });
  // afterEach(async function () {
  //   clearDB();
  // });

  it("removes habit reference", async function () {
    const user = await User.findOne({ name: "Test User" }).exec();
    await user.dropHabit(user.habits[0]);

    assert.equal(user.habits.length, 0);
  });

  it("deletes associated logs", async function () {
    const user = await User.findOne({ name: "Test User" }).exec();
    const logs = await Log.find();

    assert.equal(logs.length, 0);
  });

  after(function () {
    clearDB();
    dbDisconnect();
  });
});
