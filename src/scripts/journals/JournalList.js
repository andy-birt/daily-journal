// Generate a list of components and put it in the DOM

// Import journal data and the component it uses.
import { useJournalEntries, getJournalEntries } from "./JournalDataProvider.js";
import { Journal } from "./Journal.js";
import { getConcepts, useConcepts } from "../concepts/ConceptDataProvider.js";
import { getEntryConcepts, useEntryConcepts } from "../entryconcepts/EntryConceptData.js";

// The following is basically handling events for buttons
const optionClick = e => {

  const el = e.path.filter(x => x.className === 'dropdown is-right' || x.className === 'dropdown is-right is-active')[0];
  
  el.className === "dropdown is-right" ? 
    el.className = "dropdown is-right is-active" :
    el.className = "dropdown is-right";
}

export const JournalList = (prop, val) => {
  
  getJournalEntries()
  .then(getConcepts)
  .then(getEntryConcepts)
  .then(() => {

    let html = '';
    
    const journalEntries = prop ? 
      useJournalEntries().filter(entry => entry[prop] === val).sort((a, b) => new Date(b.date) - new Date(a.date)) :
      useJournalEntries().sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const concepts = useConcepts();
    const entryConcepts = useEntryConcepts();
    const el = document.querySelector(".entries");
    
    html += render(journalEntries, concepts, entryConcepts);

    el.innerHTML = html;
    
    const dropdownButtons = document.querySelectorAll('.dropdown');
    for (const button of dropdownButtons) {
      button.addEventListener('click', optionClick);
    }

  });

}

const render = (entriesToRender, allConcepts, allEntryConcepts) => {
  return entriesToRender.map(entry => {
    const entrysConcepts = allEntryConcepts.filter(ec => ec.entryId === entry.id);
    const concepts = entrysConcepts.map(ec => allConcepts.find(concept => concept.id === ec.conceptId));
    return Journal(entry, concepts);
  }).join('');
}