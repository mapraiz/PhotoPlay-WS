// Filename: index.js

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); 

console.log('Running PhotoPlay web service index');

const apiRoutes = require("./api-routes");


const app = express();


app.use(cors());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/photoplayredundancia', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

if (!db) {
    console.log("Error connecting to db");
} else {
    console.log("DB connected successfully");
}

const port = process.env.PORT || 8080;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Running RestHub for PhotoPlay on port ${port}`);
});

app.use('/api', apiRoutes);