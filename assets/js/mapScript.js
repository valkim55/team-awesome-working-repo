
var currentEL = document.querySelector("#current-search-location");

var radiusLocationEl = document.querySelector("#radius-search-input");
var searchEl = document.querySelector("#btnSearch");


//var latitude; 
  // var longitude; 

searchEl.addEventListener("click", () => {
   getCurrentLocationAPI(); //get CurrentLocation latitude and longitude 'might not needed when getUserPOIS is build'
   
   // getUserPOIS(latitude,longitude); //get POIS based on latitude and longitude
  // getTOMUserPOIS();
})


function getCurrentLocationAPI() {
  //this function will post users current location and return the its coordinates 
  console.log(`the Script is inside getCurrentLocationAPI to get the current ${currentEL.value.trim()}`);
  var currentLocrequestUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=vWzHFILMQOPgQjlt4C8DWFxfHDsrfaPR&location=${currentEL.value.trim()}`;
  fetch(currentLocrequestUrl, { method: 'GET' }) //fetaching all realted area for current location
    .then((response) => response.json())
    .then((currentLocdata) => {
      for (var i = 0; i < currentLocdata.results.length; i++) {
        console.log("inside the loop to get latitude and longitude of user input");
       var latitude = JSON.stringify(currentLocdata.results[i].locations[i].latLng['lat']); //getting the latitude of users current location
       var longitude = JSON.stringify(currentLocdata.results[i].locations[i].latLng['lng']); //getting the longitude of users current location
       getTOMUserPOIS(latitude,longitude);
      }
      console.log(`getCurrentLocationAPI: Current location latitude is ${latitude} and longitude is ${longitude}`);
    return latitude && longitude; //returning latitude && longitude and updateing them from null to have vaule from json
    })
    .catch((error) => {
      console.error('Error:', error);
      return error; 
    });
   
}


/*function getUserPOIS(latitude,longitude){
 
  console.log(`the Script is inside getUserPOIS to get the current`);
  console.log(`the Script is inside getUserPOIS ${latitude && longitude}`);
  var poisRequestUrl = `http://www.mapquestapi.com/search/v2/radius?key=vWzHFILMQOPgQjlt4C8DWFxfHDsrfaPR&Matches=4&origin=${latitude},${longitude}&hostedData=mqap.ntpois|ntpois.group_sic_code_name=Farms`;
  //-TO-DO-
  fetch(poisRequestUrl, { method: 'GET' }) //fetaching all realted area for current location which user might be Interest in
    .then((response) => response.json())
    .then((data) => {
      for (var i = 0; i < data.searchResults.length; i++) {
          //-TO-DO-: after I get the data I will store it in an array for and display in the UI
        console.log("inside the loop to get latitude and longitude of user input POI" + data);
 
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      return error; 
    });

}*/

function getTOMUserPOIS(latitude,longitude){
      //this will get POIS based from TomTom map
  console.log(`the Script is inside getUserPOIS to get the current`);
  console.log(`the Script is inside getUserPOIS ${latitude && longitude}`);
  var poisRequestUrl = `https://api.tomtom.com/search/2/categorySearch/Beach.json?limit=5&lat=${latitude}&lon=${longitude}&radius=160934&view=Unified&relatedPois=off&key=LgN742cN8MR1QMntpr5PgYtQih7dxeGz`;
  //-TO-DO-
  fetch(poisRequestUrl, { method: 'GET' }) //fetaching all realted area for current location which user might be Interest in
    .then((response) => response.json())
    .then((data) => {
      for (var i = 0; i < data.results.length; i++) {
          //-TO-DO-: after I get the data I will store it in an array for and display in the UI
        console.log("inside the loop to get latitude and longitude of user input POI" + data.results[i]);
 
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      return error; 
    });

}
