import { JournalList } from "./journals/JournalList.js";
import { JournalForm } from "./journals/JournalForm.js";
// For now comment out the concept data provider
// When the data is set up properly I will use this
// import { getConcepts } from "./concepts/ConceptDataProvider.js";

// getConcepts().then(() => {
  JournalList();
  JournalForm();
// });