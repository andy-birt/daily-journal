let concepts = [];

export const useConcepts = () => {
  return concepts.slice();
}

export const getConcepts = () => {
  return fetch('http://localhost:8088/concepts')
  .then(res => res.json())
  .then(data => concepts = data);
}

export const searchConcept = concept => {
  return fetch(`http://localhost:8088/concepts?name=${concept}`)
  .then(res => res.json());
}

export const saveConcept = concept => {
  return fetch('http://localhost:8088/concepts', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(concept)
  }).then(res => res.json());
}