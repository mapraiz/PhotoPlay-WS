const oracledb = require('oracledb');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/api-routes');
const path = require('path');

async function runApp() {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: "c##photoplay",
      password: "almi123",
      connectString: "3.221.255.12:1521/ORCLCDB",
      autoCommit: false
    });
    console.log("Successfully connected to Oracle Database");

    const app = express();
    const PORT = process.env.PORT || 8080;

    // Middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors({
      origin: 'https://redundancia1000.duckdns.org',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }));

    // Middleware para servir archivos estáticos
    app.use(express.static('/var/www/redundancia1000.duckdns.org/PhotoOstia/public'));

    // Routes
    app.use('/api', routes);

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

    // Esperar a que el proceso se detenga
    await new Promise((resolve) => process.on('SIGINT', resolve));
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
