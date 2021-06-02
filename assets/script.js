var apiKey = "867ee0b8397845db43d24c7003e387b5742e2bdc";
var startBtnEl = document.querySelector("#start");
var workoutContainerEl = document.querySelector("#workout-container");
var chooseDateBtn = document.querySelector("#choose-date");
var chooseDateBtn = document.querySelector("#choose-date");
var dayButtonsEl = document.querySelector("#day-buttons");
var cardioSaveButtonEl = document.querySelector(".cardio-save-button");
var dayContainerEl = document.querySelectorAll("#day-container .column");
var workoutWrapperEl = document.querySelector(".workout-wrapper");
var modalEl = document.querySelector("#page-modal");
var closeEl = document.querySelector(".modal-close");
var deleteEl = document.querySelector(".delete");
var cardioDayButtonsEl = document.querySelector("#cardio-day-buttons");
var secondModalEl = document.querySelector("#second-modal");
var strengthModalEl = document.querySelector('#strength-modal');

var mybuttonEl = document.getElementById("myBtn");

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

var categories = ["Cardio", "Core", "Upper Body", "Lower Body"];

var cardioWorkout = JSON.parse(localStorage.getItem("cardioWorkout")) || [
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

newQuote();
renderSavedWorkouts();

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
    var slicedExercises = shuffledExercises.slice(0, 15);
    console.log(slicedExercises);

    for (var i = 0; i < slicedExercises.length; i++) {
      var inputEl = document.createElement("input");
      inputEl.setAttribute("type", "checkbox");
      inputEl.className = "exercises";
      inputEl.setAttribute("name", "name");
      inputEl.setAttribute("data-name", slicedExercises[i].name);
      var labelEl = document.createElement("label");
      labelEl.textContent = slicedExercises[i].name;
      labelEl.className = "row checkbox-container has-text-black";
      labelEl.setAttribute("id", "labelId");
      labelEl.setAttribute("value", "slicedExercises[i].name");
      listOfExercisesEl.appendChild(labelEl);
      labelEl.prepend(inputEl);
    }
  }
  var exerciseHeadingEl = document.querySelector("#exercise-heading");

  dayButtonsEl.classList.remove("hide");
  exerciseHeadingEl.classList.remove("hide");
}

function renderSavedWorkouts() {
  for (var i = 0; i < dayContainerEl.length; i++) {
    // for (var j = 0; j < days[i].length; j++) {
    // console.log(days[0][j]);
    console.log(strengthWorkout[i]);

    // if statement 
    if (strengthWorkout[i].length) {
      console.log("here");
      var cardContent = dayContainerEl[i].querySelector(".day-card-content");
      // dayContainerEl[i]?.classList.remove("hide");
      for (var workout of strengthWorkout[i]) {
        var liEl = document.createElement("li");
        liEl.textContent = workout;
        cardContent?.appendChild(liEl);
      }
    }
    if (cardioWorkout[i].length) {
      console.log("here");
      var cardContent = dayContainerEl[i].querySelector(".day-card-content");
      // dayContainerEl[i]?.classList.remove("hide");
      for (var workout of cardioWorkout[i]) {
        var liEl = document.createElement("li");
        liEl.textContent = workout;
        cardContent?.appendChild(liEl);
      }
    }
  }
}

//mobile menu
var burgerIconEl = document.querySelector("#burger");
var navbarMenuEl = document.querySelector("#nav-links");

burgerIconEl.addEventListener("click", () => {
  navbarMenuEl.classList.toggle("is-active");
});

// Select cardio workout category and display workout divs
var cardioSelections = document.querySelectorAll('input[name="selection"]');
var selectedValue;

for (var i = 0; i < cardioSelections.length; i++) {
  var speedShowEl = document.querySelector("#speed-show");
  var hiitShowEl = document.querySelector("#hiit-show");
  var distanceShowEl = document.querySelector("#distance-show");

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

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybuttonEl.style.display = "block";
  } else {
    mybuttonEl.style.display = "none";
  }
}

// inspirational quotes in hero banner
function newQuote() {
  var randomNumber = Math.floor(Math.random() * quoteBank.length);
  document.getElementById("quoteDisplay").innerHTML = quoteBank[randomNumber];
}

dayButtonsEl?.addEventListener("click", function (event) {
  event.preventDefault();
  var element = event.target;
  var index = element.dataset.index;
  if (element.matches('button')) {
    var checkedBoxes = document.querySelectorAll('#labelId input[type=checkbox]:checked');
    var selectedCheckboxes = Array.from(checkedBoxes);
    var selectionNames = selectedCheckboxes.map(function (checkbox) {
      return checkbox.dataset.name;
    });
    // saves the new array, selectedNames, to the local storage
    strengthWorkout[index] = selectionNames;
    localStorage.setItem("strengthWorkout", JSON.stringify(strengthWorkout));
    for (var checkedBox of checkedBoxes) {
      checkedBox.checked = false;
    }
    // location.replace("./weekly-planner.html");
    strengthModalEl.style.display = "block";
  }
});

// save cardio workout selection to local storage after clicking Save Workout button
function openDaysModal(title) {
  modalEl.style.display = "block";
  modalEl.dataset.title = title;
}

function saveCardioWorkout(event) {
  event.preventDefault();
  var element = event.target;
  if (element.matches('.cardio-save-button')) {
    console.log("Hello");

    var cardioTitle = element.closest(".card").querySelector(".cardio-title").textContent.trim();
    console.log(cardioTitle);
    openDaysModal(cardioTitle);
  }
}

function pickDateButton(event) {
  event.preventDefault();
  var element = event.target;
  if (element.matches('.date-button')) {
    console.log("Hello");

    var cardioTitle = element.closest(".modal").dataset.title.trim();
    console.log(cardioTitle);
    var index = element.dataset.index;
    cardioWorkout[index] = cardioWorkout[index].concat(cardioTitle);
    localStorage.setItem("cardioWorkout", JSON.stringify(cardioWorkout));
    secondModalEl.style.display = "block";
    modalEl.style.display = "none";
  }
}

function cardioDaysModalClose(event) {
  event.preventDefault();
  if (event.target.className == 'modal-background') {
    modalEl.style.display = "none";
  }
}


modalEl?.addEventListener('click', cardioDaysModalClose);
workoutWrapperEl?.addEventListener('click', saveCardioWorkout);
modalEl?.addEventListener('click', pickDateButton);

const chosenBtnEl = document.querySelector("#chosen-button");
chosenBtnEl?.addEventListener("click", (getSelectedCheckboxValues));