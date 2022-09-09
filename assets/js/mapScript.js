import * as apiKeys from '../environmentDoc/apiKeys.json';

var currentLocationEl = document.querySelector("#place-search-input");

var radiusLocationEl = document.querySelector("#radius-search-input");
var searchEl = document.querySelector("#btnSearch");



/*function getCurrentLocation_radius (){
        //this function will be used to get users location
    var userSubmission = {
        current_location: myCurrentLocationEl.value.trim(),
        intersted_radius: radius.value.trim()
    }

    var itemKey="key??"; //this is the item key I have to get vaule from

   //if local storage do have data continue
   if(localStorage.getItem(itemKey) != null){
    console.log(`inside getting currentLocation and radius`);

    myCurrentLocation = localStorage.getItem(userSubmission.current_location);
    radius = localStorage.getItem(userSubmission.intersted_radius);
 
}else{ //if no data was found display
    console.log(`localStorage did not have data for ${itemKey}`);
    innerHighScoreEl.innerText= null;
}
}*/

searchEl.addEventListener("click", ()=>{
    storeUsersInput();
})
var currentLocation = null;
var radius = null ;
function storeUsersInput(){
    //resetting 
    currentLocation = null;
    radius = null ;

    var userInput = {
        input_currentLocation: currentLocationEl.value.trim(),
        input_userRadius : radiusLocationEl.value.trim(),
    
    }
    //store location in local storage
    currentLocation = localStorage.setItem("currentLocation",JSON.stringify(userInput.input_currentLocation));
    radius = localStorage.setItem("radius",JSON.stringify(userInput.input_userRadius));
    getCurrentLocationAPI();
   // https://api.mqcdn.com/sdk/place-search-js/v1.0.0/place-search.js
}
function getCurrentLocationAPI(){
    var requestUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${apiKeys.mapQuestKey}&location=1600+Pennsylvania+Ave+NW,Washington,DC,20500`;

    fetch(requestUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        for (var i = 0; i < data.length; i++) {
          var listItem = document.createElement('li');
          listItem.textContent = data[i].html_url;
          repoList.appendChild(listItem);
        }
      });
}
