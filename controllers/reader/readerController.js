const { connectToDatabase } = require("../../config/dbConn.js");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

const createReader = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("User");
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ message: "Username and password must be provided" });
    }
    const duplicate = await collection.findOne({ email });
    if (duplicate) {
      return res.status(401).json({ message: "Duplicated user" });
    }
    const hashedPwd = await bcrypt.hash(password, 10);

    const result = await db.collection("User").insertOne({
      username,
      role: [2001],
      password: hashedPwd,
      email,
    });
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error occurred:", error);
    return res
      .status(500)
      .json({ message: `Error creating seed admin user: ${error}` });
  }
};

const getReader = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("User");

    if (!req?.params?.id) {
      return res.status(400).json({ message: "Id parameter is required" });
    }
    const reader = await collection
      .find(
        { _id: new ObjectId(req.params.id) },
        { projection: { _id: 0, username: 1, email: 1 } }
      )
      .toArray();
    if (!reader) {
      return res
        .status(400)
        .json({ message: `Reader ID ${req.params.id} not found` });
    }
    res.json(reader);
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).json({ message: "An error occurred." });
  }
};

module.exports = { createReader, getReader };
