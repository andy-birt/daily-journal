let entryConcepts = [];

export const useEntryConcepts = () => {
  return entryConcepts.slice();
}

export const getEntryConcepts = () => {
  return fetch('http://localhost:8088/entryconcepts')
  .then(res => res.json())
  .then(data => entryConcepts = data);
}