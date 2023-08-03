// let addIngredientsBtn = document.getElementById("addIngredientsBtn");
// let ingredientList = document.querySelector(".ingredientList");
// let ingredientDiv = document.querySelectorAll(".ingredientDiv")[0];

// addIngredientsBtn.addEventListener('click', function(){
//     let newIngredients = ingredientDiv.cloneNode(true);
//     let input = newIngredients.getElementByTagName("input")[0];
//     input.value = '';
//     ingredientList.appendChild(newIngredients);
// });

let addIngredientsBtn = document.getElementById('addIngredientsBtn');
let ingredientList = document.querySelector('.ingredientList');
let ingredeintDiv = document.querySelectorAll('.ingredeintDiv')[0];

addIngredientsBtn.addEventListener('click', function(){
  let newIngredients = ingredeintDiv.cloneNode(true);
  let input = newIngredients.getElementsByTagName('input')[0];
  input.value = '';
  ingredientList.appendChild(newIngredients);
});