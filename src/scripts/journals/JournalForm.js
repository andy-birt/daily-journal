import { saveJournalEntry } from "./JournalDataProvider.js";
import { JournalList } from "./JournalList.js";

const newEntry = {id: '', date: Date.now(), concepts: [''], entry: '', mood: ''};

const newLog = (e) => {
  const formModal = document.querySelector('.modal');
  formModal.classList.add('is-active');

  document.querySelector('.modal-background').addEventListener('click', e => {
    formModal.classList.remove('is-active');
  });
  
  const button = document.querySelector('.submit');
  button.addEventListener('click', e => {
    if (e.target.value === "Go For It") {
      e.preventDefault();

      // Journal Form ids
      
      // dev-log-date
      const devLogDate = document.querySelector('#dev-log-date');

      // dev-log-concepts
      const devLogConcepts = document.querySelector('#dev-log-concepts');

      // dev-log-entry
      const devLogEntry = document.querySelector('#dev-log-entry');

      // dev-log-mood
      const devLogMood = document.querySelector('#dev-log-mood');
      
      // Set up the new entry body
      const dld = devLogDate.value.split('-');
      const date = new Date(dld[0], dld[1] - 1, dld[2])
      .toLocaleDateString('en-US', { year: "numeric", day: "numeric", month: "short"})
      .split(',').join('');

      const concepts = devLogConcepts.value.split(', ');
      const entry = devLogEntry.value;
      const mood = devLogMood.value.charAt(0).toUpperCase() + devLogMood.value.slice(1);
      
      // Initialize new entry
      const newEntry = {
        date,
        concepts,
        entry,
        mood
      };

      // Check for validity
      if (date === 'Invalid Date' || concepts[0] === '' || entry === '' || mood === '') {
        alert('Please enter valid values');
      } else {
        devLogDate.value = '';
        devLogConcepts.value = '';
        devLogEntry.value = '';

        formModal.classList.remove('is-active');

        saveJournalEntry(newEntry)
        .then(JournalList);

      }
    }
  });
  
}

const newLogModal = document.querySelector('.button.new-log');
newLogModal.addEventListener('click', newLog);

export const JournalForm = (entry = newEntry) => {

  const action = entry.id !== '' ? 'Edit' : 'Save';

  return `
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
              <select name="dev-log-mood" id="dev-log-mood" value="${entry.mood}">
                <option value="''">How are you feeling?</option>
                <option value="stoked">Stoked</option>
                <option value="confident">Confident</option>
                <option value="meh">Meh</option>
                <option value="unsure">Unsure</option>
                <option value="disappointed">Disappointed</option>
                <option value="pissed">Pissed</option>
              </select>
            </div>
            
          </fieldset>
          
          <!-- Submit form -->
          <div class="column submit-button">
            <input type="submit" class="button submit is-fullwidth" value="${action} Entry">
          </div>
          

        </footer>
      </div>
    </form>
  </div>
  `;
}

document.querySelector('.journal-form-container').innerHTML = JournalForm();
