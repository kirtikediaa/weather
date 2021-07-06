const form = document.querySelector(".form");
const submitBtn = document.querySelector(".submit-btn");
const error = document.querySelector(".error-msg");
const toggleSwitch =  document.getElementById('switch');
const temperature=document.querySelector(".degree");
const feelsLike=document.querySelector(".feels-like");
const input = document.querySelector('.inputCity');

form.addEventListener('submit', handleSubmit);
submitBtn.addEventListener('click', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  fetchWeather();
}
async function getWeatherData(location) {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=e43b300740b05e082104769e9a56d923`,
    {
      mode: 'cors',
    }
  );
  if (response.status === 404) {
    throwErrorMsg();
    reset();
    clear();
    // submitBtn.addEventListener('click', reloadDIV);
    setTimeout(reloadDIV, 3000);
    console.log("1");
    
     
  } else {
    error.style.display = 'none';
    const weatherData = await response.json();
    const newData = processData(weatherData);
    displayData(newData);
    reset();
    
  }
}
function reloadDIV () {
  location.reload();
}

function throwErrorMsg() {
  error.style.display = 'block';
  alert("Invalid location");
  
  
}
function clear(){
 document.getElementById('wd').innerHTML = "";
  document.getElementById('wdi').innerHTML = "";

  document.getElementById('inp').value =" ";


}

function processData(weatherData) {
  
  const myData = {
    // condition: weatherData.weather.description,
    
    feelsLike: weatherData.main.feels_like,
    currentTemp: weatherData.main.temp,   
    
    wind: Math.round(weatherData.wind.speed),
    humidity: weatherData.main.humidity,
    location: weatherData.name.toUpperCase()       
  };
  

   return myData;
}

function displayData(newData) {
    // document.getElementById('cd').innerHTML = newData.condition;
  document.querySelector(
    '.location'
  ).textContent = `${newData.location}`;
  document.querySelector('.degrees').textContent = newData.currentTemp+' F';
  feelsLike.textContent = `FEELS LIKE: ${newData.feelsLike} F`;
  document.querySelector('.wind').textContent = `WIND: ${newData.wind} MPH`;
  document.querySelector(
    '.humidity'
  ).textContent = `HUMIDITY: ${newData.humidity}`;

  let temp = newData.currentTemp;
let tempFeel = newData.feelsLike

toggleSwitch.addEventListener('change', () => {
    if (toggleSwitch.checked) {
        console.log("toggle"+toggleSwitch.checked);
        setTimeout(() => {
            temp = toCelsius(temp);
            tempFeel = toCelsius(tempFeel);
            console.log("temp"+temp);
            console.log(tempFeel);
            document.getElementById('deg').innerHTML = `${temp + '&degC'}`;
            document.getElementById('fl').innerHTML = `${'Feels like: '}${tempFeel + '&degC'}`;
          }, 150);
      
    } else {

        setTimeout(() => {
            temp = toFahrenheit(temp);
            tempFeel = toFahrenheit(tempFeel);
            console.log("TEMPFEEL"+tempFeel);
            document.getElementById('deg').innerHTML= `${temp + '&degF'}`;
            document.getElementById('fl').innerHTML= `${'Feels like: '}${tempFeel + '&degF'}`;
          }, 150);

    }
  });

}

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

  

function reset() {
  form.reset();
}
function fetchWeather() {
   
    const userLocation = input.value;
    getWeatherData(userLocation);
  }




