const bcrypt = require("bcrypt");
const { connectToDatabase } = require("../config/dbConn.js");

const initialAdmin = async (req, res) => {
  const db = await connectToDatabase();
  const collection = db.collection("User");

  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ message: "Username and password must be provided" });
  }
  const duplicate = await collection.findOne({ email });
  console.log(duplicate);
  if (duplicate) {
    return res.status(401).json({ message: "Duplicated user" });
  }
  const hashedPwd = await bcrypt.hash(password, 10);

  try {
    const result = await db.collection("User").insertOne({
      username,
      role: 5150,
      password: hashedPwd,
      email,
    });
    console.log(`User ${username} created successfully`);
    return;
  } catch (error) {
    console.log(`Error creating seed admin user: ${error}`);
  }
};

module.exports = { initialAdmin };
