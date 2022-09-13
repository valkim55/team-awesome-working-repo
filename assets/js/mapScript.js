
var currentEL = document.querySelector("#current-search-location");

var radiusLocationEl = document.querySelector("#radius-search-input");
var searchEl = document.querySelector("#btnSearch");

var latitude = null;
var latitude = null;


searchEl.addEventListener("click", () => {
  latitude = null; longitude = null;
  getCurrentLocationAPI();
 
 getUserPOIS(latitude,latitude);

})

function getUserPOIS(latitude,latitude){
  console.log(`the Script is inside getCurrentLocationAPI to get the current ${currentEL.value.trim()}`);

  var requestUrl = `http://www.mapquestapi.com/search/v2/radius?key=vWzHFILMQOPgQjlt4C8DWFxfHDsrfaPR&Matches=4&origin=${latitude},${longitude}&hostedData=mqap.ntpois|ntpois.group_sic_code_name=Farms`;

  fetch(requestUrl, { method: 'GET' }) //fetaching all realted area for current location
    .then((response) => response.json())
    .then((data) => {
      for (var i = 0; i < data.searchResults.length; i++) {
        console.log("inside the loop to get latitude and longitude of user input POI" + data);
 
      }
      console.log(`Current location latitude is ${latitude} and longitude is ${longitude}`);
      return latitude && longitude;
    })
    .catch((error) => {
      console.error('Error:', error);
      return error; 
    });

}





function getCurrentLocationAPI() {
  //this function will post users current location and return the its coordinates 

  console.log(`the Script is inside getCurrentLocationAPI to get the current ${currentEL.value.trim()}`);
  var requestUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=vWzHFILMQOPgQjlt4C8DWFxfHDsrfaPR&location=${currentEL.value.trim()}`;
  fetch(requestUrl, { method: 'GET' }) //fetaching all realted area for current location
    .then((response) => response.json())
    .then((data) => {
      for (var i = 0; i < data.results.length; i++) {
        console.log("inside the loop to get latitude and longitude of user input");
        latitude = JSON.stringify(data.results[i].locations[i].latLng['lat']);
        longitude = JSON.stringify(data.results[i].locations[i].latLng['lng']);
      }
      console.log(`Current location latitude is ${latitude} and longitude is ${longitude}`);
      return latitude && longitude;
    })
    .catch((error) => {
      console.error('Error:', error);
      return error; 
    });
   
}




