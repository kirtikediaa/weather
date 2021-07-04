const form = document.querySelector(".form");
const submitBtn = document.querySelector(".submit-btn");
const error = document.querySelector(".error-msg");
const toggleSwitch = document.querySelector(".switch");
const temperature=document.querySelector(".degree");
const feelsLike=document.querySelector(".feels-like");

form.addEventListener('submit', handleSubmit);
submitBtn.addEventListener('click', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  fetchWeather();
}
// get location from user
function fetchWeather() {
    const input = document.querySelector('.inputCity');
    const userLocation = input.value;
    getWeatherData(userLocation);
  }

async function getWeatherData(location) {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=e43b300740b05e082104769e9a56d923`,
    {
      mode: 'cors',
    }
  );
  if (response.status === 400) {
    throwErrorMsg();
  } else {
    error.style.display = 'none';
    const weatherData = await response.json();
    const newData = processData(weatherData);
    displayData(newData);
    reset();
  }
}

function throwErrorMsg() {
  error.style.display = 'block';
  if (error.classList.contains('fade-in')) {
    error.style.display = 'none';
    error.classList.remove('fade-in2');
    error.offsetWidth;
    error.classList.add('fade-in');
    error.style.display = 'block';
  } else {
    error.classList.add('fade-in');
  }
}

function processData(weatherData) {
  // grab all the data i want to display on the page
  const myData = {
    condition: weatherData.weather.description,
    feelsLike: weatherData.main.feels_like,
    currentTemp: weatherData.main.temp,   
    
    wind: Math.round(weatherData.wind.speed),
    humidity: weatherData.main.humidity,
    location: weatherData.name.toUpperCase()       
  };

 


  return myData;
}

function displayData(newData) {
  const weatherInfo = document.getElementsByClassName('info');
  Array.from(weatherInfo).forEach((div) => {
    if (div.classList.contains('fade-in2')) {
      div.classList.remove('fade-in2');
      div.offsetWidth;
      div.classList.add('fade-in2');
    } else {
      div.classList.add('fade-in2');
    }
  });
  document.querySelector('.condition').textContent = newData.condition;
  document.querySelector(
    '.location'
  ).textContent = `${newData.location}`;
  document.querySelector('.degrees').textContent = newData.currentTemp;
  document.querySelector(
    '.feels-like'
  ).textContent = `FEELS LIKE: ${newData.feelsLike}`;
  document.querySelector('.wind').textContent = `WIND: ${newData.wind} MPH`;
  document.querySelector(
    '.humidity'
  ).textContent = `HUMIDITY: ${newData.humidity}`;
}

function reset() {
  form.reset();
}
tempFeel=newData.feelsLike;

toggleSwitch.addEventListener('change', () => {
    if (toggleSwitch.checked) {
      setTimeout(() => {
        temp = toFahrenheit(temp);
        tempFeel = toFahrenheit(tempFeel);
        temperature.innerHTML = `${temp + '&degF'}`;
        feelsLike.innerHTML = `${'Feels like: '}${tempFeel + '&deg'}`;
      }, 150);
    } else {
      setTimeout(() => {
        temp = toCelsius(temp);
        tempFeel = toCelsius(tempFeel);
        temperature.innerHTML = `${temp + '&degC'}`;
        feelsLike.innerHTML = `${'Feels like: '}${tempFeel + '&deg'}`;
      }, 150);
    }
  });


/* Temperature Converters*/
function kelvinToCelcius(temp) {
  temp = parseFloat(temp);
  temp = Math.round((temp = temp - 273.15));
  return temp;
}
function kelvinToFahrenheit(temp) {
  temp = parseFloat(temp);
  temp = Math.round(((temp = temp - 273.15) * 9) / 5 + 32);
  return temp;
}
function toFahrenheit(temp) {
  temp = parseFloat(temp);
  temp = Math.round((temp = temp * 1.8 + 32));
  return temp;
}
function toCelsius(temp) {
  temp = parseFloat(temp);
  temp = Math.round((temp = (temp - 32) * (5 / 9)));
  return temp;
}




