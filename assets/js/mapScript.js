
var cityEl = document.querySelector("#city-search-input");
var stateEl=document.querySelector("#state-search-input") ;
var zipEl=document.querySelector("#zip-search-input") ;
var radiusLocationEl = document.querySelector("#radius-search-input");
var searchEl = document.querySelector("#btnSearch");


searchEl.addEventListener("click", ()=>{
    getCurrentLocationAPI();
})
/*var currentLocation = null;
var radius = null ;*/

function getCurrentLocationAPI(){
    var userCurrentPerm = `${cityEl.value.trim()},${stateEl.value.trim()},${zipEl.value.trim()}`
    console.log(`the Script is inside getCurrentLocationAPI to get the current ${userCurrentPerm}`);
    localStorage.setItem("UserCurrentLocation", JSON.stringify(userCurrentPerm));
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
          console.log(repoList.appendChild(listItem));
        }
      });
}
