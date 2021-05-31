var apiKey = "867ee0b8397845db43d24c7003e387b5742e2bdc";
var startBtnEl = document.querySelector("#start");
var workoutContainerEl = document.querySelector("#workout-container");
var chooseDateBtn = document.querySelector("#choose-date");
var speedShowEl = document.querySelector("#speed-show");
var hiitShowEl = document.querySelector("#hiit-show");
var distanceShowEl = document.querySelector("#distance-show");
var exerciseHeadingEl = document.querySelector("#exercise-heading");
var chooseDateBtn = document.querySelector("#choose-date");
var dayButtonsEl = document.querySelector("#day-buttons");

var burpeeHiitEl = document.querySelector("#burpee-hiit");
var fullBodyHiitEl = document.querySelector("#full-body-hiit");
var easyRunEl = document.querySelector("#easy-run");
var tempoRunEl = document.querySelector("#tempo-run");
var ladderSpeedEl = document.querySelector("#ladder-speed");
var hillSpeedEl = document.querySelector

var categories = ["Cardio", "Core", "Upper Body", "Lower Body"];

var days = [
  [], // Sunday Funday
  [], // Monday
  [], 
  [],
  [],
  [],
  [], // Saturday
];

var strengthWorkout = JSON.parse(localStorage.getItem("strengthWorkout")) || [
  [], // Sunday Funday
  [], // Monday
  [], 
  [],
  [],
  [],
  [], // Saturday
];

// strengthWorkout[0] = ["Chin Ups", "Sit Ups"]; 

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
    var slicedExercises = shuffledExercises.slice(0, 10);
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
      // console.log(labelEl.textContent);
    }
  }


  dayButtonsEl.classList.remove("hide");
  exerciseHeadingEl.classList.remove("hide");
  // dayButtonsEl.setAttribute("id", "merge_button");

  // 

  dayButtonsEl.addEventListener("click", function (event) {
    event.preventDefault();
    var element = event.target;
    
    if (element.matches('button')) {
      var index = element.dataset.index;
      var checkedBoxes = document.querySelectorAll('#labelId input[type=checkbox]:checked');
      var selectedCheckboxes = Array.from(checkedBoxes);
      // console.log(selectedCheckboxes);
      var selectionNames = selectedCheckboxes.map(function (checkbox) {
        return checkbox.dataset.name;
      });
      // saves the new array, selectedNames, to the local storage
      strengthWorkout[index] = selectionNames;
      localStorage.setItem("strengthWorkout", JSON.stringify(strengthWorkout));
      for (var checkedBox of checkedBoxes) {
        checkedBox.checked = false;
      }
      location.replace("./weekly-planner.html");
    } 
  });
}

// dayButtonsEl.addEventListener("click", function (event) {
//   event.preventDefault();
//   var element = event.target;
//   if (element.matches('#merge_button')) {
//     var selectedCheckboxes = Array.from(document.querySelectorAll('#labelId input[type=checkbox]:checked'));
//     // console.log(selectedCheckboxes);
//     var selectionNames = selectedCheckboxes.map(function (checkbox) {
//       return checkbox.dataset.name;
//     });
//     // saves the new array, selectedNames, to the local storage
//   } strengthWorkout = strengthWorkout.concat(selectionNames);
//   localStorage.setItem("strengthWorkout", JSON.stringify(strengthWorkout));
//   location.replace("./weekly-planner.html");
// });
// }




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
  window.onscroll = function () { scrollFunction() };

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

  // inspirational quotes in hero banner
  var quoteBank = [
    "'The pain you feel today, will be the strength you feel tomorrow.'",
    "'Do something today that your future self will thank you for.'",
    "'When you feel like quitting, think of why you started.'",
    "'You are worth it. Keep going.'",
    "'All progress takes place outside the comfort zone.'",
    "'Stay patient and trust your journey.'",
    "'The key to success is to focus on goals, not obstacles.'",
    "'Don't limit your challenges. Challenge your limits.'",
    "'The distance between your dreams and reality is called action.'",
    "'One day or day one. You decide.'",
    "'Difficult roads often lead to beautiful destinations.'",
    "'Be yourself. Everyone else is already taken.'",
    "'Strive for progress, not perfection.'",
    "'Believe you can, and you're halfway there.'",
    "'Each morning we are born again. What we do today matters most.'",
    "'Take a deep breath and remember that where you are now isn't where you are going to end up.'",
    "'Let us make our future now, and let us make our dreams tomorrow's reality.'",
  ];



  function newQuote() {
    var randomNumber = Math.floor(Math.random() * quoteBank.length);
    document.getElementById("quoteDisplay").innerHTML = quoteBank[randomNumber];
  }

  newQuote();


  const chosenBtnEl = document.querySelector("#chosen-button");
  chosenBtnEl?.addEventListener("click", (getSelectedCheckboxValues));