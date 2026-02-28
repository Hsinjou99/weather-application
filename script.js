const apiKey = 'key'; // Replace with your key
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city name');
    }
});

// event listener for enter key
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

async function getWeather(city) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
        if (!response.ok) {
            throw new Error('City not found or API error');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

// Show matched city, temp, weather condition, humidity, wind
function displayWeather(data) {
    const { location, current } = data;
    weatherInfo.innerHTML = `
        <h2>${location.name}, ${location.country}</h2>
        <p>Temperature: ${current.temp_c}°C (${current.temp_f}°F)</p>
        <p>Condition: ${current.condition.text}</p>
        <p>Humidity: ${current.humidity}%</p>
        <p>Wind: ${current.wind_kph} kph (${current.wind_dir})</p>
    `;
}