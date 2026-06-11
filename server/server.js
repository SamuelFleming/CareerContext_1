// server/server.js

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db"); //inject Db connector

const apiRouter = require("./src/routes/index");
const { connect } = require("mongoose");
const cors = require("cors"); //Cross-origin (allow frontend)


dotenv.config();// read the .env file
connectDB(); // instantitate db connecter at the app level

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 3006;

app.use('/api', apiRouter);

app.get('/', (req, res) =>{
    res.json("Next, /api/");
});

app.listen(port, () => {
    console.log(`The CareerContext backend server is listening on port: ${port}`)
});

module.exports = app;