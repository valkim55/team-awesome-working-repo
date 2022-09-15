

/*
var settings = {
    "async": true,
    "crossDomain": true,
    // THIS IS WHAT SEARCHES FOR EVENTS  >>>>
    "url": "https://www.eventbriteapi.com/v3/events/search/?location.address="+ userCurrentCity +"&location.within=10mi&expand=organizer,venue",
    "url": "https://www.eventbriteapi.com/v3/events/52782578112/", 
    "method": "GET",
    "headers": {
        "Authorization": "Bearer ***************",
        "Content-Type": "application/json"
    }
    }
*/

var settings = {
    "async": true,
    "crossDomain": true,
    // THIS IS WHAT SEARCHES FOR EVENTS  >>>>
    "url": "https://www.eventbriteapi.com/v3/events/search/?location.address="+ userCurrentCity +"&location.within=10mi&expand=organizer,venue",
    /* "url": "https://www.eventbriteapi.com/v3/events/52782578112/", */
    "method": "GET",
    "headers": {
        "Authorization": "Bearer ***************",
        "Content-Type": "application/json"
    }
    }

function getEventLocationAPI() {
    userCurrentCity = `${cityEl.value.trim()}}`
    console.log(`the Script is inside getCurrentLocationAPI to get the current ${userCurrentCity}`);
    
    user
    fetch(settings)
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
};

getUserRepos();





