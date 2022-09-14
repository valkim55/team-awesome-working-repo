
var cityEl = document.querySelector("#city-search-input");
var stateEl=document.querySelector("#state-search-input") ;
var zipEl=document.querySelector("#zip-search-input") ;
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
    getCurrentLocationAPI();
    
})


function getCurrentLocationAPI(){

     userCurrentPerm = `${cityEl.value.trim()},${stateEl.value.trim()},${zipEl.value.trim()}`
    console.log(`the Script is inside getCurrentLocationAPI to get the current ${userCurrentPerm}`);
    //var requestUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${apiKey.mapQuestKey}&location=${userCurrentPerm}`;
   var requestUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=vWzHFILMQOPgQjlt4C8DWFxfHDsrfaPR&location=${userCurrentPerm}`;


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

//
