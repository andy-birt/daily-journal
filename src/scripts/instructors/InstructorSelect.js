import { getInstructors, useInstructors } from "./InstructorData.js"

const render = instructorCollection => {
  document.querySelector('.instructor-select-container').innerHTML = `
    <select id="instructor-select">
      <option value="0">Who the instructor be?</option>
      ${
        instructorCollection.map(instructor => instructor.id ? `<option value="${instructor.id}">${instructor.first_name} ${instructor.last_name}</option>` : '').join('')
      }
    </select>
  `;
}

export const InstructorSelect = () => {
  getInstructors().then(() => {
    render(useInstructors());
  });
}