const assert = require("assert");
const { expect } = require("chai");
const mongoose = require("mongoose");

const User = require("../models/User");

describe("User Model", function () {
  before(function (done) {
    mongoose.connect(
      `mongodb://testsuite:tester@127.0.0.1:27017/test`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => {
        console.log("connected to test DB");

        done();
      }
    );
    // create testable records
  });

  //   it("valid user", () => {
      // const user = User.create;

  //     expect(4).to.be.eq(4);
  //   });

  // runs once after the last test in this block
  //   after(function () {});
});
