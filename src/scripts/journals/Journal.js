import { deleteJournalEntry } from "./JournalDataProvider.js";
import { JournalList } from "./JournalList.js";

const deleteEntryEvent = document.querySelector('.entries');

deleteEntryEvent.addEventListener('click', e => {
  if (e.target.id.startsWith('deleteEntry')) {
    if (confirm('Are you sure you want to delete entry?')){

      const entryID = e.path[0].id.split('--')[1];

      deleteJournalEntry(entryID)
      .then(JournalList)
    }
  }
});

// Concept List

const Concepts = (concept) => {
  // Consider CSS classes to extend for different color options
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
  <li id="journal-${journal.id}">
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
                <a href="#" class="dropdown-item">Edit</a>
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