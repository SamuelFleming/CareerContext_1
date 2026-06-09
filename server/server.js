// server/server.js

const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3006;

app.get('/', (req, res) =>{
    res.json("Next, /api/");
});

app.listen(port, () => {
    console.log(`The CareerContext backend server is listening on port: ${port}`)
});

module.exports = app;