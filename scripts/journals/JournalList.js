// Generate a list of components and put it in the DOM

// Import journal data and the component it uses.
import { useJournalEntries } from "./JournalDataProvider.js";
import { Journal } from "./Journal.js";

const journalEntries = useJournalEntries();

export const JournalList = () => {
  const el = document.querySelector(".entries");
  journalEntries.forEach(entry => el.innerHTML += Journal(entry));
}