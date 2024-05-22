const oracledb = require('oracledb');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

async function runApp() {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: "photoplay",
      password: "almi123",
      connectString: "100.28.90.231:1521/ORCLCDB"
    });
    console.log("Successfully connected to Oracle Database");

    const app = express();
    const PORT = process.env.PORT || 8080;

    // Middleware
    app.use(bodyParser.json());

    // Routes
    app.use('/api', routes);

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log("Connection to Oracle Database closed");
      } catch (err) {
        console.error(err);
      }
    }
  }
}

runApp();
