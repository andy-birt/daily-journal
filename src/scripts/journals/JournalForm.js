import { saveJournalEntry } from "./JournalDataProvider.js";
import { JournalList } from "./JournalList.js";

const newEntry = {id: '', date: new Date().toLocaleDateString('en-CA'), concepts: [], entry: '', mood: 'undefined'};

const closeModalFromBackgroundClick = (e) => {
  e.target.parentNode.classList.remove('is-active');
}

const closeModalByButton = (e) => {
  // Remove concepts from the entry
  if (e.target.className === 'delete is-small') {
    e.preventDefault();
    e.target.closest('.block').remove();
  }

  // Close the form modal
  if (e.target.className === 'delete') {
    e.preventDefault();
    e.target.closest('.modal').classList.remove('is-active');
  }
}

const saveEvent = (e) => {
  if (e.target.value.startsWith('Save')) {
    // Prevent Default behavior for a form to be submitted
    // In this case to refresh the page
    // Handle the form submission using AJAX request
    e.preventDefault();
    const newJournalEntry = setJournalFormBody();

    // This part should look familiar
    saveJournalEntry(newJournalEntry)
    .then(JournalList);
  }
}

const conceptsEvent = (e) => {
  // This condition only executes when the ',' key is pressed
  if (e.key === ',') {
    // Take the value before the comma
    // It will be a concept
    const [concept] = e.target.value.split(',');
    // Expression is equal to:
    // const concept = e.target.value.split(',')[0];
    
    // Create a wrap element for the tag 
    const tagBlock = document.createElement('span');

    // This is the tag for the concept typed
    const conceptTag = document.createElement('span');

    // Make a delete button to remove concept
    const deleteButton = document.createElement('button');

    // Set class names for each element
    tagBlock.className = 'block';
    conceptTag.className = 'tag is-light mt-2 mr-2';
    deleteButton.className = 'delete is-small';

    // Remove text from input element
    e.target.value = '';
    
    // Append newly created elements underneath the concept input area 
    conceptTag.append(concept, deleteButton);
    tagBlock.append(conceptTag);
    document.querySelector('.entry-concepts').append(tagBlock);

  }
}

const createEntry = () => {

  // Assume the user wants all fields cleared to create a new entry
  setJournalFormFields(newEntry);

  const formModal = document.querySelector('.modal');
  const conceptsText = document.querySelector('#dev-log-concepts');
  const conceptsArea = document.querySelector('.entry-concepts');
  const button = document.querySelector('.submit');

  // Remove any badges from concept area
  conceptsArea.innerHTML = ''; 

  // Disable the save button by default
  button.disabled = true;

  // When 'New Log' button is clicked a modal will take up the screen
  formModal.classList.add('is-active');

  // While modal is active, listen for a click in the darkened area which will close the modal
  document.querySelector('.modal-background').addEventListener('click', closeModalFromBackgroundClick);

  // Revalidate form when values change
  formModal.addEventListener('change', formFieldValidation);

  // As user types out concepts a comma will make a badge out of the concept typed
  // The tag will have a delete button to remove tag from the concept list
  conceptsText.addEventListener('keyup', conceptsEvent);

  // Handle click events in the form modal for delete buttons
  formModal.addEventListener('click', closeModalByButton);
 
  // When user clicks on 'Save/Edit Entry'
  button.addEventListener('click', saveEvent);
}

export const formFieldValidation = (e) => {
  const button = document.querySelector('.submit');

  // Check for form value validity
  const entryFields = getJournalFormFields();
  if (entryFields.date === 'Invalid Date' || entryFields.concepts.length < 1 || entryFields.entry === '' || entryFields.mood === 'undefined' || e.target.value === '') {
    
    button.disabled = true;
    
  } else {

    button.disabled = false;

  }
}

export const setJournalFormBody = () => {
  const entryFields = getJournalFormFields();
  const formModal = document.querySelector('.modal');
  
  // Set up the new entry body
  // Default form date format yyyy-MM-dd
  // In the future don't format date for the api
  // Save it as it is then just format it on the front end
  const dld = entryFields.date.split('-');          //-----------------------------  returns ['yyyy', 'MM', 'dd']
  entryFields.date = new Date(dld[0], dld[1] - 1, dld[2]) //-----------------------------  create new date from submitted form
  .toLocaleDateString('en-US', { year: "numeric", day: "numeric", month: "short"})// format the date like we did in Glassdale this time using options in the second argument return 'Oct 31, 2021' for example...
  .split(',').join('');                             //-----------------------------  the split would return ['Oct 31', ' 2021'], then finally join 'Oct 31 2021' 

  // The form is a string where the user should separate each concept with a comma which will end up as an array ['HTML', 'CSS', 'JavaScript']
  // entryFields.concepts = entryFields.concepts.split(', ');

  // The Mood value is capitalized 'foo' would become 'Foo'
  entryFields.mood = entryFields.mood.charAt(0).toUpperCase() + entryFields.mood.slice(1);

  // Once the entry is created clear the fields
  setJournalFormFields(newEntry);

  // Tuck away the journal form
  formModal.classList.remove('is-active');
  return entryFields;
}

export const setJournalFormFields = (journal) => {
  
  const { id, entry, date, concepts, mood } = journal;
  const button = document.querySelector('.button');
  
  // dev-log-id
  document.querySelector('#dev-log-id').value = id;
  
  // dev-log-entry
  document.querySelector('#dev-log-entry').value = entry;
  
  // dev-log-date
  document.querySelector('#dev-log-date').value = date;

  // dev-log-concepts
  if (concepts.length) {
    // Clear the concepts tag area to insert the new ones
    document.querySelector('.entry-concepts').innerHTML = ''

    // Map over each concept and create the tag elements for the concepts area
    concepts.map( concept => {
      // Create a wrap element for the tag 
      const tagBlock = document.createElement('span');
  
      // This is the tag for the concept typed
      const conceptTag = document.createElement('span');
  
      // Make a delete button to remove concept
      const deleteButton = document.createElement('button');
  
      // Set class names for each element
      tagBlock.className = 'block';
      conceptTag.className = 'tag is-light mt-2 mr-2';
      deleteButton.className = 'delete is-small';
      
      // Append newly created elements underneath the concept input area 
      conceptTag.append(concept, deleteButton);
      tagBlock.append(conceptTag);
      document.querySelector('.entry-concepts').append(tagBlock);
    });
  }

  // dev-log-mood
  document.querySelector(`#dev-log-mood option[value=${mood.toLowerCase()}]`).selected = true;

  if (id !== '') button.value = "Edit Entry";
  else button.value = "Save Entry";

}

export const getJournalFormFields = () => {
  return {

    // dev-log-id
    id: document.querySelector('#dev-log-id').value,
    
    // dev-log-entry
    entry: document.querySelector('#dev-log-entry').value,
    
    // dev-log-date
    date: document.querySelector('#dev-log-date').value,

    // dev-log-concepts
    concepts: Array.from(document.querySelectorAll('.entry-concepts .block .tag')).map( concept => concept.textContent ),

    // dev-log-mood
    mood: document.querySelector('#dev-log-mood').value

  };
}

export const JournalForm = () => {

  const entry = newEntry;

  document.querySelector('.journal-form-container').innerHTML = `
  <div class="modal">
    <div class="modal-background"></div>
    <!-- Form component -->
    <form action="/" >
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Record Entry</p>
        <button class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">

        <div class="columns">
          <div class="column is-4">
            
            <!-- Date form group -->
            <fieldset class="field">
              <label class="label" for="dev-log-date">Date</label>
              <div class="control">
                <input class="input" type="date" name="dev-log-date" id="dev-log-date" value="${new Date(entry.date).toISOString().slice(0, 10)}">
              </div>
            </fieldset>

          </div>
          <div class="column">

            <!-- Concepts input form group -->
            <fieldset class="field">
              <label class="label" for="dev-log-concepts">Concepts Covered</label>
              <div class="control">
                <input class="input" type="text" name="dev-log-concepts" id="dev-log-concepts" value="${entry.concepts}" placeholder="Type out concept then ',' to save it" autocomplete="off">
                <div class="entry-concepts"></div>
              </div>
            </fieldset>

          </div>


        </div>

        <!-- Log entry form group -->
        <fieldset class="field">
          <label class="label" for="dev-log-entry">Log Entry</label>
          <div class="control">
            <textarea class="textarea" name="dev-log-entry" id="dev-log-entry" cols="30" rows="10" placeholder="Talk about the concepts, what did you learn?">${entry.entry}</textarea>
          </div>
        </fieldset>

          

        </section>
        <footer class="modal-card-foot">
          
          <!-- Mood select form group -->
          <fieldset class="field">
            <label class="label" for="dev-log-mood">Current Mood</label>
            <div class="select is-fullwidth">
              <select name="dev-log-mood" id="dev-log-mood">
                <option value="undefined">How are you feeling?</option>
                <option value="stoked">Stoked</option>
                <option value="confident">Confident</option>
                <option value="meh">Meh</option>
                <option value="unsure">Unsure</option>
                <option value="disappointed">Disappointed</option>
                <option value="pissed">Pissed</option>
              </select>
            </div>
            
          </fieldset>

          <input id="dev-log-id" type="text" value="${entry.id}" hidden>
          
          <!-- Submit form -->
          <div class="column submit-button">
            <input type="submit" class="button submit is-fullwidth" value="Save Entry">
          </div>
          

        </footer>
      </div>
    </form>
  </div>
  `;
}

const newLogModal = document.querySelector('.button.new-log');
newLogModal.addEventListener('click', createEntry);