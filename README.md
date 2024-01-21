# Steps

## Step 1: Create a Nodejs project

use this command in cmd using `npm init -y`

## Step 2: Initialize git in project directory

## Step 3 Add node_modules to `.gitignore` file

## Step 4: Install dependencies

Add all this packages to the project:

<details>
<summary>express</summary>
REST API framework
</details>
<details>
<summary>cors</summary>
to allow resources from one domain to be accessed from another domain
</details>
<details>
<summary>dotenv</summary>
used to manage environment variables. Environment variables are useful for setting up things that don't change often, such as URLs, authentication keys, and passwords. This helps keep sensitive keys and passwords secure by storing them outside of the source code
</details>
<details>
<summary>mongodb</summary>
official mongodb driver
</details>
<details>
<summary>nodemon</summary>
automatically restarts the node application when file changes in the directory are detected
</details>
<details>
<summary>jsonwebtoken</summary>
implements JSON Web Tokens (JWTs).
</details>
<details>
<summary>cookie-parser</summary>
used to save jwt credentials in cookies
</details>
<details>
<summary> bcrypt</summary>
to handle password management and generate
</details>

## Step 5 Using nodemon

Add `dev` script to use nodemon in `package.json` like this:

```json
...
  "scripts": {
  "test": "echo \"Erro1r: no test specified\" && exit 1",
  "start": "node server",
  "dev": "nodemon server"
},
...
```

## Step 6 Create the MVC basic structure for the project:

```code
  |- config
  |- controllers
  |- middleware
  |- public
  |- routes
  |- views (optionals if building an API)
  - .env
  - .gitignore
  - server.js
```

## Step 7 Add `.env` file to `.gitignore`

## Step 8 Import express library into `server.js` file and create a instance, like this:

```javascript
const express = require("express");
const app = express();
```

## Step 9 Connect to MongoDB

- Create database
- Get the connection string and paste it into the `.env` file
- Create `dbConn.js` to handle the connection into `config` folder and add this code:

```javascript
const { MongoClient } = require("mongodb");
require("dotenv").config();

const connectionString = process.env.DATABASE_URI || "";

let _db;

const client = new MongoClient(connectionString);

const connectToDatabase = async () => {
  if (_db) {
    return _db;
  }

  try {
    await client.connect();
    _db = client.db("Blog");
    console.log("MongoDB connection established");
  } catch (e) {
    console.error(e);
    throw e;
  }

  return _db;
};

module.exports = { connectToDatabase };
```

- import the created module into `server.js` file
- invoke the `connectToDB` function in `server.js`

## Step 10. Create `logEvents` logger function in `middleware` folder using this code:

```javascript
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;

const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), "yyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logItem);
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
  console.log(`${req.method} ${req.path}`);
  next();
};

module.exports = { logger, logEvents };
```

Invoke `logEvents` middleware in `server.js` after `connectDB` function is called (Optional)

## Step 11 Setting up Cross Origin Resource Sharing

1. Create `whitelist.js` whitelist domains for this API in `config` folder, with a content similar to this:

```javascript
const whiteList = [
  "https://www.yoursite.com",
  "https://127.0.0.1:5500",
  "http://localhost:3500",
];

module.exports = whiteList;
```

2. Add this file to .gitignore

3. Use `whitelist` module to set `Access-Control-Allow-Credentials` true. This is a response header in the HTTP protocol. It is part of the Cross-Origin Resource Sharing (CORS) protocol, which allows cross-origin sharing. This header is sent by the server to indicate to the client that the HTTP response can be shared when the credentials mode is set to include.
4. Create `credentials.js` new middleware using this code:

```javascript
const whiteList = require("../config/whitelist");

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (whiteList.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};
module.exports = credentials;
```

5. Import and use `credentials` middleware right after the database connection function (or logger in case you use it). Like this:

```javascript
const credentials = require("./middleware/credentials");
app.use(credentials);
```

6. Create `corsOptions.js` file to set up Cross Origin Resource Sharing (CORS) using this code

```javascript
const whiteList = require("./whitelist");
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) != -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
```

7. Use `corsOptions` middleware in `server.js` like this:

```javascript
const corsOptions = require("./config/corsOptions");
app.use(cors(corsOptions));
```

## Step 12 Configuring Middleware for Parsing JSON and URL-Encoded Data

1. Use urlencoded middleware :

```javascript
app.use(express.urlencoded({ extended: false }));
```

The line app.use(express.urlencoded({ extended: false })); in an Express.js application is a middleware function that parses incoming requests with URL-encoded payloads.

This means that when your Express application receives an HTTP request, this line of code is responsible for decoding any data that comes in the body of the request that is URL-encoded. For example, if you are sending data via a POST request, and that data is URL-encoded, this line of code will decode it and convert it into a format that your application can handle more easily.

The { extended: false } object is an option that you can pass to express.urlencoded(). When extended is set to false, the querystring library is used to parse the data. When extended is set to true, the qs library is used to parse the data. The difference between these two libraries lies in how they handle complex data types like objects and arrays. The qs library is capable of handling these types of data, while querystring is not.

2. Use json middleware:

The line app.use(express.json()); in an Express.js application is a middleware function that parses incoming requests with JSON payloads.

This means that when your Express application receives an HTTP request, this line of code is responsible for decoding any data that comes in the body of the request that is JSON-encoded.

```javascript
app.use(express.json());
```

## Step 13 Cookies

Using cookie-parser package middleware to handle cookies
Add this line to `server.js`

```javascript
const cookieParser = require("cookie-parser");
app.use(cookieParser());
```

## Step 14 Error Handling

Add error handling middleware to `server.js`, using this line at the end of the file

```javascript
app.use(errorHandler);
```
