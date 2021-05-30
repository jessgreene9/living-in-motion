var apiKey = "867ee0b8397845db43d24c7003e387b5742e2bdc";
var startBtnEl = document.querySelector("#start");
var workoutContainerEl = document.querySelector("#workout-container");
var chooseDateBtn = document.querySelector("#choose-date");

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
    var slicedExercises = shuffledExercises.slice(0, 15);
    console.log(slicedExercises);
    
    for (var i = 0; i < slicedExercises.length; i++) {
      var inputEl = document.createElement("input");
      inputEl.setAttribute("type", "checkbox");
      inputEl.className = "exercises";
      inputEl.setAttribute("name", "name");
      var labelEl = document.createElement("label");
      labelEl.textContent = slicedExercises[i].name;
      labelEl.className = "row checkbox-container";
      labelEl.setAttribute("id", "labelId");
      labelEl.setAttribute("value", "slicedExercises[i].name");
      listOfExercisesEl.appendChild(labelEl);
      labelEl.prepend(inputEl);
      
      chooseDateBtn.classList.remove("hide");
      
      //   function getCheckboxLabel(checkbox) {
        //     if (checkbox.parentNode.tagName === 'LABEL') {
          //         return checkbox.parentNode
          //     }
          //     if (checkbox.id) {
            //         return document.querySelector('label[for="' + checkbox.id + '"]')
            //     }
            
            // }
            
            // $("#merge_button").click(function(event){
              //   event.preventDefault();
              //   var searchIDs = [];
              //   $("#labelId input:checkbox:checked").map(function(){
                //       searchIDs.push($(this).val());
          //   });
          //   console.log(searchIDs);
          // });
          
          //   chooseDateBtn.addEventListener("click", function(){
            
            //     // var searchIds = [];
            //     // var checkedEl= document.querySelector('.exercises').checked;
            //     var searchIDs = [];
            //   $(".exercises input:checkbox:checked").map(function(){
              //     searchIDs.push($(this).val());
              //   });
              //   console.log(searchIDs);
              // });
              
              //  console.log(searchIds);
              
              // localStorage.setItem("exercise", JSON.stringify(checkedEl));
              // var checkedValue = null;
              // var inputElements = document.querySelector('.exercises');
              // for(var i=0; inputElements[i]; ++i){
                //       if(inputElements[i].checked){
                  //            checkedValue = inputElements[i].value;
                  //            break;
        //       }
        // console.log("hello");
        // }
        
        // var checkedValue = document.querySelector(labelEl.checked).value;
        // console.log(checkedValue);
        // document.querySelector(".exercises").onclick = function() {
          //   var checkboxes = document.getElementsByName('name');
          //   for (var checkbox of checkboxes)
          //   {
            //       if (checkbox.checked) {
              //           inputEl.append(checkbox.value + ' ');
              //     }
              // }
            }
          }
          let checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
          let label= document.querySelectorAll("label");
          console.log(label);
          console.log(checkboxes);
          if (checkboxes) {
            console.log(data.label.innerText);  
        }}
        // function getCheckboxLabel() {
          // }};
          // var selectedCheckboxes = document.querySelectorAll("input[type=checkbox]:checked");
          // var searchIds = selectedCheckboxes.map(function(checkbox) {
            //   return checkbox.label;
            // });
            // console.log(searchIds); 
            
            // var exerciseLabel = labelEl.value
          
          // localStorage.setItem(exerciseLabel, JSON.stringify(inputEl.checked));
          // });
          
          chooseDateBtn.addEventListener("click", (getCheckboxLabel));
          function getCheckboxLabel(){};



const chosenBtnEl = document.querySelector("#chosen-button");
chosenBtnEl.addEventListener("click", (getSelectedCheckboxValues)); 

// mobile menu

// var burgerIconEl = document.querySelector("#burger");
// var navbarMenuEl = document.querySelector("#nav-links");

// burgerIconEl.addEventListener("click", () => {
//     navbarMenuEl.classList.toggle("is-active");
// });

// startBtnEl.addEventListener('click', )
