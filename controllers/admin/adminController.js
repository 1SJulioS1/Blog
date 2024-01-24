const { connectToDatabase } = require("../../config/dbConn.js");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

const getAllAdmins = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("User");
    const admin = await collection
      .find({ role: 5150 }, { projection: { _id: 0, username: 1, email: 1 } })
      .toArray();
    if (!admin) return res.status(404).json({ message: "No admins found" });
    res.json(admin);
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).json({ message: "An error occurred." });
  }
};

module.exports = {
  getAllAdmins,
};
