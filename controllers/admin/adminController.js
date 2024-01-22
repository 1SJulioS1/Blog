const { connectToDatabase } = require("../../config/dbConn.js");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

const getAllAdmins = async (req, res) => {
  const db = await connectToDatabase();
  const collection = db.collection("User");
  const admin = await collection
    .find({ role: 5150 }, { projection: { _id: 0, username: 1, email: 1 } })
    .toArray();
  if (!admin) return res.status(404).json({ message: "No admins found" });
  res.json(admin);
};

const getAdmin = async (req, res) => {
  const db = await connectToDatabase();
  const collection = db.collection("User");

  if (!req?.params?.id) {
    return res.status(400).json({ message: "Id parameter is required" });
  }
  const admin = await collection
    .find(
      { _id: new ObjectId(req.params.id) },
      { projection: { _id: 0, username: 1, email: 1 } }
    )
    .toArray();
  if (!admin) {
    return res
      .status(400)
      .json({ message: `Admin ID ${req.params.id} not found` });
  }
  res.json(admin);
};

const getAdminId = async (req, res) => {
  const db = await connectToDatabase();
  const collection = db.collection("User");
  if (!req?.body?.email) {
    return res.status(400).json({ message: "Email is required" });
  }
  console.log(req.body.email);
  const admin = await collection
    .find({ email: req.body.email }, { projection: { _id: 1 } })
    .toArray();
  if (!admin) {
    return res
      .status(400)
      .json({ message: `Admin with email ${req.body.email} not found` });
  }
  return res.json(admin);
};

const createAdmin = async (req, res) => {
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
      role: [5150],
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

const updateAdmin = async (req, res) => {
  const db = await connectToDatabase();
  const collection = db.collection("User");

  if (!req?.params?.id) {
    return res.status(400).json({ message: "Id parameter is required" });
  }

  const updatedAdmin = req.body;
  if (updatedAdmin.password) {
    const salt = await bcrypt.genSalt(10);
    updatedAdmin.password = await bcrypt.hash(updatedAdmin.password, salt);
  }
  try {
    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updatedAdmin }
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

module.exports = {
  getAllAdmins,
  getAdmin,
  getAdminId,
  createAdmin,
  updateAdmin,
};
