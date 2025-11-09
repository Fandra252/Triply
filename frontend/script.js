// 📱 Mobile navbar toggle
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});



// 🧭 Sidebar toggle
const sidebar = document.getElementById("sidebar");
function toggleSidebar() {
  sidebar.classList.toggle("active");
}




// 🎯 Community dropdown toggle
const communityLink = document.getElementById("community-link");
const communityMenu = document.getElementById("community-menu");

communityLink.addEventListener("click", (e) => {
  e.preventDefault(); // link ka default click (page reload) rokta hai
  communityMenu.classList.toggle("show"); // toggle class
});




// 🎯 Auto Budget Calculator based on transport type
const transportSelect = document.getElementById("transport");
const peopleInput = document.getElementById("people");
const budgetInput = document.getElementById("budget");

function updateBudget() {
  const transport = transportSelect.value;
  const people = parseInt(peopleInput.value) || 0;

  let baseFare = 0;

  // Different budget base per person
  if (transport === "train") baseFare = 1500;
  else if (transport === "flight") baseFare = 5000;
  else if (transport === "bus") baseFare = 1000;

  // total budget = fare * no. of travelers
  const totalBudget = baseFare * people;

  // update input value
  budgetInput.value = totalBudget ? totalBudget : "";
}

// listen for changes
transportSelect.addEventListener("change", updateBudget);
peopleInput.addEventListener("input", updateBudget);






// 🎯 Create Trip Budget Calculator
const form = document.getElementById("tripForm");
const startDate = document.getElementById("start-date");
const endDate = document.getElementById("end-date");
const transportSelect = document.getElementById("transport");
const peopleInput = document.getElementById("people");
const budgetInput = document.getElementById("budget");

// Function to calculate number of days between dates
function calculateDays() {
  const start = new Date(startDate.value);
  const end = new Date(endDate.value);
  const diff = (end - start) / (1000 * 60 * 60 * 24);
  return diff > 0 ? diff + 1 : 0; // +1 to include both start & end days
}

// Auto calculate budget
function updateBudget() {
  const days = calculateDays();
  const transport = transportSelect.value;
  const people = parseInt(peopleInput.value) || 0;

  let baseFare = 0;

  // Different cost per person per day based on transport
  if (transport === "train") baseFare = 800;
  else if (transport === "flight") baseFare = 2500;
  else if (transport === "bus") baseFare = 500;

  // Formula: cost per day * number of days * number of travelers
  const totalBudget = baseFare * days * people;

  budgetInput.value = totalBudget ? totalBudget : "";
}

// Listen to all changes
[startDate, endDate, transportSelect, peopleInput].forEach(el => {
  el.addEventListener("input", updateBudget);
});




