console.log("weatherrr")

var apiKey = '13765804293c80fb9eac8b6b1d0beeb5';

var locationName; // whatever location i'll get from Kabir
var lon; // getting geo coordinates from Kabir
var lat;

// variables for temperature parameters forms to filter weather data
var tempForm = document.querySelector("#temp-selection");


var cloudForm = document.querySelector("#cloud-selection");
var humidForm = document.querySelector("#humid-selection");
var rainForm = document.querySelector("#precipitation-selection");
var weatherButton = document.querySelector("#weather-submit");







var submitWeatherHandler = function(event) {
    event.preventDefault();

    // capture user's selection
    var userTempValue = tempForm.options[tempForm.selectedIndex].value;
    var userCloudValue = cloudForm.options[cloudForm.selectedIndex].value;
    var userHumidValue = humidForm.options[humidForm.selectedIndex].value;
    var userRainValue = rainForm.options[rainForm.selectedIndex].value;
    console.log(userTempValue, userCloudValue, userHumidValue, userRainValue);
    
    // create an IF statement to check if the option was actually selected, if not show a modal?
    getTemp(userTempValue);
    //getCLoud(userCloudValue);
    //getHumid(userHumidValue);
    //getRain(userRainValue);

};

var getGeoLocation = function(locationName, data) {
    // converting Kabir's coordinates for my api call
    var newLon = Math.round(lon *100)/100;
    var newLat = Math.round(lat *100)/100;
    console.log('this is geo coordinates for: '+ locationName + ' ' + newLon + ' ' + newLat);
    weatherCall(newLon, newLat);
};

var weatherCall = function(newLon, newLat) {
    var secondURL = 'https://api.openweathermap.org/data/3.0/onecall?lat='+newLat+'&lon='+newLon+'&units=imperial&exclude=minutely&appid='+apiKey;
    fetch(secondURL).then(function(response) {
        if(response.ok) {
            response.json().then(function(weatherInfo) {
                console.log(weatherInfo);
                getParameters(weatherInfo);
            })
        } else {
            alert('not found');
        }
    })
    .catch(function(error) {
        console.log('unable to connect to server. try again later');
    });
}


// get temp for requested location and temp range
var getTemp = function(geoLocation, userTempValue) {

    //var option1 = tempForm.options[tempForm.selectedIndex];
    console.log(tempForm.selectedIndex); // shows index number of selected option
    console.log(tempForm.options[tempForm.selectedIndex].value); // shows value of the selected option
    console.log(tempForm.options[1].value); // shows the value of the first option in the html list

    if (userTempValue = tempForm.options[1].value) {
        console.log('user chose first option');
    }
}




// get cloudiness for requested location and range
var getCLoud = function(geoLocation, userCloudValue) {

}



// get humidity for selected location and range
var getHumid = function(geoLocation, userHumidValue) {

}




// get precipitation for selected location and boolean
var getRain = function(geoLocation, userRainValue) {

}


// put all parameters in one function to call
var getAllWeather = function() {

    

}



weatherButton.addEventListener("click", submitWeatherHandler);