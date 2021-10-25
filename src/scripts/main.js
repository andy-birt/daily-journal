// Import the JournalList function
import { JournalList } from "./journals/JournalList.js";
import { JournalForm } from "./journals/JournalForm.js";

// and invoke the component generator
JournalList();
// JournalForm();

/************* Components on the top, Handle events on the bottom ***********************************************/


// The following is basically handling events for buttons
function optionClick(){
  this.className === "dropdown is-right" ? 
    this.className = "dropdown is-right is-active" :
    this.className = "dropdown is-right";
}

const dropdownButtons = document.querySelectorAll('.dropdown');

for (const button of dropdownButtons) {
  button.addEventListener('click', optionClick);
}