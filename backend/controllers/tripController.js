const Trip = require("../models/Trip.js");

// ✈️ Create Trip
const createTrip = async (req, res) => {
  try {
    const {
      userId,
      destination,
      startDate,
      endDate,
      travelers,
      transport,
      budget, // optional if user edits it manually
      details,
    } = req.body;

    // ✅ Calculate trip duration
    const days = Math.ceil(
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
    );

    // ✅ Auto-calculate budget if not provided
    let estimatedBudget = budget;
    if (!budget || budget === 0) {
      const baseRate =
        transport === "flight" ? 4000 : transport === "train" ? 2000 : 1000;
      estimatedBudget = baseRate * travelers * days;
    }

    // ✅ Create trip document
    const trip = await Trip.create({
      userId,
      destination,
      startDate,
      endDate,
      travelers,
      mode: transport,
      days,
      budget: estimatedBudget,
      details,
    });

    res.status(201).json({ message: "Trip created successfully", trip });
  } catch (err) {
    console.error("Trip creation error:", err);
    res.status(500).json({ error: err.message });
  }
};

// 🌍 Get Trips by User
const getTrips = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const trips = await Trip.find({ userId }).sort({ createdAt: -1 });
//     res.json(trips);
//   } catch (err) {
//     console.error("Get trips error:", err);
//     res.status(500).json({ error: err.message });
    //   }
     try {
       const trips = await Trip.find({ userId: req.params.userId });
       res.status(200).json(trips);
     } catch (err) {
       res.status(500).json({ message: "Server error", error: err.message });
     }
};

module.exports = { createTrip, getTrips };
