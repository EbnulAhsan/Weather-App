
const API_KEY = 'bd5e378503939ddaee76f12ad7a97608';


const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const loadingState = document.getElementById('loadingState');
const initialState = document.getElementById('initialState');
const weatherCard = document.getElementById('weatherCard');


const cityName = document.getElementById('cityName');
const weatherIcon = document.getElementById('weatherIcon');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const feelsLike = document.getElementById('feelsLike');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');

// Event Listeners
searchBtn.addEventListener('click', fetchWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchWeather();
    }
});


async function fetchWeather() {
    const city = cityInput.value.trim();
    
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    
    showLoading();

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        displayWeather(data);
        
    } catch (error) {
        alert('City not found. Please try again.');
        showInitialState();
    }
}


function displayWeather(data) {
    cityName.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    feelsLike.textContent = `Feels like ${Math.round(data.main.feels_like)}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} m/s`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    weatherIcon.alt = data.weather[0].description;

    
    loadingState.classList.add('hidden');
    initialState.classList.add('hidden');
    weatherCard.classList.remove('hidden');
}


function showLoading() {
    loadingState.classList.remove('hidden');
    initialState.classList.add('hidden');
    weatherCard.classList.add('hidden');
}

function showInitialState() {
    loadingState.classList.add('hidden');
    initialState.classList.remove('hidden');
    weatherCard.classList.add('hidden');
}
