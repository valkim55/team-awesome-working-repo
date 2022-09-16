

//Pages
var homepageEL = document.querySelector('#homePage');
var destinationformEL = document.querySelector('#destinationpage');
var weatherformEL = document.querySelector('#weatherpage');
var resultpageEL = document.querySelector("#resultpage");

//elements 
var nameinputEL = document.querySelector("#name-input");
var getStartedEL = document.querySelector("#btnGet-Started");


var currentEL = document.querySelector("#city-search-input");
var radiusLocationEl = document.querySelector("#radius-search-dropdown");
var searchEl = document.querySelector("#location-submit");
var calendarEL = document.querySelector("#calendar");
var driver = document.querySelector ("#driver");


//error
var nameinputErrorEL = document.querySelector("#nameinputError");
var errorEl = document.querySelector(".errorMessage");
var errorLocationEL = document.querySelector("#locationError");
var radiusErrorEl = document.querySelector("#radiusError");
var selectingDateErrorEl = document.querySelector("#selectingDateError")

getStartedEL.addEventListener("click", () =>{
  homepageEL.style.setProperty("visibility", "hidden");
  destinationformEL.style.setProperty("visibility", "visible");
})

searchEl.addEventListener("click", () => {
  console.log(`inside searchEl.addEventListener`)

  console.log(radiusLocationEl.value);
  if (currentEL.value == "" && radiusLocationEl.value == "" /*&& calendarEL.value == "" */) {
    //check if all selector has value if not then "visibility" to "visible"
    errorEl.style.setProperty("visibility", "visible");
  }
  if (radiusLocationEl.value == "") {
    //check if radiusLocationEl selector has value if not then "visibility" to "visible"
    radiusErrorEl.style.setProperty("visibility", "visible");  //if CurrentLocation have value is "" will set style "visibility" to "visible"
  }
  /*if(calendarEL.value == ""){
     //check if calendarEL selector has value if not then "visibility" to "visible"
    selectingDateErrorEl.style.setProperty("visibility", "visible");  //if calendarEL have value is "" will set style "visibility" to "visible"
  }*/
  if (currentEL.value == "") {
    //check if currentEL selector has value if not then "visibility" to "visible"
    errorLocationEL.style.setProperty("visibility", "visible");
  } else {
    errorEl.style.setProperty("visibility", "hidden");
    destinationformEL.style.setProperty("visibility", "hidden");
    weatherformEL.style.setProperty("visibility", "visible");
    getCurrentLocationAPI();
  }
})

function getCurrentLocationAPI() {
  //this function will post users current location and return the its coordinates 

  console.log(`the script is inside getCurrentLocationAPI to get the current ${currentEL.value.trim()}`);
  var currentLocrequestUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=vWzHFILMQOPgQjlt4C8DWFxfHDsrfaPR&location=${currentEL.value.trim()}`;
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

var locationResponse = []; //store the radius from getTOMUserPOIS Response

function getTOMUserPOIS(latitude, longitude) {
  //this will get POIS based from TomTom map
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
  var poisRequestUrl = `https://api.tomtom.com/search/2/categorySearch/Beach.json?limit=${parseInt(limit)}&lat=${latitude}&lon=${longitude}&radius=${meters}&view=Unified&relatedPois=off&key=LgN742cN8MR1QMntpr5PgYtQih7dxeGz`;
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
          distance: `${data.results[i].dist*0.000621371192}` //converting the distance back to mile for the UI
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

driver.addEventListener("click",()=>{
  weatherformEL.style.setProperty("visibility", "hidden");
  resultsOnDis.style.setProperty("visibility", "visible");
 
   displayEndResults();
})




function displayEndResults(){
  var eventListEL = document.querySelector('#eventList');
  for(var i = 0;i<locationResponse.length; i++){
    var listItem = document.createElement('li');
    var itemToDisplay = `${locationResponse[i].city}, ${locationResponse[i].state} ${locationResponse[i].distance.slice(0, 4)} mi`;
   console.log(itemToDisplay);
   console.log(eventListEL)
   // listItem.textContent = `${locationResponse[i].city.value}, ${locationResponse[i].state.value} ${locationResponse[i].distance.value.slice(0, 4)} mi`;
   listItem.textContent = itemToDisplay;
   
   eventListEL.appendChild(listItem);
  }

}


/*STart of Date picker*/
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


