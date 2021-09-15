const mongoose = require("mongoose");

const TEST_DB_URL = "mongodb://testsuite:tester@127.0.0.1:27017/test";

const TEST_DB_CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

exports.dbConnect = (cb) => {
  console.log("opening connection");
  mongoose.connect(TEST_DB_URL, TEST_DB_CONFIG, () => {
    console.log("connected to test DB");
    cb();
  });
};
exports.dbDisconnect = () => {
  mongoose.connection.close();
};
