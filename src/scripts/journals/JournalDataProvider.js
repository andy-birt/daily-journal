// Journal Data


let journalData = [];

export const useJournalEntries = () => {
  return journalData.sort((currentEntry, nextEntry) => Date.parse(currentEntry.date) - Date.parse(nextEntry.date));
}

export const getJournalEntries = () => {
  return fetch('http://localhost:8088/entries?_expand=mood&_expand=instructor')
  .then(res => res.json())
  .then(data => journalData = data);
}

export const saveJournalEntry = entry => {
  return fetch('http://localhost:8088/entries', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(entry)
  })
  .then(res => res.json());
}

export const updateJournalEntry = entry => {
  return fetch(`http://localhost:8088/entries/${entry.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(entry)
  })
  .then(getJournalEntries);
}

export const deleteJournalEntry = entryID => {
  return fetch(`http://localhost:8088/entries/${entryID}`, {
    method: "DELETE"
  });
}