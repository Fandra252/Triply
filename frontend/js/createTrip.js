document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("tripForm");
  const transportInput = document.getElementById("transport");
  const peopleInput = document.getElementById("people");
  const startDateInput = document.getElementById("start-date");
  const endDateInput = document.getElementById("end-date");
  const budgetInput = document.getElementById("budget");

  // 🧮 Auto-calculate budget dynamically
  function calculateBudget() {
    const transport = transportInput.value;
    const travelers = Number(peopleInput.value);
    const startDate = new Date(startDateInput.value);
    const endDate = new Date(endDateInput.value);
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

    if (days > 0 && travelers > 0 && transport) {
      const baseRate =
        transport === "flight" ? 4000 : transport === "train" ? 2000 : 1000;
      const estimated = baseRate * travelers * days;
      budgetInput.value = estimated;
    } else {
      budgetInput.value = "";
    }
  }

  [transportInput, peopleInput, startDateInput, endDateInput].forEach((el) =>
    el.addEventListener("change", calculateBudget)
  );

  // 🧾 Submit form
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please sign in first.");
      window.location.href = "signin.html";
      return;
    }

    const tripData = {
      userId: user._id,
      destination: document.getElementById("destination").value,
      startDate: document.getElementById("start-date").value,
      endDate: document.getElementById("end-date").value,
      travelers: Number(document.getElementById("people").value),
      transport: document.getElementById("transport").value,
      budget: Number(document.getElementById("budget").value),
      details: document.getElementById("details").value,
    };

    try {
      const res = await fetch("http://localhost:5000/api/trips/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tripData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Trip created successfully!");
        form.reset();
        window.location.href = "mytrips.html";
      } else {
        alert(data.error || "Failed to create trip");
      }
    } catch (err) {
      console.error("Trip creation error:", err);
      alert("Something went wrong. Please try again.");
    }
  });
});
