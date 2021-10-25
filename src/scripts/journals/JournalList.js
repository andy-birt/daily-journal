// Generate a list of components and put it in the DOM

// Import journal data and the component it uses.
import { useJournalEntries, getJournalEntries } from "./JournalDataProvider.js";
import { Journal } from "./Journal.js";


export const JournalList = () => {
  getJournalEntries().then(() => {
    
    const journalEntries = useJournalEntries();
    const el = document.querySelector(".entries");
    journalEntries.forEach(entry => el.innerHTML += Journal(entry));
  });
}