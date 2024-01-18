const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.DATABASE_URI);

const connectDB = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas!");
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
