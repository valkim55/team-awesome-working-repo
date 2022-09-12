# team-awesome-working-repo

# team roles


# product summary
trip destination planner app, "pick a place to go"

user = consumer who wants to find a location for a day trip, based on their preferences (current geo, weather, travel distance (miles or hours?), things to do / events)

# features / user stories
user completes a form:
- current location (input address in Google Maps lookup. Save in local storage for easy future search?)
- calendar (date picker?)
- preferred weather (select sun or rain, probability of rain below a certain amount, certain temperature, etc.)
- local events (dropdown?)
- categories of things to do (select all that apply or dropdown? or select 3-5?)

# designs
- https://www.figma.com/file/C9CDKe11cJE0gtFzcmvYMr/Day-Trip-Picker?node-id=0%3A1
![Image at start.](./assets/images/wireframe.png)
# tech used
- HTML, CSS
- Bootstrap and one other framework
- jQuery for dropdowns
- Google and Apple fonts for primary and fallback
# Infomation about API Keys
All api keys are stored in apiKeys.json document which is ignored in git that way the sensitive keys will not be upload to public. So for your to debug or run locally you will have to create apiKeys.json in environmentDoc folder. 
Look at the ReadMe.md file in environmentDoc folder to learn how to set-up.
### How would you use it in your script
1. You will have to import the document to your script by useing 
```
       1. import * as apiKeys from '../environmentDoc/apiKeys.json'; 
```
2. Pass in the keys
```
        var requestUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${apiKeys.mapQuestKey}&location=1600+Pennsylvania+Ave+NW,Washington,DC,20500`;

```

# timeline
