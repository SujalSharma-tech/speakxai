const mongoose = require("mongoose");

const ConnectDB = () => {
  mongoose
    .connect(
      "mongodb+srv://sharmasujal995:14GU9KVl2ngX3syR@cluster0.gf3qw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Connection Error: ", err);
    });
};

module.exports = ConnectDB;
