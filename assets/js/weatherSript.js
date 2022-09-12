console.log("Hello World!!!")

var apiKey = '13765804293c80fb9eac8b6b1d0beeb5';
var locationName; // will store user input based on location
var locationForm = document.querySelector('#location-form');
var locationInput = document.querySelector('#location-input');

var submitLocationInput = function(event) {
    event.preventDefault();
    locationName = locationInput.value.trim();
    console.log('user entered: ' + locationName);
    firstCall(locationName);
};

var firstCall = function(location) {
    
    // check if the input isn't empty string and make a call
    if (locationName) {
        var firstURL = 'https://api.openweathermap.org/data/2.5/weather?q='+locationName+'&appid='+apiKey+'&units=imperial';
        fetch(firstURL).then(function(response) {
            // check if entered location name actually exists
            if(response.ok) {
                response.json().then(function(data) {
                    // call getGeoLocation to get longitude and latitude for the precise weather at a requested location
                    console.log(data);
                    getGeoLocation(locationName, data);
                });
            } else {
                alert('sorry, location with this name not found');
            }
        })
        // show an alert in case there's network error
        .catch(function(error) {
            alert('unable to connect to server. try again later');
        })
        // empty the input field
        locationInput.value = '';

    // show an alert if user submits empty field    
    } else {
        alert('Please enter a location name');
    }
    
};

var getGeoLocation = function(locationName, data) {
    var lon = data.coord.lon;
    var lat = data.coord.lat;
    // round these values to two decimals to re-use in the secondCall
    var newLon = Math.round(lon *100)/100;
    var newLat = Math.round(lat *100)/100;
    console.log('this is geo coordinates for: '+ locationName + ' ' + newLon + ' ' + newLat);
    secondCall(newLon, newLat);
};

var secondCall = function(newLon, newLat) {
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

// this is where we're extracting weather conditions from
var getParameters = function(locationName, weatherInfo) {

    var currTemp = weatherInfo.current.temp; // in F
    var currClouds = weatherInfo.current.clouds; //cloudiness in %
    var currHumidity = weatherInfo.current.humidity; // in %
    var currRain = weatherInfo.current.rain; // if available shows in volume mm

}



locationForm.addEventListener("submit", submitLocationInput);