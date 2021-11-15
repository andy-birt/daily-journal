import { JournalList } from "./journals/JournalList.js";
import { JournalForm } from "./journals/JournalForm.js";
import { MoodSelect } from "./moods/MoodSelect.js";
import { InstructorSelect } from "./instructors/InstructorSelect.js";
// For now comment out the concept data provider
// When the data is set up properly I will use this
// import { getConcepts } from "./concepts/ConceptDataProvider.js";

// getConcepts().then(() => {
  JournalList();
  JournalForm();
  MoodSelect();
  InstructorSelect();
// });