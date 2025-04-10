const search = document.querySelector("input");
const searchBtn = document.querySelector("button");
searchBtn.addEventListener("click", async function() {
    const place = search.value;
    const weather = await getWeather(place);
    displayWeather(weather);
})

async function getWeather(place) {
    const apiKey = "PCKSAAB8EBWVC3DKV48YXMBQE";
    try {
        const weather = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}/?key=${apiKey}`,
                    {mode: "cors"});
        const weatherData = await weather.json()
        
        const location = weatherData.resolvedAddress;
        const condition = weatherData.days[0].conditions;
        const icon = weatherData.days[0].icon;
        // convert the temperatures to celsius
        const temp = Math.round((weatherData.days[0].temp - 32) * 5/9);
        const tempMax = Math.round((weatherData.days[0].tempmax - 32) * 5/9);
        const tempMin = Math.round((weatherData.days[0].tempmin - 32) * 5/9);
        const precip = Math.round(weatherData.days[0].precip * 100);

        return {location: location, condition: condition, icon: icon, temp: temp, 
                tempMax: tempMax, tempMin: tempMin, precip: precip};

    } catch (error) {
        console.error(error);
    }
}

function displayWeather(weather) {
    const locationDisplay = document.querySelector("div.location");
    const conditionDisplay = document.querySelector("div.condition");
    const iconDisplay = document.querySelector("img.icon");
    const tempDisplay = document.querySelector("div.temp");
    const tempMaxDisplay = document.querySelector("div.temp-max");
    const tempMinDisplay = document.querySelector("div.temp-min");
    const precipDisplay = document.querySelector("div.precip");

    locationDisplay.textContent = weather.location;
    conditionDisplay.textContent = weather.condition;
    iconDisplay.src = displayIcon(weather.icon);
    tempDisplay.textContent = `${weather.temp} °C`;
    tempMaxDisplay.textContent = `Max:  ${weather.tempMax} °C`;
    tempMinDisplay.textContent = `Min:  ${weather.tempMin} °C`;
    precipDisplay.textContent = `Precip: ${weather.precip}%`;
}

function displayIcon(icon) {
    let iconImg;
    switch (icon) {
        case "clear-day":
            iconImg = "img/clear-day.svg";
            break;
        case "clear-night":
            iconImg = "img/clear-night.svg";
            break;
        case "cloudy":
            iconImg = "img/cloudy.svg";
            break;
        case "fog":
            iconImg = "img/fog.svg";
            break;
        case "partly-cloudy-day":
            iconImg = "img/partly-cloudy-day.svg";
            break;
        case "partly-cloudy-night":
            iconImg = "img/partly-cloudy-night.svg";
            break;
        case "rain":
            iconImg = "img/rain.svg";
            break;
        case "snow":
            iconImg = "img/snow.svg";
            break;
        case "wind":
            iconImg = "img/wind.svg";
            break;
    }
    return iconImg;
}