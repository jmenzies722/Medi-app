// Establish a connection to the server
const serverUrl = "http://192.168.1.1"; // Dummy IP address of  ESP32
const serverPort = "80";
const serverEndpointSlot = "/api/slot";
const serverEndpointSchedule = "/api/schedule";
const serverEndpointRoot = "/";

// Get references to HTML elements
const slots = document.querySelectorAll(".slot button");
const scheduleForm = document.querySelector(".schedule form");
const slotSelect = document.getElementById("slot");
const timeSelect = document.getElementById("time");

// Add event listeners to slots
slots.forEach((slot, index) => {
  slot.addEventListener("click", () => {
    // Send the slot selection to the server
    const slotId = index + 1;
    const url = serverUrl + ":" + serverPort + serverEndpointSlot;
    fetch(url, {
      method: "POST",
      body: "id=" + slotId,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((response) => {
        if (response.ok) {
          alert("Slot " + slotId + " selected");
        } else {
          alert("Error selecting slot: " + response.statusText);
        }
      })
      .catch((error) => {
        alert("Error selecting slot: " + error.message);
      });
  });
});

// Add event listener to schedule form
scheduleForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get the selected slot and time
  const slotId = slotSelect.value;
  const timeValue = timeSelect.value;
  const timeParts = timeValue.split(":");
  const hours = timeParts[0];
  const minutes = timeParts[1];

  // Send the schedule to the server
  const url = serverUrl + ":" + serverPort + serverEndpointSchedule;
  fetch(url, {
    method: "POST",
    body: "slot=" + slotId + "&time=" + hours + ":" + minutes,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  })
    .then((response) => {
      if (response.ok) {
        alert("Slot " + slotId + " scheduled for " + timeValue);
      } else {
        alert("Error scheduling slot: " + response.statusText);
      }
    })
    .catch((error) => {
      alert("Error scheduling slot: " + error.message);
    });
});

// Add event listener to root path
document.addEventListener("DOMContentLoaded", () => {
  const url = serverUrl + ":" + serverPort + serverEndpointRoot;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error connecting to server");
      }
    })
    .catch((error) => {
      alert(error.message);
    });
});


