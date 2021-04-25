let appId = 'b3a8647b8260c8ca84760d0995fdd40b';
let units = 'metric';
let searchMethod;

function getSearchMethod(searchTerm) {
    if(searchTerm === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else
        searchMethod = 'q';
}

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`)
    .then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}

function init(resultFromServer) {
    console.log(resultFromServer);
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = 'url("./img/clear.jpg")';
            break;

        case 'Clouds':   
            document.body.style.backgroundImage = 'url("./img/cloudy.jpg")';
            break;

        case 'Rain': 
        case 'Drizzle':
        case 'Mist':   
            document.body.style.backgroundImage = 'url("./img/rain.jpg")';
            break;

        case 'Snow':
            document.body.style.backgroundImage = 'url("./img/snow.jpg")';
            break;

        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("./img/storm.jpg")';
            break;
    
        default:
            break;
    }
    let cityHeader = document.getElementById('cityHeader');
    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let countryName = document.getElementById('countryName');
    let temperatureElement = document.getElementById('temperature');
    let weatherIcon = document.getElementById('documentIconImg');
    let windSpeedElement = document.getElementById('windSpeed');
    let humidityElement = document.getElementById('humidity');
    let tempMinElement = document.getElementById('tempMin');
    let tempMaxElement = document.getElementById('tempMax');

    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';
    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
    tempMinElement.innerHTML = "Low : " + Math.floor(resultFromServer.main.temp_min) + '&#176' + "C";
    tempMaxElement.innerHTML = "High : " + Math.ceil(resultFromServer.main.temp_max) + '&#176' + "C";
    humidityElement.innerHTML = "Humidity : " + resultFromServer.main.humidity + '%';
    windSpeedElement.innerHTML = "Wind Speed : " + Math.floor(resultFromServer.wind.speed) + "m/s";
    cityHeader.innerHTML = resultFromServer.name;
    countryName.innerHTML = resultFromServer.sys.country;
    
    setPositionForWeatherInfo();
}

function setPositionForWeatherInfo() {
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/2}px)`;
    weatherContainer.style.visibility = 'visible';
}

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm)
        searchWeather(searchTerm);
})