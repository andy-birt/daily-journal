let entryConcepts = [];

export const useEntryConcepts = () => {
  return entryConcepts.slice();
}

export const getEntryConcepts = () => {
  return fetch('http://localhost:8088/entryconcepts')
  .then(res => res.json())
  .then(data => entryConcepts = data);
}

export const saveEntryConcept = ec => {
  return fetch('http://localhost:8088/entryconcepts', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(ec)
  });
}