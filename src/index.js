import './style.css';

class WeatherObj {
  constructor({ location, icon, conditions, precipProb, tempCurrent, tempMin, tempMax, humidity }) {
    this.location = location;
    this.icon = icon;
    this.conditions = conditions;
    this.precipProb = precipProb;
    this.tempCurrent = tempCurrent;
    this.tempMin = tempMin;
    this.tempMax = tempMax;
    this.humidity = humidity;
  }
}

async function fetchData(city) {
  let cityData;
  try {
    let response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=8CT7Y6AMEULH45Y3KZ5CBL92R`
    );
    cityData = await response.json();
    console.log(cityData);
    return cityData;
  } catch (err) {
    console.log(err);
  }
}

function createWeatherObj(cityData) {
  const cityDataFiltered = {
    location: cityData.resolvedAddress,
    icon: cityData.currentConditions.icon,
    conditions: cityData.currentConditions.conditions,
    precipProb: cityData.currentConditions.precipprob,
    tempCurrent: cityData.currentConditions.temp,
    tempMin: cityData.days[0].tempmin,
    tempMax: cityData.days[0].tempmax,
    humidity: cityData.currentConditions.humidity,
  };

  return new WeatherObj(cityDataFiltered);
}

async function getCityWeather(city = 'prague') {
  const fetchedData = await fetchData(city);
  const weatherobj = createWeatherObj(fetchedData);
  console.log(weatherobj);
}

getCityWeather();
