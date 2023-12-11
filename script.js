const inputCont = document.querySelector(".input-cont");
const inputCity = document.querySelector(".input-text");
const button = document.querySelector(".btn");
const weatherCont = document.querySelector('.weather-cont');
const weatherTemp = document.querySelector('.weather-temp');
const weatherIcons = document.querySelector('.weather-icon');
const weatherHum = document.querySelector('.hum');
const weatherFeels = document.querySelector('.feels');

const geo_api_key = "8b4159083268edd802fcb6121d856cd0";
const weather_api_key = "caae1da39f1b961584c740ee0ec43f14";


inputCity.addEventListener('input', function(){
  if(inputCity.value == null || inputCity.value == "") {
    if(weatherCont && weatherTemp && weatherIcons && weatherHum && weatherFeels){
      weatherCont.style.display = 'none';
      weatherTemp.style.display = 'none';
      weatherIcons.style.display = 'none';
      weatherHum.style.display = 'none';
      weatherFeels.style.display = 'none';
    }
  } else {
    if(weatherCont && weatherTemp && weatherIcons && weatherHum && weatherFeels){
      weatherCont.style.display = 'block';
      weatherTemp.style.display = 'block';
      weatherIcons.style.display = 'block';
      weatherHum.style.display = 'block';
      weatherFeels.style.display = 'block';
    }
  }
});

button.addEventListener('click', (e) => {
  e.preventDefault();

  const cityName = inputCity.value;

  const geo_api_url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${geo_api_key}`;

  fetch(geo_api_url)
  .then(res => res.json())
  .then(data => {
  const cityData  = data[0];
  const {name, lat, lon} = cityData;
  console.log(cityData)
  weatherCont.innerHTML =
  `<p>${name}</p>`;

  const weather_api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weather_api_key}`;

  
  fetch(weather_api_url)
  .then(res => res.json())
  .then(weatherData => {
   const {temp} = weatherData.main;
   console.log(weatherData)
   const roundedTemp = Math.round(temp);
   weatherTemp.innerHTML =
   `<p>${roundedTemp}°C</p>`;

   const iconCode = weatherData.weather[0].icon;

   const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

   weatherIcons.innerHTML = 
   `<img src="${iconUrl}" alt="icon"/>`
 
  
  const {humidity} = weatherData.main;
  weatherHum.innerHTML = 
  `Nem: ${humidity}%`

  const {feels_like} = weatherData.main;
  const roundedFeels = Math.round(feels_like);
  weatherFeels.innerHTML =
  `Hissedilen: ${roundedFeels}°C`
  })

  })
  .catch(error => console.log(error))
});




