// PLACEHOLDER MOCK — UI layer only.
// Data teammates own src/data/. Swap these out when real scenarios land.

export const MISSION_CONTROL_COPY = {
  title: "Mission Control",
  subtitle: "You are the space scientist on duty.",
  briefing:
    "Good morning, Commander. The crew is ready. Pick a destination and we will pack the rocket."
};

export const DESTINATION_CHOICES = [
  {
    id: "moon",
    label: "Moon",
    emoji: "🌙",
    buttonClass: "btn-mint",
    consequence: "Quiet, dusty, close to home. Great for a first outing."
  },
  {
    id: "mars",
    label: "Mars",
    emoji: "🔴",
    buttonClass: "btn-peach",
    consequence: "Farther, rustier, and a little scarier. The crew is excited."
  }
];
