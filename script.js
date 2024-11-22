// Select DOM elements
const form = document.querySelector("form");
const input = document.querySelector("input");
const weatherDiv = document.querySelector("main div");

// API credentials and base URL
const apiKey = "ef660cbb289a327dd118120815910827";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

// Event listener for form submission
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent default form submission behavior
  const city = input.value.trim(); // Trim whitespace from input value

  if (city) getWeather(city); // Fetch weather only if input is not empty
});

// Fetch default weather on page load
document.addEventListener("DOMContentLoaded", () => {
  getWeather("Porto"); // Default city
});

/**
 * Fetch weather data from OpenWeatherMap API
 * @param {string} city - City name to fetch weather for
 */
async function getWeather(city) {
  try {
    // Construct the API URL
    const url = `${baseUrl}?q=${city}&appid=${apiKey}&units=metric`;

    // Fetch data from the API
    const response = await fetch(url);

    // Handle non-200 responses
    if (!response.ok) throw new Error("City not found");

    // Parse JSON data
    const data = await response.json();

    // Display the weather data
    displayWeather(data);
  } catch (error) {
    // Display error message in the weather div
    weatherDiv.innerHTML = `<p>${error.message}</p>`;
  }
}

/**
 * Render weather data in the UI
 * @param {Object} data - Weather data object from the API
 */
function displayWeather(data) {
  const { name } = data; // City name
  const { description, icon } = data.weather[0]; // Weather details
  const { temp } = data.main; // Temperature

  // Update the weather div with weather details
  weatherDiv.innerHTML = `
    <h3>${name}</h3>
    <p>${description}</p>
    <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
    <p>${temp.toFixed(1)}°C</p>
  `;
}
