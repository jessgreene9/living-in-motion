var apiKey = "867ee0b8397845db43d24c7003e387b5742e2bdc";
var startBtnEl = document.querySelector("#start");
var workoutContainerEl = document.querySelector("#workout-container");

var categories = ["Cardio", "Core", "Upper Body", "Lower Body"];


function getSelectedCheckboxValues(event) {
  event.preventDefault();
  var checkboxes = document.querySelectorAll('input[name="chosen"]:checked');

  var chosen = [];
  checkboxes.forEach((checkbox) => {
    chosen.push(checkbox.value);
  });
  console.log(chosen);

  var catUrl = "https://wger.de/api/v2/exercisecategory/?language=2&limit=100";
  fetch(catUrl, {
    headers: {
      Accept: "application/json",
      Authorization: "Token 867ee0b8397845db43d24c7003e387b5742e2bdc"
    }
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var selectedCategories = data.results.filter(category => chosen.includes(category.name));
      console.log(selectedCategories);

      var exercises = selectedCategories.map(function (category) {
        var url = "https://wger.de/api/v2/exercise/?language=2&limit=100&category=" + category.id;

        return fetch(url, {
          headers: {
            Accept: "application/json",
            Authorization: "Token 867ee0b8397845db43d24c7003e387b5742e2bdc"
          }
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            return data.results;
          })
      })

      console.log(exercises);

      Promise.all(exercises).then((values) => {
        var collection = values.map(function (value, index) {
          return {
            title: selectedCategories[index].name,
            results: value
          }
        });
        // return(collection); 
        // var shCollection = _.shuffle(collection);
        renderCollection(collection);
      });
    });
}


function renderCollection(collection) {
  var listOfExercisesEl = document.querySelector("#list-of-exercises");
  for (var c = 0; c < collection.length; c++) {
    for (var i = 0; i < collection[c].results.length; i++) { 
      var inputEl = document.createElement("input");
      inputEl.setAttribute("type", "checkbox");
      inputEl.className = "exercises";
      // console.log(collection[c].results[i]);
      var labelEl = document.createElement("label");
      labelEl.textContent = collection[c].results[i].name;
      labelEl.className = "row checkbox-container";
      listOfExercisesEl.appendChild(labelEl);
      labelEl.prepend(inputEl);
    }
    var shCollection = _.shuffle(collection[c].results);
    console.log(shCollection);
    rendershCollection(); 
  } 
}

function rendershCollection(shCollection) {
  var list2Exercise = document.querySelector("#test");
  for (var i = 0; i < 15; i++) {
  }
}
const chosenBtnEl = document.querySelector('#chosen-button');
chosenBtnEl.addEventListener('click', (getSelectedCheckboxValues));

