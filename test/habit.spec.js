const assert = require("assert");
const { expect } = require("chai");

const { dbConnect, dbDisconnect } = require("./test_helpers/dbConnect");

const User = require("../models/User");
const Habit = require("../models/Habit");
const Log = require("../models/Log");

describe("Habit Model", async function () {
  before(async function () {
    dbConnect(async () => {
      // create User
      const user = await User.create({ name: "Sam" });
      // create Habit
      const habit = await Habit.create({
        habit: "first habit",
      });

      //   add Habit to user
      user.habits.push(habit);
      await user.save();

      // create Logs
      const logInfos = [
        { success: true, habit: habit, user: user, late: habit.isLate() },
        { success: true, habit: habit, user: user, late: habit.isLate() },
        { success: true, habit: habit, user: user, late: habit.isLate() },
      ];
      Log.insertMany(loginfos);
    });
    // create testable records
  });

  it("can create & save a valid habit", async function () {
    const habits = await Habit.find().exec();
    
    assert.equal(habits.length, 1);
  });

  //   it("has logs", async function () {
  //     const habit = await Habit.find().exec();
  //     expect(habit[0].habit).to.be.eq("first habit");
  //     assert.equal(habit[0].habit, "first habit");
  //   });

  //   VALIDATIONS
  // "requires a birthday"

  // runs once after the last test in this block
  after(async function () {
    await User.deleteMany({});
    await Habit.deleteMany({});
    await Log.deleteMany({});
    dbDisconnect();
  });
});
