import { getCityWeather } from './index.js';

const searchForm = document.querySelector('#search');
const celsButton = document.querySelector('#button-cels');
const fahrButton = document.querySelector('#button-fahr');

let isFahr = true;

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const cityName = document.querySelector('#city-name').value.trim();
  if (cityName) {
    fetchAndDisplayWeather(cityName);
  }
});

celsButton.addEventListener('click', () => {
  if (isFahr) {
    displayAsCelsius();
    fahrButton.classList.remove('activated');
    celsButton.classList.add('activated');
    isFahr = false;
  }
});

fahrButton.addEventListener('click', () => {
  if (!isFahr) {
    displayAsFahrenheit();
    fahrButton.classList.add('activated');
    celsButton.classList.remove('activated');
    isFahr = true;
  }
});

function displayWeatherData(weatherData) {
  const viewLocation = document.getElementById('location');
  const viewCurrentTemp = document.getElementById('current-temp');
  const viewIcon = document.getElementById('weather-icon');
  const viewConditions = document.getElementById('conditions');
  const viewRainChance = document.getElementById('rain-chance-number');
  const viewHumidity = document.getElementById('humidity');
  const viewTempMin = document.getElementById('min-temp');
  const viewTempMax = document.getElementById('max-temp');

  viewLocation.textContent = weatherData.location;
  viewCurrentTemp.textContent = weatherData.tempCurrent;
  viewIcon.src = `SVG/${weatherData.icon}.svg`;
  viewConditions.textContent = weatherData.conditions;
  viewRainChance.textContent = `${weatherData.precipProb}%`;
  viewHumidity.textContent = `${weatherData.humidity}%`;
  viewTempMin.textContent = weatherData.tempMin;
  viewTempMax.textContent = weatherData.tempMax;
}

async function fetchAndDisplayWeather(cityName) {
  setMainChildVisibility(false);

  const loading = document.querySelector('.loading-div');
  loading.style.visibility = 'visible';

  try {
    const weatherData = await getCityWeather(cityName);
    displayWeatherData(weatherData);
  } catch (error) {
    console.log(error);
  }

  loading.style.visibility = 'hidden';
  setMainChildVisibility(true);
}

function setMainChildVisibility(visible) {
  const mainContainer = document.querySelector('.main-container');
  Array.from(mainContainer.children).forEach((child, index) => {
    if (index !== 0) {
      child.style.visibility = visible ? 'visible' : 'hidden';
    }
  });
}

function displayAsCelsius() {
  // Change units to °c
  const tempUnits = document.querySelectorAll('.temp-unit');
  tempUnits.forEach((temp) => {
    temp.textContent = '°c';
  });

  // Convert temps to °c
  const temps = document.querySelectorAll('.temp');
  temps.forEach((temp) => {
    temp.textContent = convertToCelsius(temp.textContent);
  });
}

function convertToCelsius(temp) {
  let convertedNumber = (temp - 32) / 1.8;
  convertedNumber = parseFloat(convertedNumber.toFixed(1));
  return convertedNumber % 1 === 0 ? convertedNumber.toFixed(0) : convertedNumber.toFixed(1);
}

function displayAsFahrenheit() {
  // Change units to °F
  const tempUnits = document.querySelectorAll('.temp-unit');
  tempUnits.forEach((temp) => {
    temp.textContent = '°F';
  });

  // Convert temps to °F
  const temps = document.querySelectorAll('.temp');
  temps.forEach((temp) => {
    temp.textContent = convertToFahrenheit(temp.textContent);
  });
}

function convertToFahrenheit(temp) {
  let convertedNumber = temp * 1.8 + 32;
  convertedNumber = parseFloat(convertedNumber.toFixed(1));
  return convertedNumber % 1 === 0 ? convertedNumber.toFixed(0) : convertedNumber.toFixed(1);
}

fetchAndDisplayWeather('tokyo');
