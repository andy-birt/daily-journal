import { deleteJournalEntry, useJournalEntries, updateJournalEntry } from "./JournalDataProvider.js";
import { setJournalFormFields, getJournalFormFields } from "./JournalForm.js";
import { JournalList } from "./JournalList.js";

const newEntry = {id: '', date: new Date().toISOString().split('T')[0], concepts: [''], entry: '', mood: 'undefined'};

const entryEvent = document.querySelector('.entries');

entryEvent.addEventListener('click', e => {
  
  if (e.target.id.startsWith('editEntry')) {
    const entryID = e.path[0].id.split('--')[1];
    const entry = useJournalEntries().find( entry => entry.id.toString() === entryID );
    entry.date = new Date().toLocaleDateString('en-CA');

    setJournalFormFields(entry);

    
    document.querySelector('.modal').classList.add('is-active');

    document.querySelector('.submit').addEventListener('click', e => {
      if (e.target.value.startsWith('Edit')) {
        // Prevent Default behavior for a form to be submitted
        // In this case to refresh the page
        // Handle the form submission using AJAX request
        e.preventDefault();
  
        const entryFields = getJournalFormFields();
  
  
        
        // Set up the new entry body
        // Default form date format yyyy-MM-dd
        // In the future don't format date for the api
        // Save it as it is then just format it on the front end
        const dld = entryFields.date.split('-');          //-----------------------------  returns ['yyyy', 'MM', 'dd']
        entryFields.date = new Date(dld[0], dld[1] - 1, dld[2]) //-----------------------------  create new date from submitted form
        .toLocaleDateString('en-US', { year: "numeric", day: "numeric", month: "short"})// format the date like we did in Glassdale this time using options in the second argument return 'Oct 31, 2021' for example...
        .split(',').join('');                             //-----------------------------  the split would return ['Oct 31', ' 2021'], then finally join 'Oct 31 2021' 
  
        // The form is a string where the user should separate each concept with a comma which will end up as an array ['HTML', 'CSS', 'JavaScript']
        entryFields.concepts = entryFields.concepts.split(', ');
  
        // Just get the text in the textarea field, nothing special
        const entry = entryFields.entry;
  
        // The Mood value is capitalized 'foo' would become 'Foo'
        entryFields.mood = entryFields.mood.charAt(0).toUpperCase() + entryFields.mood.slice(1);
  
        // Check for validity
        if (entryFields.date === 'Invalid Date' || entryFields.concepts[0] === '' || entry === '' || entryFields.mood === '') {
          
          // TODO: Use something other than an alert. Maybe text field indicators or notification
          alert('Please enter valid values');
        } else {
  
          // Once the entry is created clear the fields
          setJournalFormFields(newEntry);
  
          // Tuck away the journal form
          document.querySelector('.modal').classList.remove('is-active');

          // This part should look familiar
          updateJournalEntry(entryFields)
          .then(JournalList);
  
        }
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