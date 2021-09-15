// const assert = require("assert");
// const { expect } = require("chai");

// const { dbConnect, dbDisconnect } = require("./test_helpers/dbConnect");

// const User = require("../models/User");
// const Habit = require("../models/Habit");
// const Log = require("../models/Log");

// describe("User Model", function () {
//   before(function (done) {
//     dbConnect(() => {
//         // create User
//         // create Habit
//         // create Logs
//       User.create({ name: "Sam" }, done);
//     });
//     // create testable records
//   });

//   it("valid user", async () => {
//     const users = await User.find().exec();
//     expect(users.length).to.be.eq(1);
//   });

//   //   it("requires a birthday");

//   // runs once after the last test in this block
//   after(async () => {
//     await User.deleteMany({});
//     dbDisconnect();
//   });
// });
