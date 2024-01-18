# Steps

1. Create a Nodejs project using this command in cmd using `npm init -y`
2. Initialize git in project directory
3. Add node_modules to `.gitignore` file
4. Install dependencies:

- express: REST API framework
- cors: to allow resources from one domain to be accessed from another domain
- dotenv: used to manage environment variables. Environment variables are useful for setting up things that don't change often, such as URLs, authentication keys, and passwords. This helps keep sensitive keys and passwords secure by storing them outside of the source code
- mongodb: official mongodb driver
- nodemon: automatically restarts the node application when file changes in the directory are detected
- jsonwebtoken: implements JSON Web Tokens (JWTs).
- cookie-parser: used to save jwt credentials in cookies
- bcrypt: to handle password management and generate

5. Add `dev` script to use nodemon in `package.json` like this:

```json
...
  "scripts": {
  "test": "echo \"Erro1r: no test specified\" && exit 1",
  "start": "node server",
  "dev": "nodemon server"
},
...
```

6. Create the MVC basic structure for the project:

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

7. Add `.env` file to `.gitignore`

8. Import express library into `server.js` file and create a instance, like this:

```javascript
const express = require("express");
const app = express();
```

9. Connect to MongoDB
   - Create database
   - Get the connection string and paste it into the `.env` file
   - Create `dbConn.js` to handle the connection into `config` folder and add this code:

```javascript
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.DATABASE_URI);

const connectDB = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas!");
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
```
