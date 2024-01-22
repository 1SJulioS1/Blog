const express = require("express");
const app = express();
const cors = require("cors");
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/dbConn.js").connectToDatabase;
const verifyJWT = require("./middleware/verifyJWT");

PORT = process.env.PORT || 3500;

connectDB();
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh.js"));
app.use("/logout", require("./routes/logout.js"));
app.use("/initialAdmin", require("./routes/initialAdmin"));

app.use(verifyJWT);
app.use("/group/admin", require("./routes/admin.js"));
app.use("/group/editor", require("./routes/editor.js"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
