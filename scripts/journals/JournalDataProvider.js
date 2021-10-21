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
  },
  {
    id: 3,
    date: "Oct 15 2021",
    concepts: ["JavaScript", "Jest", "Unit Testing"],
    entry: "I did the sowing chapter for Modern Farm. It was relatively easy to do, however, today has been exhausting looking for my tiny little nuances. For example, I spent a little bit of time getting the plant seeds function to populate the plant array simply because I used lowercase letters in my switch statement rather than capitalizing the seed names and that took some time for me to catch. Also I was helping my teammates with their projects where I almost missed that they forgot to import and call their component function in the main js module. What a way to end the week.",
    mood: "Unsure"
  },
  {
    id: 4,
    date: "Oct 21 2021",
    concepts: ["HTML", "CSS", "JavaScript"],
    entry: "It's been a while since my last update. I was assigned to team Red Jaguar to reproduce something similar to the previous group project of travel brochure except this time the task was to automate much of the html building process into separate JS files. One of our teammates was out for most of the project due to some technical issues however, with our project structure, he was able to finish his page within the first hour or so of class and we managed to finish the project and have retro before lunch. I think it went relatively well! I just finished our daily assignment of taking some data provided by Sarah and creating components out of that data and I read tomorrows assignment, Glassdale Intro",
    mood: "Stoked"
  }
];

export const useJournalEntries = () => {
  return journalData.sort((currentEntry, nextEntry) => Date.parse(currentEntry.date) - Date.parse(nextEntry.date));
}