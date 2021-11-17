export const Concept = (concept) => {
  return `<span class="tag is-light concept_${concept.name.replaceAll(' ', '-').toLowerCase()}">${concept.name}</span>`;
}