const oracledb = require('oracledb');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/api-routes');

async function runApp() {
  let connection;
  try {
    // Configurar la conexión con autoCommit: false OSTIAadsaddadsdasdasd
    connection = await oracledb.getConnection({
      user: "c##photoplay",
      password: "almi123",
      connectString: "3.221.255.12:1521/ORCLCDB",
      autoCommit: false  // Configuración para mantener la conexión abierta
    });
    console.log("Successfully connected to Oracle Database");

    const app = express();
    const PORT = process.env.PORT || 8080;

    // Middleware
    app.use(bodyParser.json());
    // Middleware para servir archivos estáticos
    app.use(express.static('/var/www/photoplayredundancia.duckdns.org'));

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
