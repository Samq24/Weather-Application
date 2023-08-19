const apiKey = 'API_Key';
const searchButton = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');

searchButton.addEventListener('click', () => {
  const city = cityInput.value;
  if (city === '') {
    weatherInfo.innerHTML = 'Por favor, ingresa una ciudad válida.';
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.cod === '404') {
        weatherInfo.innerHTML = 'Ciudad no encontrada. Por favor, verifica el nombre.';
      } else {
        const temperature = data.main.temp;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        weatherInfo.innerHTML = `
          <p>Clima en ${city}: </p>
          <p>Temperatura: ${temperature}°C</p>
          <p>Humedad: ${humidity}%</p>
          <p>Velocidad del viento: ${windSpeed} m/s</p>
        `;
      }
    })
    .catch(error => {
      console.log(error);
      weatherInfo.innerHTML = 'Ha ocurrido un error al obtener el clima. Por favor, intenta nuevamente.';
    });
});
