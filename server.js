const express = require("express");
const app = express();
const cors = require("cors");
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/dbConn.js").connectToDatabase;

connectDB();
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh.js"));
app.use("/logout", require("./routes/logout.js"));
app.use("/group", require("./routes/initialAdmin"));

PORT = process.env.PORT || 3500;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
