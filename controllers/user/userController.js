const { connectToDatabase } = require("../../config/dbConn.js");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("User");
    const { username, password, email, role } = req.body;
    if (!username || !password || !email || !role) {
      return res.status(400).json({
        message: "Username, password, email, and role must be provided",
      });
    }
    const duplicate = await collection.findOne({ email });
    if (duplicate) {
      return res.status(401).json({ message: "Duplicated user" });
    }
    const hashedPwd = await bcrypt.hash(password, 10);

    const result = await db.collection("User").insertOne({
      username,
      role: [role],
      password: hashedPwd,
      email,
    });
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).json({ message: `Error creating user: ${error}` });
  }
};

const getUser = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("User");

    if (!req?.params?.id) {
      return res.status(400).json({ message: "Id parameter is required" });
    }
    const user = await collection
      .find(
        { _id: new ObjectId(req.params.id) },
        { projection: { _id: 0, username: 1, email: 1 } }
      )
      .toArray();
    if (!user) {
      return res
        .status(400)
        .json({ message: `User with ID ${req.params.id} not found` });
    }
    res.json(user);
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).json({ message: "An error occurred." });
  }
};

const updateUser = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("User");

    if (!req?.params?.id) {
      return res.status(400).json({ message: "Id parameter is required" });
    }

    const user = req.body;
    const existingUsername = await collection.findOne({
      username: user.username,
    });

    if (existingUsername) {
      return res.status(400).json({ message: "Username is already in use" });
    }

    const existingEmail = await collection.findOne({ email: user.email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: user }
    );

    if (result.matchedCount > 0 && result.modifiedCount === 0) {
      return res.status(400).json({ message: "Provide a different user data" });
    }
    if (result.modifiedCount > 0) {
      return res.status(200).json({ message: "User updated successfully" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while updating the user" });
  }
};

module.exports = { createUser, getUser, updateUser };
