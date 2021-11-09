import { saveJournalEntry } from "./JournalDataProvider.js";
import { JournalList } from "./JournalList.js";

const newEntry = {id: '', date: new Date().toLocaleDateString('en-CA'), concepts: [''], entry: '', mood: 'undefined'};

const createEntry = (e) => {

  // Assume the user wants all fields cleared to create a new entry
  setJournalFormFields(newEntry);

  const formModal = document.querySelector('.modal');
  const button = document.querySelector('.submit');
  

  // Disable the save button by default
  button.disabled = true;

  // When 'New Log' button is clicked a modal will take up the screen
  formModal.classList.add('is-active');

  // While modal is active, listen for a click in the darkened area which will close the modal
  document.querySelector('.modal-background').addEventListener('click', () => {
    formModal.classList.remove('is-active');
  });

  // Revalidate form when values change
  formModal.addEventListener('change', e => {
    // Check for form value validity
    const entryFields = getJournalFormFields();
    if (entryFields.date === 'Invalid Date' || entryFields.concepts === '' || entryFields.entry === '' || entryFields.mood === 'undefined' || e.target.value === '') {
      
      button.disabled = true;
      
    } else {

      button.disabled = false;

    }
  });

  
  // When user clicks on 'Save/Edit Entry'
  button.addEventListener('click', e => {
    if (e.target.value.startsWith('Save')) {
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

      // The Mood value is capitalized 'foo' would become 'Foo'
      entryFields.mood = entryFields.mood.charAt(0).toUpperCase() + entryFields.mood.slice(1);

      // Once the entry is created clear the fields
      setJournalFormFields(newEntry);

      // Tuck away the journal form
      formModal.classList.remove('is-active');

      // This part should look familiar
      saveJournalEntry(entryFields)
      .then(JournalList);

    }
  });
}


const newLogModal = document.querySelector('.button.new-log');
newLogModal.addEventListener('click', createEntry);


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
  document.querySelector('#dev-log-concepts').value = concepts.join(', ');

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
    concepts: document.querySelector('#dev-log-concepts').value,

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

            <!-- Text input form group -->
            <fieldset class="field">
              <label class="label" for="dev-log-concepts">Concepts Covered</label>
              <div class="control">
                <input class="input" type="text" name="dev-log-concepts" id="dev-log-concepts" value="${entry.concepts.join(', ')}">
              </div>
            </fieldset>

          </div>


        </div>

        <!-- Log entry form group -->
        <fieldset class="field">
          <label class="label" for="dev-log-entry">Log Entry</label>
          <div class="control">
            <textarea class="textarea" name="dev-log-entry" id="dev-log-entry" cols="30" rows="10">${entry.entry}</textarea>
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
