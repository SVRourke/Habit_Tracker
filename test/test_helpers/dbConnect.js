const mongoose = require("mongoose");

const TEST_DB_URL = "mongodb://testsuite:tester@127.0.0.1:27017/test";

const TEST_DB_CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

exports.dbConnect = (cb) => {
  mongoose.connect(TEST_DB_URL, TEST_DB_CONFIG, () => {
    console.log("connected");
    cb();
  });
};
exports.dbDisconnect = () => {
  mongoose.connection.close();
};

exports.clearDB = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};
