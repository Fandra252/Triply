const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    travelers: {
      type: Number,
      required: true,
    },
    mode: {
      type: String,
      required: true, // flight, train, bus
    },
    days: {
      type: Number,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    details: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80",
    },
  },
  { timestamps: true }
);

const Trip = mongoose.model("Trip", tripSchema);
module.exports = Trip;
