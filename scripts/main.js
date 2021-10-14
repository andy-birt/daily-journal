// Import the JournalList function
import { JournalList } from "./journals/JournalList.js";
// and invoke the component generator
JournalList();


/************* Components on the top, Handle events on the bottom ***********************************************/


// The following is basically handling events for buttons
function optionClick(){
  this.className === "dropdown is-right" ? 
    this.className = "dropdown is-right is-active" :
    this.className = "dropdown is-right";
}

function newLog(){
  this.className === "button new-log" ?
    document.querySelector('.modal').className = "modal is-active" :
    document.querySelector('.modal').className = "modal"; 
}

function closeModal(){
  document.querySelector('.modal').className === "modal" ?
    document.querySelector('.modal').className = "modal is-active" :
    document.querySelector('.modal').className = "modal"; 
}

const dropdownButtons = document.querySelectorAll('.dropdown');

const newLogModal = document.querySelector('.button.new-log');

const closeModalButton = document.querySelector('.modal-card-head .delete');

newLogModal.addEventListener('click', newLog);

closeModalButton.addEventListener('click', closeModal);

for (const button of dropdownButtons) {
  button.addEventListener('click', optionClick);
}