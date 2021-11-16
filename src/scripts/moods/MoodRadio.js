import { JournalList } from "../journals/JournalList.js";
import { getMoods, useMoods } from "./MoodProvider.js";

export const MoodRadio = (moods) => {
  return `
    <!-- Mood Radio filter group -->
    <fieldset class="field">
      <legend>Filter Entries by Mood</legend>
      <div class="control">
      ${
        moods.map(mood => `
        
          <label class="radio">
            <input type="radio" name="mood-filter" value="${mood.id}">
            ${mood.label}
          </label>
          
          `).join('')
        }
      </div>
    </fieldset>
  `;
}

getMoods().then(() => {
  document.querySelector('.mood-filter-container').innerHTML = MoodRadio(useMoods());
  document.querySelector('.mood-filter-container .field').addEventListener('change', e => {
    JournalList('moodId', +e.target.value);
  });
});