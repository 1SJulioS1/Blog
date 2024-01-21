const { connectToDatabase } = require("../../config/dbConn.js");

const getAllAdmins = async (req, res) => {
  const db = await connectToDatabase();
  const collection = db.collection("User");
  const employees = await collection
    .find(
      { role: 5150 },
      { projection: { _id: 0, username: 1, email: 1, role: 1 } }
    )
    .toArray();
  if (!employees) return res.status(404).json({ message: "No employee found" });
  res.json(employees);
};

module.exports = { getAllAdmins };
