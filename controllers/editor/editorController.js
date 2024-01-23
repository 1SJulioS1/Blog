const { connectToDatabase } = require("../../config/dbConn.js");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

const createEditor = async (req, res) => {
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

  try {
    const result = await db.collection("User").insertOne({
      username,
      role: [1984],
      password: hashedPwd,
      email,
    });
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error creating seed admin user: ${error}` });
  }
};

const getEditors = async (req, res) => {
  const db = await connectToDatabase();
  const collection = db.collection("User");
  const editor = await collection
    .find({ role: 1984 }, { projection: { _id: 0, username: 1, email: 1 } })
    .toArray();
  if (!editor) return res.status(404).json({ message: "No editors found" });
  res.json(editor);
};

const getEditor = async (req, res) => {
  const db = await connectToDatabase();
  const collection = db.collection("User");
  if (!req?.params?.id) {
    return res.status(400).json({ message: "Id parameter is required" });
  }
  const editor = await collection
    .find(
      { _id: new ObjectId(req.params.id) },
      { projection: { _id: 0, username: 1, email: 1 } }
    )
    .toArray();

  if (!editor) {
    return res
      .status(400)
      .json({ message: `No editor with ${req.params.id} found` });
  }
  res.json(editor);
};

const updateEditor = async (req, res) => {
  const db = await connectToDatabase();
  const collection = db.collection("User");

  if (!req?.params?.id) {
    return res.status(400).json({ message: "Id parameter is required" });
  }

  const updatedEditor = req.body;
  if (updatedEditor.password) {
    const salt = await bcrypt.genSalt(10);
    updatedEditor.password = await bcrypt.hash(updatedEditor.password, salt);
  }
  try {
    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updatedEditor }
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "User updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(`Error updating user: ${error}`);
    res
      .status(500)
      .json({ message: "An error occurred while updating the user" });
  }
};

module.exports = { createEditor, getEditors, getEditor, updateEditor };