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

export const INITIAL_OUTPOST = { power: 78, oxygen: 86, shielding: 64 };

export const OUTPOST_SCENARIOS = [
  {
    title: "A burst of solar activity is on the way!",
    story: "Your weather screen spots a strong solar storm. The crew needs extra protection while it passes.",
    choices: [
      { label: "Cover the shelter with extra panels", change: { shielding: 18, power: -12 }, gains: ["shielding"], costs: ["power"], outcome: "The extra panels block more radiation. The crew used power to move and lock them in place." },
      { label: "Move the crew into the storm room", change: { oxygen: -12, shielding: 10 }, gains: ["shielding"], costs: ["oxygen"], outcome: "The storm room gives the crew better cover, but its air system used some stored oxygen." },
      { label: "Run the storm early-warning radar", change: { power: -15, oxygen: 8 }, gains: ["oxygen"], costs: ["power"], outcome: "The radar helped the crew prepare the air system. Keeping it running took a lot of power." }
    ]
  },
  {
    title: "The greenhouse is getting chilly",
    story: "A cold night is coming. Your tiny greenhouse needs help, and your space home has limited supplies.",
    choices: [
      { label: "Warm the greenhouse overnight", change: { power: -16, oxygen: 12 }, gains: ["oxygen"], costs: ["power"], outcome: "The plants stayed warm and made more fresh air. The heaters drained the power pack." },
      { label: "Add a dust blanket outside", change: { shielding: 12, power: -8 }, gains: ["shielding"], costs: ["power"], outcome: "The blanket helped hold in heat and added a little cover. The crew spent power moving it." },
      { label: "Save power and check at sunrise", change: { power: 10, oxygen: -12 }, gains: ["power"], costs: ["oxygen"], outcome: "Your space home saved energy overnight, but the cold plants made less fresh air." }
    ]
  },
  {
    title: "A dusty path needs exploring",
    story: "A sensor found something interesting outside. The crew can explore, but a spacewalk uses supplies.",
    choices: [
      { label: "Send a small robot first", change: { power: -12, shielding: 8 }, gains: ["shielding"], costs: ["power"], outcome: "The robot checked the path before anyone went out. Its battery used some power." },
      { label: "Take a short, careful walk", change: { oxygen: -14, power: 8 }, gains: ["power"], costs: ["oxygen"], outcome: "The crew found a sunny spot for the panels. Their suits used stored oxygen on the walk." },
      { label: "Study pictures from the window", change: { power: -8, oxygen: 8 }, gains: ["oxygen"], costs: ["power"], outcome: "The crew learned a little from inside. The scanner used power, and the crew stayed safe." }
    ]
  }
];

export const SPACE_WEATHER = { level: "Medium", label: "Solar activity today", detail: "A few active spots on the Sun" };

export const SPACE_FACT = {
  title: "Moon dust can be a bit clingy!",
  body: "Moon dust can stick to spacesuits because it builds up static electricity. Astronauts need to keep it out of their habitat.",
  source: "Source: NASA Science — Moon’s South Pole phenomena",
  sourceUrl: "https://science.nasa.gov/solar-system/moon/phenomena-nasa-astronauts-will-encounter-at-moons-south-pole/"
};

export const REPORT_LESSONS = [
  "Power spent on science leaves less for heaters and air systems.",
  "Shielding helps protect the crew during solar storms.",
  "A small plan can save big supplies on a long mission."
];
