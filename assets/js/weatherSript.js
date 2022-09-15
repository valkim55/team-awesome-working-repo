
var apiKey = '13765804293c80fb9eac8b6b1d0beeb5';
var locationName = 'Maldives'; // whatever location i'll get from Kabir
var newLon; //rounded lon
var newLat; //rounded lat

// variables for temperature parameters forms to filter weather data
var tempForm = document.querySelector("#temp-selection");
var cloudForm = document.querySelector("#cloud-selection");
var humidForm = document.querySelector("#humid-selection");
var rainForm = document.querySelector("#precipitation-selection");
var weatherButton = document.querySelector("#weather-submit");
var displayResultsContainer = document.querySelector('#display-results');

//var locationRespons = [];
var fiveLocations = ['Seattle', 'New Orleans', 'Seoul', 'Barcelona', 'Reykjavik']
fiveLocations[0] = ['-122.3321', '47.6062'];
fiveLocations[1] = ['-90.0751', '29.9547'];
fiveLocations[2] = ['126.9778', '37.5683'];
fiveLocations[3] = ['2.159', '41.3888'];
fiveLocations[4] = ['-21.8954', '64.1355'];

// array with rounded geo coordinates
var updatedFiveLocations = []
console.log(updatedFiveLocations)



// all locations weather results
var allTemps = [];
console.log(allTemps);

var allClouds = [];
console.log(allClouds);

var allHumids = [];
console.log(allHumids);

var allPOPs = [];
console.log(allPOPs);




var getNewTemp = function(weatherInfo) {
    var newTemp = weatherInfo.current.temp;
    allTemps.push(newTemp);
    console.log(newTemp);
}

var getNewCloud = function(weatherInfo) {
    var newCloud = weatherInfo.current.clouds;
    allClouds.push(newCloud);
    console.log(newCloud);
}

var getNewHumid = function(weatherInfo) {
    var newHumid = weatherInfo.current.humidity;
    allHumids.push(newHumid);
    console.log(newHumid);
}

var getNewPOP = function(weatherInfo) {
    var newPOP = weatherInfo.hourly[0].pop;
    allPOPs.push(newPOP);
    console.log(newPOP);
}






var weatherCall = function() {
    var secondURL = 'https://api.openweathermap.org/data/3.0/onecall?lat='+newLat+'&lon='+newLon+'&units=imperial&exclude=minutely&appid='+apiKey;
    fetch(secondURL).then(function(response) {
        if(response.ok) {
            response.json().then(function(weatherInfo) {
                console.log(weatherInfo);
                getNewTemp(weatherInfo);
                getNewCloud(weatherInfo);
                getNewHumid(weatherInfo);
                getNewPOP(weatherInfo);
            })
        } else {
            alert('not found');
        }
    })
    .catch(function(error) {
        console.log('unable to connect to server. try again later');
    });
};

var getGeoLocation = function() {
    for (var i=0; i < fiveLocations.length; i++) {
    
        newLon = Math.round(fiveLocations[i][0] *100)/100;
        newLat = Math.round(fiveLocations[i][1] *100)/100;
        updatedFiveLocations.push([newLon, newLat])
        weatherCall(updatedFiveLocations);
    };
};

getGeoLocation();






var submitWeatherHandler = function(event) {
    event.preventDefault();

    var userTempValue = document.getElementsByName('temp')[0].value;
    var userCloudValue = document.getElementsByName('cloud')[0].value;
    var userHumidValue = document.getElementsByName('humid')[0].value;
    var userRainValue = document.getElementsByName('rain-snow')[0].value;

    // create an IF statement to check if the option was actually selected, if not show an alert
    if (userTempValue == 'selectoption' || userCloudValue == 'selectoption' || userHumidValue == 'selectoption' || userRainValue == 'selectoption') {
        alert('Please make all selections');
    } else {
        userTempSelection(userTempValue);
        userCloudSelection(userCloudValue);
        userHumidSelection(userHumidValue);
        userRainSelection(userRainValue);
    }
};

var acceptableTemp = [];






/* ------------------------- users selections on weather parameters ------------------------------------- */
var userTempSelection = function(userTempValue) {
    //console.log(tempForm.selectedIndex); // shows index number of selected option
    //console.log(tempForm.options[tempForm.selectedIndex].value); // shows value of the selected option
    //console.log(tempForm.options[3].value); // shows the value of the Nth option in the html list

    displayResultsContainer.textContent = "";

    switch(userTempValue) {

        case userTempValue = tempForm.options[1].value:
            console.log('user chose between 40 and 55');
            for (var i=0; i < allTemps.length; i++) {
                if(allTemps[i] >= 40 && allTemps[i] <= 55) {
                    var goodTemp = document.createElement('span');
                    goodTemp.textContent = 'user acceptable temperature: ' + allTemps[i];
                    var goodTempContainer = document.createElement('div');
                    goodTempContainer.appendChild(goodTemp);
                    displayResultsContainer.appendChild(goodTempContainer);
                } else { console.log('not acceptable weather');}
            }
        break;

        case userTempValue = tempForm.options[2].value:
            console.log('user chose between 55 and 70');
            for (var i=0; i < allTemps.length; i++) {
                if(allTemps[i] >= 56 && allTemps[i] <= 70) {
                    var goodTemp = document.createElement('span');
                    goodTemp.textContent = 'user acceptable temperature: ' + allTemps[i];
                    var goodTempContainer = document.createElement('div');
                    goodTempContainer.appendChild(goodTemp);
                    displayResultsContainer.appendChild(goodTempContainer);
                } else { console.log('not acceptable weather');}
            }
        break;

        case userTempValue = tempForm.options[3].value:
            console.log('user chose between 70 and 85');
            for (var i=0; i < allTemps.length; i++) {
                if(allTemps[i] >= 71 && allTemps[i] <= 85) {
                    var goodTemp = document.createElement('span');
                    goodTemp.textContent = 'user acceptable temperature: ' + allTemps[i];
                    var goodTempContainer = document.createElement('div');
                    goodTempContainer.appendChild(goodTemp);
                    displayResultsContainer.appendChild(goodTempContainer);
                } else { console.log('not acceptable weather');}
            }
        break;

        case userTempValue = tempForm.options[4].value:
            console.log('user chose between 85 and 100');
            for (var i=0; i < allTemps.length; i++) {
                if(allTemps[i] >= 86 && allTemps[i] <= 100) {
                    var goodTemp = document.createElement('span');
                    goodTemp.textContent = 'user acceptable temperature: ' + allTemps[i];
                    var goodTempContainer = document.createElement('div');
                    goodTempContainer.appendChild(goodTemp);
                    displayResultsContainer.appendChild(goodTempContainer);
                } else { console.log('not acceptable weather');}
            }
        break;

        default:
            console.log('something went wrong');
    }
};


var userCloudSelection = function(userCloudValue) {
    //console.log(cloudForm.selectedIndex); 
    //console.log(cloudForm.options[cloudForm.selectedIndex].value); 

    displayResultsContainer.textContent = "";

    switch(userCloudValue) {
        case userCloudValue = cloudForm.options[1].value:
            console.log('user chose partly cloudy');
            for (var i=0; i < allClouds.length; i++) {
                if(allClouds[i] >= 0 && allClouds[i] <= 40) {
                    var clouds = document.createElement('span');
                    clouds.textContent = 'user prefers: ' + allClouds[i];
                    var cloudsContainer = document.createElement('div');
                    cloudsContainer.appendChild(clouds);
                    displayResultsContainer.appendChild(cloudsContainer);
                } else { 
                    var clouds = document.createElement('span');
                    clouds.textContent = 'sorry, no matching results for your request';
                    var cloudsContainer = document.createElement('div');
                    cloudsContainer.appendChild(clouds);
                    displayResultsContainer.appendChild(cloudsContainer);
                }
            } 
        break 
            
        case userCloudValue = cloudForm.options[2].value:
            console.log('user chose mostly cloudy');
            for (var i=0; i < allClouds.length; i++) {
                if(allClouds[i] >= 41 && allClouds[i] <= 70) {
                    var clouds = document.createElement('span');
                    clouds.textContent = 'user prefers: ' + allClouds[i];
                    var cloudsContainer = document.createElement('div');
                    cloudsContainer.appendChild(clouds);
                    displayResultsContainer.appendChild(cloudsContainer);
                } else { 
                    var clouds = document.createElement('span');
                    clouds.textContent = 'sorry, no matching results for your request';
                    var cloudsContainer = document.createElement('div');
                    cloudsContainer.appendChild(clouds);
                    displayResultsContainer.appendChild(cloudsContainer);
                }
            } 
        break

        case userCloudValue = cloudForm.options[3].value:
            console.log('user chose cloudy');
            for (var i=0; i < allClouds.length; i++) {
                if(allClouds[i] >= 71 && allClouds[i] <= 100) {
                    var clouds = document.createElement('span');
                    clouds.textContent = 'user prefers: ' + allClouds[i];
                    var cloudsContainer = document.createElement('div');
                    cloudsContainer.appendChild(clouds);
                    displayResultsContainer.appendChild(cloudsContainer);
                } else { 
                    var clouds = document.createElement('span');
                    clouds.textContent = 'sorry, no matching results for your request';
                    var cloudsContainer = document.createElement('div');
                    cloudsContainer.appendChild(clouds);
                    displayResultsContainer.appendChild(cloudsContainer);
                }
            } 
        break

        default:
            console.log('something went wrong');
    }
};


var userHumidSelection = function(userHumidValue) {
    console.log(humidForm.selectedIndex); 
    //console.log(humidForm.options[humidForm.selectedIndex].value); 
    displayResultsContainer.textContent = "";

    switch(userHumidValue) {
        case userHumidValue = humidForm.options[1].value:
            console.log('user chose 30% to 50%');
            for (var i=0; i < allHumids.length; i++) {
                if(allHumids[i] >= 30 && allHumids[i] <= 50) {
                    var humid = document.createElement('span');
                    humid.textContent = 'user prefers: ' + allHumids[i];
                    var humidContainer = document.createElement('div');
                    humidContainer.appendChild(humid);
                    displayResultsContainer.appendChild(humidContainer);
                } else { 
                    var humid = document.createElement('span');
                    humid.textContent = 'sorry, no matching results for your request';
                    var humidContainer = document.createElement('div');
                    humidContainer.appendChild(humid);
                    displayResultsContainer.appendChild(humidContainer);
                }
            } 
        break

        case userHumidValue = humidForm.options[2].value:
            console.log('user chose 50% to 70%');
            for (var i=0; i < allHumids.length; i++) {
                if(allHumids[i] >= 51 && allHumids[i] <= 70) {
                    var humid = document.createElement('span');
                    humid.textContent = 'user prefers: ' + allHumids[i];
                    var humidContainer = document.createElement('div');
                    humidContainer.appendChild(humid);
                    displayResultsContainer.appendChild(humidContainer);
                } else { 
                    var humid = document.createElement('span');
                    humid.textContent = 'sorry, no matching results for your request';
                    var humidContainer = document.createElement('div');
                    humidContainer.appendChild(humid);
                    displayResultsContainer.appendChild(humidContainer);
                }
            } 
        break

        case userHumidValue = humidForm.options[3].value:
            console.log('user chose 70% to 90%');
            for (var i=0; i < allHumids.length; i++) {
                if(allHumids[i] >= 71 && allHumids[i] <= 90) {
                    var humid = document.createElement('span');
                    humid.textContent = 'user prefers: ' + allHumids[i];
                    var humidContainer = document.createElement('div');
                    humidContainer.appendChild(humid);
                    displayResultsContainer.appendChild(humidContainer);
                } else { 
                    var humid = document.createElement('span');
                    humid.textContent = 'sorry, no matching results for your request';
                    var humidContainer = document.createElement('div');
                    humidContainer.appendChild(humid);
                    displayResultsContainer.appendChild(humidContainer);
                }
            }
        break

        default:
            console.log('something went wrong');
    }
};


var userRainSelection = function(userRainValue) {
    console.log(rainForm.selectedIndex); 
    //console.log(rainForm.options[rainForm.selectedIndex].value); 

    if(userRainValue == true) {
        console.log('YES to rain')
    } else {
        console.log('NO to rain')
    }
};





weatherButton.addEventListener("click", submitWeatherHandler);