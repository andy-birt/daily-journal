// Generate a list of components and put it in the DOM

// Import journal data and the component it uses.
import { useJournalEntries, getJournalEntries } from "./JournalDataProvider.js";
import { Journal } from "./Journal.js";


export const JournalList = () => {
  
  getJournalEntries().then(() => {

    let html = '';
    
    // The following is basically handling events for buttons
    const optionClick = e => {

      const el = e.path.filter(x => x.className === 'dropdown is-right' || x.className === 'dropdown is-right is-active')[0];
      
      el.className === "dropdown is-right" ? 
        el.className = "dropdown is-right is-active" :
        el.className = "dropdown is-right";
    }
    
    const journalEntries = useJournalEntries();
    const el = document.querySelector(".entries");
    
    journalEntries.forEach(entry => html += Journal(entry));

    el.innerHTML = html;
    
    const dropdownButtons = document.querySelectorAll('.dropdown');
    for (const button of dropdownButtons) {
      button.addEventListener('click', optionClick);
    }

  });

}