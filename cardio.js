var speedShowEl = document.querySelector("#speed-show");
var hiitShowEl = document.querySelector("#hiit-show");
var distanceShowEl = document.querySelector("#distance-show");

// function getSelectedCardioWorkout(event) {
//     event.preventDefault();
//     // used the queryselectorAll() method to select the radio button group with the name selection. The radio buttons all have the same name.
//     var cardioSelections = document.querySelectorAll('input[name="selection"]');

//     // Created a variable with no value for the selection value
//     var selectedValue; 

//     // Iterate over the radio button group and get the value of the radio that comes back as true for checked. 
//     //If the value matches the id of the workout, display show for it and continue to hide the other divs
//     for (var cardioSelection of cardioSelections) {
//         if (cardioSelection.checked) {
//             selectedValue = cardioSelection.value;
//         }
//         if (selectedValue === "speed") {
//             speedShowEl.setAttribute("style", "display: show");
//             hiitShowEl.setAttribute("style", "display: none");
//             distanceShowEl.setAttribute("style", "display: none");
//         } 
//         if (selectedValue === "distance") {
//             speedShowEl.setAttribute("style", "display: none");
//             hiitShowEl.setAttribute("style", "display: none");
//             distanceShowEl.setAttribute("style", "display: show");
//         } 
//         if (selectedValue === "hiit") {
//             speedShowEl.setAttribute("style", "display: none");
//             hiitShowEl.setAttribute("style", "display: show");
//             distanceShowEl.setAttribute("style", "display: none");
//         } 
//     }
// };
// // added an event listener to the button with id cardio-button
// var cardioBtnEl = document.querySelector('#cardio-button');
// cardioBtnEl.addEventListener('click', (getSelectedCardioWorkout));


// Changing code to show div after radio button is selected without clicking submit button. 
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