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
    dbConnect(async () => {
      const user = await User.create({ name: "Sam" });
    });
  });

  it("can create & save a valid habit", async function () {
    const user = await User.find({ name: "Sam" }).exec();
    assert.equal(1, 1);
  });

  after(async function () {
    clearDB();
    dbDisconnect();
  });
});
