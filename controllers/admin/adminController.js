const { connectToDatabase } = require("../../config/dbConn.js");
const { ObjectId } = require("mongodb");
const getAllAdmins = async (req, res) => {
  const db = await connectToDatabase();
  const collection = db.collection("User");
  const employees = await collection
    .find({ role: 5150 }, { projection: { _id: 0, username: 1, email: 1 } })
    .toArray();
  if (!employees) return res.status(404).json({ message: "No employee found" });
  res.json(employees);
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
  console.log(req.body.email);
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

module.exports = { getAllAdmins, getAdmin, getAdminId };
