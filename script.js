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
            function displayForcast() {
                $("#day-two").text(data.forcast.list.temp)
                $("#day-three").text(data.forcast.list.humidity)
                $("#day-four").text("Wind Speed: " + data.wind.speed)
                $("#day-five").text("Humidity: " + data.main.humidity)           
                $("#day-icon").attr("src", `http://openweathermap.org/img/wn/${iconCode}@2x.png`)
                }
                displayForcast()
            })
            
            // 2, 10, 18, 26, 34

            // diplay future dates
            const dayTwoDate = moment().add(1, 'days').calendar();
            const dayThreeDate = moment().add(2, 'days').calendar();
            const dayFourDate = moment().add(3, 'days').calendar();
            const dayFiveDate = moment().add(4, 'days').calendar();
            const daySixDate = moment().add(5, 'days').calendar();
            console.log(dayThreeDate)
            $("#day-two-date").text(dayTwoDate)
            $("#day-three-date").text(dayThreeDate)
            $("#day-four-date").text(dayFourDate)
            $("#day-five-date").text(dayFiveDate)
            $("#day-six-date").text(daySixDate)
        })
    }
    
     getCityWeather(cityName)
     
})

 // display search history
function saveCity(cityName) {
    previousSearches.push(cityName)
    localStorage.setItem("previousSearches", JSON.stringify(previousSearches))
    
    for (let i = 0; i < previousSearches.length; i++) {
        $("#city-history").append($(`<button index=${i} style="width: 20rem;" class="savedButtons">${allSearches[i]}</button>`))
        }
        $("#saved-buttons-card").on("click", "button", function(event) {
        console.log(allSearches[($(this).attr("index"))])
        displayPreviousSearch(allSearches[($(this).attr("index"))])
    })
    function displayPreviousSearch() {
        // $(".startAddress")
        console.log()
      }
}



