const mongodb = require("mongodb");
const { MongoClient } = mongodb;

let _database;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://marveeen:WjchIjFvgdOUeBJk@cluster0.tpetww6.mongodb.net/?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connected!");
      _database = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDatabase = () => {
  if (!_database) {
    throw "No database found!";
  }

  return _database;
};

module.exports = {
  mongoConnect,
  getDatabase,
};
