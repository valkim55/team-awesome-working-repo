
var cityEl = document.querySelector("#city-search-input");
var stateEl=document.querySelector("#state-search-input") ;
var zipEl=document.querySelector("#zip-search-input") ;
var radiusLocationEl = document.querySelector("#radius-search-input");
var searchEl = document.querySelector("#btnSearch");

var latitude = null;
var longitude =null;

searchEl.addEventListener("click", ()=>{
  latitude =null; longitude=null;
    getCurrentLocationAPI();
    
})

function getCurrentLocationAPI(){

     userCurrentPerm = `${cityEl.value.trim()},${stateEl.value.trim()},${zipEl.value.trim()}`
    console.log(`the Script is inside getCurrentLocationAPI to get the current ${userCurrentPerm}`);
   var requestUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=vWzHFILMQOPgQjlt4C8DWFxfHDsrfaPR&street=${userCurrentPerm}`;
   


    fetch(requestUrl,{method:'GET'}) //fetaching all realted area for current location
      .then((response) => response.json())
      .then((data) => {
     
    for(var i=0; i < data.results.length; i++){
          console.log("inside the loop");
          latitude = JSON.stringify(data.results[i].locations[i].latLng['lat']);
          longitude = JSON.stringify(data.results[i].locations[i].latLng['lng']);

        }
        console.log(`Current location latitude is ${latitude} and longitude is ${longitude}`);
      })
   
      .catch((error) => {
        console.error('Error:', error);
      });
}




