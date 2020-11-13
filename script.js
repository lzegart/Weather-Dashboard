const ApiKey = "03d0b94c2b5dfcca7119629cfe737f72";
let searchInput = $("#search-input")
let previousSearches = []
let allSearches = JSON.parse(localStorage.getItem("previousSearches"))
if(allSearches !== null) {
    previousSearches = allSearches
}
console.log(previousSearches)
let display = $("#display")

let getWeather = document.getElementById("get-weather")
getWeather.addEventListener("click", function(event) {

    let cityName = searchInput.val()
    saveCity(cityName)
    console.log(cityName)

    function getCityWeather(cityName) {
        // fetch weather data
        let query = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=03d0b94c2b5dfcca7119629cfe737f72`
        fetch(query)
        .then(function(response) {
            console.log(response.status)
            return response.json();
        })  
        .then(function(data) {
            // fetch uv data
            let lat = data.coord.lat
            let lon = data.coord.lon
            fetch(`http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${ApiKey}`)
            .then(function(response) {
                return response.json();
            })
            .then(function(uvData) {
                console.log({uvData})
                $("#city-uv-index").text("UV Index: " + uvData.value)
            })
            console.log(data)
            // displaying weather info
            $("#city-name").text(cityName)
            $("#city-temp").text("Temp: " + data.main.temp + "F")
            $("#city-wind").text("Wind Speed: " + data.wind.speed)
            $("#city-humidity").text("Humidity: " + data.main.humidity)
            let iconCode = data.weather[0].icon
            $("#weather-icon").attr("src", `http://openweathermap.org/img/wn/${iconCode}@2x.png`)
            // diplay date & time
            const currentDate = moment().format('MMMM Do YYYY, H:mm')
            console.log(currentDate)
            $("#time").text(currentDate)
            
            // display.classList.remove("hide");

            fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${ApiKey}`)
            .then(function(response) {
                console.log(response.status)
                return response.json();
            })
            .then(function(data) {
            console.log("forcast", data)
            // displaying forcast 
            $("#day-two").text(data.forcast.list[1])
            $("#day-three").text(forcast.list[2])
            $("#day-four").text("Wind Speed: " + data.wind.speed)
            $("#day-five").text("Humidity: " + data.main.humidity)           
            $("#day-icon").attr("src", `http://openweathermap.org/img/wn/${iconCode}@2x.png`)
            })
            
        })
    }
    
     getCityWeather(cityName)
     
})

 // // display search history
function saveCity(cityName) {
    previousSearches.push(cityName)
    localStorage.setItem("previousSearches", JSON.stringify(previousSearches))
    var output = ''; 
    var objectFromLS = JSON.parse(localStorage.getItem('previousSearches'));
        for (var key in objectFromLS) {
            if (objectFromLS.hasOwnProperty(key)) {
            output = output+(objectFromLS[key] + '<br>');
            
            }
        }
        $('#city-history').html(output) 
        // buttonEl.innerHTML = data.value;
}

// buttonEl.getElementById("city-history").innerHTML = localStorage.getItem("previousSearches");

// 

