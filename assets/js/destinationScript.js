

//Pages variables
var homepageEL = document.querySelector('#homePage');
var destinationformEL = document.querySelector('#destinationpage');
var weatherformEL = document.querySelector('#weatherpage');
var resultpageEL = document.querySelector("#resultpage");

//elements (selectors) variables
var nameinputEL = document.querySelector("#name-input");
var getStartedEL = document.querySelector("#btnGet-Started");
var currentEL = document.querySelector("#city-search-input");
var radiusLocationEl = document.querySelector("#radius-search-dropdown");
var searchEl = document.querySelector("#location-submit");
var calendarEL = document.querySelector("#calendar");
var driver = document.querySelector("#driver");
//TO-DO--
// variables for temperature parameters forms to filter weather data
var tempForm = document.querySelector("#temp-selection");
var cloudForm = document.querySelector("#cloud-selection");
var humidForm = document.querySelector("#humid-selection");
var rainForm = document.querySelector("#precipitation-selection");
var weatherButton = document.querySelector("#weather-submit");
var displayResultsContainer = document.querySelector('#display-results');



//error variables
var nameinputErrorEL = document.querySelector("#nameinputError");
var errorEl = document.querySelector(".errorMessage");
var errorLocationEL = document.querySelector("#locationError");
var radiusErrorEl = document.querySelector("#radiusError");
var selectingDateErrorEl = document.querySelector("#selectingDateError")

//global variables
var locationResponse = []; //store the radius from getTOMUserPOIS Response

//api keys
var mapquestapi = "vWzHFILMQOPgQjlt4C8DWFxfHDsrfaPR";
var tomtomapi = "LgN742cN8MR1QMntpr5PgYtQih7dxeGz";
var openweatherapi = "13765804293c80fb9eac8b6b1d0beeb5"

/*Home Page actions start here*/
//EventListener to get started
getStartedEL.addEventListener("click", () => {

  if (nameinputEL.value != "") { //checkin for any error
    nameinputErrorEL.style.setProperty("visibility", "hidden");
    homepageEL.style.setProperty("visibility", "hidden");
    getStartedEL.style.setProperty("href", "#destinationpage");
    destinationformEL.style.setProperty("visibility", "visible");

  } else {
    nameinputErrorEL.style.setProperty("visibility", "visible");
  }
})

/*destination actions start here*/
searchEl.addEventListener("click", () => {
  console.log(`inside searchEl.addEventListener`)

  console.log(radiusLocationEl.value);
  if (currentEL.value == "" && radiusLocationEl.value == "" /*&& calendarEL.value == "" */) {
    //check if all selector has value if not then "visibility" to "visible"
    errorEl.style.setProperty("visibility", "visible");
  }
  else if (radiusLocationEl.value == "") {
    //check if radiusLocationEl selector has value if not then "visibility" to "visible"
    radiusErrorEl.style.setProperty("visibility", "visible");  //if CurrentLocation have value is "" will set style "visibility" to "visible"
  }
  /*if(calendarEL.value == ""){
     //check if calendarEL selector has value if not then "visibility" to "visible"
    selectingDateErrorEl.style.setProperty("visibility", "visible");  //if calendarEL have value is "" will set style "visibility" to "visible"
  }*/
  else if (currentEL.value == "") {
    //check if currentEL selector has value if not then "visibility" to "visible"
    errorLocationEL.style.setProperty("visibility", "visible");
  } else {
    errorEl.style.setProperty("visibility", "hidden");
    destinationformEL.style.setProperty("visibility", "hidden");
    searchEl.style.setProperty("href", "#weatherpage");
    weatherformEL.style.setProperty("visibility", "visible");
    getCurrentLocationAPI();
  }
})

//this function will post users current location and return the its coordinates 
function getCurrentLocationAPI() {
  console.log(`the script is inside getCurrentLocationAPI to get the current ${currentEL.value.trim()}`);
  var currentLocrequestUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${mapquestapi}&location=${currentEL.value.trim()}`;
  fetch(currentLocrequestUrl, { method: 'GET' }) //fetching all related area for current location
    .then((response) => response.json())
    .then((currentLocdata) => {
      for (var i = 0; i < currentLocdata.results.length; i++) {
        console.log("inside the loop to get latitude and longitude of user input");
        var latitude = JSON.stringify(currentLocdata.results[i].locations[i].latLng['lat']); //getting the latitude of users current location
        var longitude = JSON.stringify(currentLocdata.results[i].locations[i].latLng['lng']); //getting the longitude of users current location
        getTOMUserPOIS(latitude, longitude);
      }
      console.log(`getCurrentLocationAPI: Current location latitude is ${latitude} and longitude is ${longitude}`);
      return latitude && longitude; //returning latitude && longitude and updating them from null to have value from json
    })
    .catch((error) => {
      console.error('Error:', error);
      return error;
    });

}

//this will get POIS based from TomTom map
function getTOMUserPOIS(latitude, longitude) {

  console.log(`the Script is inside getUserPOIS to get the current`);

  var limit;
  var convertToMeters = radiusLocationEl.value * 1609.344; //have to convert mile to meters for api radius parameters
  var meters = convertToMeters.toString().replace(/[|&;$%@"<>()+,.]/g, ""); //have to remove '.' from meters for api radius parameters
  if (radiusLocationEl.value < 9) {
    limit = 10 - parseInt(radiusLocationEl.value);
  } else {
    limit = parseInt(radiusLocationEl.value) + 10;
  }

  //aip intergration
  var poisRequestUrl = `https://api.tomtom.com/search/2/categorySearch/Beach.json?limit=${parseInt(limit)}&lat=${latitude}&lon=${longitude}&radius=${meters}&view=Unified&relatedPois=off&key=${tomtomapi}`;
  fetch(poisRequestUrl, { method: 'GET' }) //fetching all related area for current location which user might be Interest in
    .then((response) => response.json())
    .then((data) => {
      for (var i = 0; i < data.results.length; i++) {

        var locationobj = { //objL to be passed in locationRespons 
          city: data.results[i].address.localName,
          state: data.results[i].address.municipality,
          latLng: [
            data.results[i].position.lat,
            data.results[i].position.lon
          ],
          distance: `${data.results[i].dist * 0.000621371192}` //converting the distance back to mile for the UI
        }
        locationResponse.push(locationobj);

      }
      console.log(locationResponse);

    })
    .catch((error) => {
      console.error('Error:', error);
      return error;
    });

}


//Start of Date picker
document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.querySelector(".modal");

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });
});


/*Weather page start here*/

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


var weatherCall = function () {
  for (var i = 0; i < locationResponse.length; i++) {
    newLon = Math.round(locationResponse[i].latLng[0] *100)/100;
    newLat = Math.round(locationResponse[i].latLng[1] *100)/100;
   // console.log("inside weather call " + latLngs);

    var secondURL = 'https://api.openweathermap.org/data/3.0/onecall?lat=' + newLat + '&lon=' + newLon + '&units=imperial&exclude=minutely&appid=' + openweatherapi;
    fetch(secondURL).then(function (response) {
      if (response.ok) {
        response.json().then(function (weatherInfo) {
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
    .catch(function (error) {
      console.log('unable to connect to server. try again later');
    });
  }
};








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
                var goodTem1 = allTemps[i];
                displayEndResults(goodTem1);
               
              } else { console.log('not acceptable weather');}
          }
      break;

      case userTempValue = tempForm.options[2].value:
          console.log('user chose between 55 and 70');
          for (var i=0; i < allTemps.length; i++) {
              if(allTemps[i] >= 56 && allTemps[i] <= 70) {
                var goodTem1 = allTemps[i];
                displayEndResults(goodTem1);
               
                  // var goodTemp = document.createElement('span');
                  // goodTemp.textContent = 'user acceptable temperature: ' + allTemps[i];
                  // var goodTempContainer = document.createElement('div');
                  // goodTempContainer.appendChild(goodTemp);
                  // displayResultsContainer.appendChild(goodTempContainer);
              } else { console.log('not acceptable weather');}
          }
      break;

      case userTempValue = tempForm.options[3].value:
          console.log('user chose between 70 and 85');
          for (var i=0; i < allTemps.length; i++) {
              if(allTemps[i] >= 71 && allTemps[i] <= 85) {
                var goodTem1 = allTemps[i];
                displayEndResults(goodTem1);
                  // var goodTemp = document.createElement('span');
                  // goodTemp.textContent = 'user acceptable temperature: ' + allTemps[i];
                  // var goodTempContainer = document.createElement('div');
                  // goodTempContainer.appendChild(goodTemp);
                  // displayResultsContainer.appendChild(goodTempContainer);
              } else { console.log('not acceptable weather');}
          }
      break;

      case userTempValue = tempForm.options[4].value:
          console.log('user chose between 85 and 100');
          for (var i=0; i < allTemps.length; i++) {
              if(allTemps[i] >= 86 && allTemps[i] <= 100) {
                var goodTem1 = allTemps[i];
                displayEndResults(goodTem1);
               
                  // var goodTemp = document.createElement('span');
                  // goodTemp.textContent = 'user acceptable temperature: ' + allTemps[i];
                  // var goodTempContainer = document.createElement('div');
                  // goodTempContainer.appendChild(goodTemp);
                  // displayResultsContainer.appendChild(goodTempContainer);
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


/*Test Driver*/
driver.addEventListener("click", () => {
  weatherformEL.style.setProperty("visibility", "hidden");
  resultpageEL.style.setProperty("visibility", "visible");
  weatherCall();
  displayEndResults();
})



/*results page start here*/
function displayEndResults(goodTemp) {
  var eventListEL = document.querySelector('#eventList');
  for (var i = 0; i < locationResponse.length; i++) {
    var listItem = document.createElement('li');
    var itemToDisplay = `${goodTemp}, ${locationResponse[i].city}, ${locationResponse[i].state} ${locationResponse[i].distance.slice(0, 4)} mi`;
    console.log(itemToDisplay);
    listItem.textContent = itemToDisplay;

    eventListEL.appendChild(listItem);
  }

}



// goodTemp.textContent = 'user acceptable temperature: ' + allTemps[i];
// var goodTempContainer = document.createElement('div');
// goodTempContainer.appendChild(goodTemp);
// displayResultsContainer.appendChild(goodTempContainer);

