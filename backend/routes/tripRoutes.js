const express = require("express");
const router = express.Router();
const { createTrip, getTrips } = require("../controllers/tripController");

router.post("/create", createTrip);
router.get("/:userId", getTrips);

module.exports = router;
