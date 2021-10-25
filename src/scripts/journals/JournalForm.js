import { saveJournalEntry } from "./JournalDataProvider.js";

const newLog = (e) => {
  document.querySelector('.journal-form-container').innerHTML = JournalForm();
  document.querySelector('.modal').classList.add('is-active');
  
  const button = document.querySelector('.submit');
  button.addEventListener('click', e => {
    if (e.target.value === "Go For It") {
      e.preventDefault();

      const dld = document.querySelector('#dev-log-date').value;

      // dev-log-date
      // dev-log-concepts
      // dev-log-entry
      // dev-log-mood


      const entryDate = new Date(dld)
      console.log(dld)
      // console.log(entryDate.toLocaleDateString('en-US', { year: "numeric", day: "numeric", month: "short"}).split(',').join(''))
    }
  });
  
}

const newLogModal = document.querySelector('.button.new-log');
newLogModal.addEventListener('click', newLog);

export const JournalForm = () => {
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
                <input class="input" type="date" name="dev-log-date" id="dev-log-date">
              </div>
            </fieldset>

          </div>
          <div class="column">

            <!-- Text input form group -->
            <fieldset class="field">
              <label class="label" for="dev-log-concepts">Concepts Covered</label>
              <div class="control">
                <input class="input" type="text" name="dev-log-concepts" id="dev-log-concepts">
              </div>
            </fieldset>

          </div>


        </div>

        <!-- Log entry form group -->
        <fieldset class="field">
          <label class="label" for="dev-log-entry">Log Entry</label>
          <div class="control">
            <textarea class="textarea" name="dev-log-entry" id="dev-log-entry" cols="30" rows="10"></textarea>
          </div>
        </fieldset>

          

        </section>
        <footer class="modal-card-foot">
          
          <!-- Mood select form group -->
          <fieldset class="field">
            <label class="label" for="dev-log-mood">Current Mood</label>
            <div class="select is-fullwidth">
              <select name="dev-log-mood" id="dev-log-mood">
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
            <input type="submit" class="button submit is-fullwidth" value="Go For It">
          </div>
          

        </footer>
      </div>
    </form>
  </div>
  `;
}