const apiKey = '8b6f7f215c843166ec100bc74bbb7250';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();

    if (city === '') {
        alert('Please enter a city.');
        return;
    }

    const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);  // Log the API response
            updateWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function updateWeather(data) {
    const locationElement = document.querySelector('.location');
    const temperatureElement = document.querySelector('.temperature');
    const descriptionElement = document.querySelector('.description');
    const precipitationElement = document.querySelector('.precipitation');

    console.log(locationElement, temperatureElement, descriptionElement, precipitationElement);

    if (!data || !data.name || !data.sys || !data.main || !data.weather) {
        console.error('Invalid weather data:', data);
        return;
    }

    const city = data.name;
    const country = data.sys.country;
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const precipitation = data.rain ? `Precipitation: ${data.rain['1h']} mm/h` : 'Precipitation: N/A';

    try {
        locationElement.textContent = `${city}, ${country}`;
        temperatureElement.textContent = `${temperature}°C`;
        descriptionElement.textContent = description;
        precipitationElement.textContent = precipitation;
    } catch (error) {
        console.error('Error setting text content:', error);
    }

    const body = document.body; // Add this line to get the body element

    // Dynamic background based on weather condition
    if (description.includes('clear')) {
        body.style.backgroundImage = 'url("images/clear-sky-background.jpg")';
    } else if (description.includes('cloud')) {
        body.style.backgroundImage = 'url("images/cloudy-background.jpg")';
    } else if (description.includes('rain')) {
        body.style.backgroundImage = 'url("images/rainy-background.jpg")';
    } else if (description.includes('snow')) {
        body.style.backgroundImage = 'url("images/snowy-background.jpg")';
    }else if (description.includes('haze')) {
        body.style.backgroundImage = 'url("images/hazy-background.jpg")';
    }else if (description.includes('smoke')) {
        body.style.backgroundImage = 'url("images/smoky-background.jpg")';
    }else {
        // Default background if condition not matched
        body.style.backgroundImage = 'url("images/default-background.jpg")';
    }
}
