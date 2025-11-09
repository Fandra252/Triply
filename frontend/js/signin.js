document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signinForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = e.target[0].value.trim();
    const password = e.target[1].value.trim();

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Login successful!");
        localStorage.setItem("user", JSON.stringify(data.user)); // store user info
        localStorage.setItem("token", data.token); // store token
        window.location.href = "create-trip.html";
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Please try again.");
    }
  });
});
