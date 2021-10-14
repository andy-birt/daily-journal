// Journal Data

// Using some actual data though it's hard-coded...
const journalData = [
  {
    id: 1,
    date: "Oct 13 2021",
    concepts: ["CSS"],
    entry: "I wanted to add a transition effect to my entry form so when you click on 'New Log' the form comes up with an animation. I'm not sure I like it but I got it to do something at least. I might try doing something else with it another time. I was honestly pretty frustrated trying to make it work the way I wanted, which it still doesn't really.",
    mood: "Meh"
  },
  {
    id: 2,
    date: "Oct 14 2021",
    concepts: ["HTML", "CSS", "JavaScript"],
    entry: "Made progress on Martins's Aquarium, finished the Fish component and it's displaying to the DOM. I also setup Tip and Location data as well as components so when I have that data I can finish those components as well. They're already working in the project but they dont have any content. Tommy was knocking ketchup... his code is ketchup...",
    mood: "Confident"
  }
];

export const useJournalEntries = () => {
  return journalData.sort((currentEntry, nextEntry) => Date.parse(currentEntry.date) - Date.parse(nextEntry.date));
}