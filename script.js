const apiKey = '9ad76ea3ba72479c8ef55046262802'; // Replace with your key
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');
const locationBtn = document.getElementById('location-btn');

// event listener for location button
locationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                getWeather(`${lat},${lon}`);
            },
            (error) => {
                alert('Unable to retrieve your location. Please allow location access or enter a city name.');
            }
        );
    } else {
        alert('Geolocation is not supported by this browser. Please enter a city name.');
    }
});

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
    const condition = current.condition.text.toLowerCase();

    // Dynamic background
    if (condition.includes('rain') || condition.includes('drizzle')) {
        document.body.style.background = "linear-gradient(to bottom, #4facfe, #00f2fe)";
    } else if (condition.includes('cloud') || condition.includes('overcast')) {
        document.body.style.background = "linear-gradient(to bottom, #bdc3c7, #2c3e50)";
    } else if (condition.includes('snow')) {
        document.body.style.background = "linear-gradient(to bottom, #e6e9f0, #eef1f5)";
    } else {
        document.body.style.background = "linear-gradient(to bottom, #f6d365, #fda085)";
    }

    weatherInfo.innerHTML = `
        <h2>${location.name}, ${location.region}</h2>
        <h3>${location.country}</h3>
        <p>Temperature: ${current.temp_c}°C (${current.temp_f}°F)</p>
        <p>Condition: ${current.condition.text}</p>
        <p>Humidity: ${current.humidity}%</p>
        <p>Wind: ${current.wind_kph} kph (${current.wind_dir})</p>
    `;
}