var apiKey = "867ee0b8397845db43d24c7003e387b5742e2bdc";
var startBtnEl = document.querySelector("#start");
var workoutContainerEl = document.querySelector("#workout-container");
var chooseDateBtn = document.querySelector("#choose-date");
var speedShowEl = document.querySelector("#speed-show");
var hiitShowEl = document.querySelector("#hiit-show");
var distanceShowEl = document.querySelector("#distance-show");

var burpeeHiitEl = document.querySelector("#burpee-hiit");
var fullBodyHiitEl = document.querySelector("#full-body-hiit");
var easyRunEl = document.querySelector("#easy-run");
var tempoRunEl = document.querySelector("#tempo-run");
var ladderSpeedEl = document.querySelector("#ladder-speed");
var hillSpeedEl = document.querySelector

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
      Authorization: "Token 867ee0b8397845db43d24c7003e387b5742e2bdc",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var selectedCategories = data.results.filter((category) =>
        chosen.includes(category.name)
      );
      console.log(selectedCategories);

      var exercises = selectedCategories.map(function (category) {
        var url =
          "https://wger.de/api/v2/exercise/?language=2&limit=100&category=" +
          category.id;

        return fetch(url, {
          headers: {
            Accept: "application/json",
            Authorization: "Token 867ee0b8397845db43d24c7003e387b5742e2bdc",
          },
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            return data.results;
          });
      });

      console.log(exercises);

      Promise.all(exercises).then((values) => {
        var collection = values.map(function (value, index) {
          return {
            title: selectedCategories[index].name,
            results: value,
          };
        });
        renderCollection(collection);
      });
    });
}

function renderCollection(collection) {
  var listOfExercisesEl = document.querySelector("#list-of-exercises");
  for (var c = 0; c < collection.length; c++) {
    var shuffledExercises = _.shuffle(collection[c].results);
    var slicedExercises = shuffledExercises.slice(0, 5);
    console.log(slicedExercises);

    for (var i = 0; i < slicedExercises.length; i++) {
      var inputEl = document.createElement("input");
      inputEl.setAttribute("type", "checkbox");
      inputEl.className = "exercises";
      inputEl.setAttribute("name", "name");
      inputEl.setAttribute("data-name", slicedExercises[i].name);
      // console.log(inputEl);
      var labelEl = document.createElement("label");
      labelEl.textContent = slicedExercises[i].name;
      labelEl.className = "row checkbox-container has-text-black";
      labelEl.setAttribute("id", "labelId");
      labelEl.setAttribute("value", "slicedExercises[i].name");
      listOfExercisesEl.appendChild(labelEl);
      labelEl.prepend(inputEl);
      console.log(labelEl.textContent);

    }
  }

  var chooseDateBtn = document.querySelector("#choose-date");
  chooseDateBtn.classList.remove("hide");
  chooseDateBtn.setAttribute("id", "merge_button");

  chooseDateBtn.addEventListener("click", function (event) { 
    event.preventDefault();
    var element = event.target;
    if (element.matches('#merge_button')) {
      var selectedCheckboxes = Array.from(document.querySelectorAll('#labelId input[type=checkbox]:checked'));
      console.log(selectedCheckboxes);
      var searchNames = selectedCheckboxes.map(function (checkbox) {
        return checkbox.dataset.name;
      });
      console.log(searchNames);
    }
  });
}

// mobile menu
// var burgerIconEl = document.querySelector("#burger");
// var navbarMenuEl = document.querySelector("#nav-links");

// burgerIconEl.addEventListener("click", () => {
//     navbarMenuEl.classList.toggle("is-active");
// });

// startBtnEl.addEventListener('click', )


// Select cardio workout category and display workout divs
var cardioSelections = document.querySelectorAll('input[name="selection"]');
var selectedValue;

for (var i = 0; i < cardioSelections.length; i++) {
  cardioSelections[i].onclick = function () {
    for (var cardioSelection of cardioSelections) {
      if (cardioSelection.checked) {
        selectedValue = cardioSelection.value;
      }
      if (selectedValue === "speed") {
        speedShowEl.setAttribute("style", "display: show");
        hiitShowEl.setAttribute("style", "display: none");
        distanceShowEl.setAttribute("style", "display: none");
      }
      if (selectedValue === "distance") {
        speedShowEl.setAttribute("style", "display: none");
        hiitShowEl.setAttribute("style", "display: none");
        distanceShowEl.setAttribute("style", "display: show");
      }
      if (selectedValue === "hiit") {
        speedShowEl.setAttribute("style", "display: none");
        hiitShowEl.setAttribute("style", "display: show");
        distanceShowEl.setAttribute("style", "display: none");
      }
    }
  }
}

//Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

const chosenBtnEl = document.querySelector("#chosen-button");
chosenBtnEl.addEventListener("click", (getSelectedCheckboxValues));