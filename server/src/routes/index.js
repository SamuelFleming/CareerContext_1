// server/src/routes/index.js

const express = require("express");


const router = express.Router();

const getAPI = async (req, res) => {
    res.status(200).json({ message: "CareerContext API running" });
};


router.get("/", getAPI);

//Health Check
router.get("/health", (req, res) => {
  res.json({ ok: true, service: "careerContext-api" });
});

module.exports = router;