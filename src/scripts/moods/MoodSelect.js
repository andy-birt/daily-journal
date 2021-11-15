import { getMoods, useMoods } from "./MoodProvider.js";

const render = (moods) => {
  document.querySelector('.mood-select-container').innerHTML = `
    <select name="dev-log-mood" id="dev-log-mood">
      <option value="undefined">How are you feeling?</option>
      ${
        moods.map( mood => `<option value="${mood.id}">${mood.label}</option>` ).join('')
      }
    </select>
  `;
}

export const MoodSelect = () => {
  getMoods().then(() => {
    render(useMoods());
  });
}