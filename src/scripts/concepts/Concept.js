export const Concept = (concept) => {
  return `<span class="tag is-light concept_${concept.replaceAll(' ', '-').toLowerCase()}">${concept}</span>`;
}