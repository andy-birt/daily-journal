import { deleteJournalEntry, useJournalEntries, updateJournalEntry } from "./JournalDataProvider.js";
import { setJournalFormFields, setJournalFormBody, formFieldValidation } from "./JournalForm.js";
import { JournalList } from "./JournalList.js";

const entryEvent = document.querySelector('.entries');

entryEvent.addEventListener('click', e => {
  
  if (e.target.id.startsWith('editEntry')) {
    const entryID = e.path[0].id.split('--')[1];
    const entry = useJournalEntries().find( entry => entry.id.toString() === entryID );
    entry.date = new Date().toLocaleDateString('en-CA');

    const button = document.querySelector('.submit');

    setJournalFormFields(entry);

    button.disabled = true;
    
    document.querySelector('.modal').classList.add('is-active');

    document.querySelector('.modal').addEventListener('change', formFieldValidation);

    document.querySelector('.submit').addEventListener('click', e => {
      if (e.target.value.startsWith('Edit')) {
        // Prevent Default behavior for a form to be submitted
        // In this case to refresh the page
        // Handle the form submission using AJAX request
        e.preventDefault();
        const editedJournalEntry = setJournalFormBody();

        // This part should look familiar
        updateJournalEntry(editedJournalEntry)
        .then(JournalList);
         
      }
    });

    document.querySelector('.modal-background').addEventListener('click', e => {
      document.querySelector('.modal').classList.remove('is-active');
    });
  }

  if (e.target.id.startsWith('deleteEntry')) {
    if (confirm('Are you sure you want to delete entry?')){
      const entryID = e.path[0].id.split('--')[1];
      deleteJournalEntry(entryID)
      .then(JournalList);
    }
  }
});

// Concept List

const Concepts = (concept) => {
  // TODO: Consider CSS classes to extend for different color options
  return `
    <span class="tag is-primary is-light">${concept}</span>
  `;
}

// Journal Component

export const Journal = (journal) => {

  // Make some mini concept components for the journals concepts
  let conceptsHTML = '';
  journal.concepts.forEach(concept => conceptsHTML += Concepts(concept));

  return `
  <li id="journal-${journal.id}" class="box">
    <article class="entry">
      <div class="columns">
        <div class="column is-2">
          <h2 class="title"><a href="#">${journal.date}</a></h2>
          <h3 class="subtitle">${journal.mood}</h3>
          <div class="tags">
            ${conceptsHTML}
          </div>
        </div>
        <div class="column is-9">
          <p>${journal.entry}</p>
        </div>
        <div class="column options">
          <div class="dropdown is-right">
            <div class="dropdown-trigger">
              <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                <span class="pagination-ellipsis options-button">&hellip;</span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
              <div class="dropdown-content">
                <a href="#" id="editEntry--${journal.id}" class="dropdown-item">Edit</a>
                <a href="#" id="deleteEntry--${journal.id}" class="dropdown-item">Delete</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  </li>
  `;
}