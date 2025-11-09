document.addEventListener("DOMContentLoaded", async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const container = document.getElementById("tripsContainer");

  if (!user) {
    alert("Please sign in first.");
    window.location.href = "signin.html";
    return;
  }

  try {
    const res = await fetch(`http://localhost:5000/api/trips/${user._id}`);
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Failed to load trips");

    if (data.length === 0) {
      container.innerHTML = `<p>No trips found. <a href="create-trip.html">Create one!</a></p>`;
      return;
    }

    container.innerHTML = data
      .map(
        (trip) => `
        <div class="trip-card">
         <div class="trip-content">
          <h3>${trip.destination}</h3>
          <p><strong>From:</strong> ${trip.startDate}</p>
          <p><strong>To:</strong> ${trip.endDate}</p>
          <p><strong>Travelers:</strong> ${trip.travelers}</p>
          <p><strong>Transport:</strong> ${trip.transport}</p>
          <p><strong>Budget:</strong> ₹${trip.budget}</p>
          <p><strong>Details:</strong> ${trip.details}</p>
           </div>
        </div>
      `
      )
      .join("");
  } catch (err) {
    console.error("Fetch trips error:", err);
    container.innerHTML = `<p style="color:red;">Failed to load trips. Try again later.</p>`;
  }
});
