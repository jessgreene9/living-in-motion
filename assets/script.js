var apiKey = "867ee0b8397845db43d24c7003e387b5742e2bdc";
var startBtnEl = document.querySelector("#start");
var workoutContainerEl = document.querySelector("#workout-container");

var categories= ["Cardio", "Core", "Upper Body", "Lower Body"];


var apiUrl = "https://wger.de/api/v2/";
fetch(apiUrl, {
  headers: {
    Accept: "application/json",
    Authorization: "Token 867ee0b8397845db43d24c7003e387b5742e2bdc"
  }
})
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  });

 var catUrl = "https://wger.de/api/v2/exercise/?language=2&limit=100";
fetch(catUrl, {
    headers: {
        Accept: "application/json",
        Authorization: "Token 867ee0b8397845db43d24c7003e387b5742e2bdc"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
          renderExercises(data);
        console.log(data);
      });

      startBtnEl.addEventListener("click", function(event) {
          startBtnEl.style.visibility = "hidden";

          for (var i = 0; i < categories.length; i++) {
            var choice = categories[i];  
            var btn = document.createElement("Button");
            btn.innerHTML = choice;
            btn.setAttribute("class", "btn");
            btn.setAttribute("data-index", i);
            workoutContainerEl.appendChild(btn);
          }
          renderExercises();

      });

      var renderExercises = function(data) {
          // Create elements for exercises for each category (look above for the index)
      }

