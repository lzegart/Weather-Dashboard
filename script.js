const ApiKey = "03d0b94c2b5dfcca7119629cfe737f72";
 

function getCityWeather(cityName) {
    let query = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=03d0b94c2b5dfcca7119629cfe737f72`
    fetch(query)
    .then(function(response) {
        return response.json();
    })  
    .then(function(data) {
        console.log(data)
        $("#city-name").text(cityName)
        $("#city-temp").text(data.main.temp)
    })
}

getCityWeather("Houston")

