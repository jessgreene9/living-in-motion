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
        // function getCheckboxLabel() {
          // }};
        };



        function getInnerText(labelName, label){
        let checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
        let labels= document.querySelectorAll("label");
        console.log(labels);
        console.log(checkboxes);
        var labelText = label.label.innerText;
        console.log(labelText);  
        if (checkboxes) {}};
        // var selectedCheckboxes = document.querySelectorAll("input[type=checkbox]:checked");
        // var searchIds = selectedCheckboxes.map(function(checkbox) {
          //   return checkbox.label;
          // });
          // console.log(searchIds); 
          
          // var exerciseLabel = labelEl.value
        
        // localStorage.setItem(exerciseLabel, JSON.stringify(inputEl.checked));
        // });
        
        chooseDateBtn.addEventListener("click", (getInnerText));
        // function getCheckboxLabel(){};









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



//   // var exerciseLabel = labelEl.value
//   chooseDateBtn.addEventListener("click", function(){
//   localStorage.setItem(exerciseLabel, JSON.stringify(inputEl.checked)); 
// });

function getInnerText(labelName, label){
let checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
console.log(checkboxes);

var checkboxLabel = input.labels.label.innerText;
console.log(checkboxLabel);

var checkedArray= [];



if (checkboxes) {};


}


chooseDateBtn.addEventListener("click", (getInnerText));

// var selectedCheckboxes = document.querySelectorAll("input[type=checkbox]:checked");
// var searchIds = selectedCheckboxes.map(function(checkbox) {
//   return checkbox.label;
// });
// console.log(searchIds); 
          
// var exerciseLabel = labelEl.value

// localStorage.setItem(exerciseLabel, JSON.stringify(inputEl.checked));
// });

// function getCheckboxLabel(){};