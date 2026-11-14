// UI story, help, and child-facing copy. Keep this separate from game data.

export const HOW_TO_PLAY_CARDS = [
  { title: "Pick a planet", text: "Choose the Moon or Mars as your new home.", icon: "◉" },
  { title: "Every choice has a cost", text: "You gain one thing and lose another.", icon: "↔" },
  { title: "Look after your crew", text: "Keep Power, Oxygen and Shielding above zero for 10 days.", icon: "✦" }
];

export const HELP_DETAILS = [
  "Power runs lights, heaters and machines.",
  "Oxygen is the air your crew needs to breathe.",
  "Shielding helps block radiation from the Sun and space."
];

export const INTRO_STORY = [
  {
    title: "A new world!",
    copy: "You have landed on {planet}. The ground looks strange, and your astronaut is excited to explore.",
    mood: "happy"
  },
  {
    title: "Time to build a home",
    copy: "Your crew needs a safe place to live. Power, Oxygen and Shielding will help keep everyone well.",
    mood: "happy"
  },
  {
    title: "The crew needs you",
    copy: "Each choice can help the crew, but it will use something too. Think about what matters most.",
    mood: "worried"
  },
  {
    title: "Ready to begin?",
    copy: "Help your crew stay safe for 10 days. They are counting on you!",
    mood: "happy"
  }
];

export const OUTPOST_STORY = [
  {
    title: "A burst of solar activity is on the way!",
    story: "A solar storm is coming. Your crew needs extra protection while it passes.",
    choices: [
      { label: "Cover the shelter with extra panels", change: { shielding: 18, power: -12 }, gains: ["shielding"], costs: ["power"], outcome: "The extra panels block more radiation. The crew used power to move and lock them in place." },
      { label: "Move the crew into the storm room", change: { oxygen: -12, shielding: 10 }, gains: ["shielding"], costs: ["oxygen"], outcome: "The storm room gives the crew better cover, but its air system used some stored oxygen." },
      { label: "Run the storm early-warning radar", change: { power: -15, oxygen: 8 }, gains: ["oxygen"], costs: ["power"], outcome: "The radar helped the crew prepare the air system. Keeping it running took power." }
    ]
  },
  {
    title: "The greenhouse is getting chilly",
    story: "A cold night is coming. Your little greenhouse needs help, and your space home has limited supplies.",
    choices: [
      { label: "Warm the greenhouse overnight", change: { power: -16, oxygen: 12 }, gains: ["oxygen"], costs: ["power"], outcome: "The plants stayed warm and made more fresh air. The heaters drained the power pack." },
      { label: "Add a dust blanket outside", change: { shielding: 12, power: -8 }, gains: ["shielding"], costs: ["power"], outcome: "The blanket helped hold in heat and added a little cover. The crew spent power moving it." },
      { label: "Save power and check at sunrise", change: { power: 10, oxygen: -12 }, gains: ["power"], costs: ["oxygen"], outcome: "Your space home saved energy overnight, but the cold plants made less fresh air." }
    ]
  },
  {
    title: "A dusty path needs exploring",
    story: "A sensor found something interesting outside. Exploring is exciting, but a spacewalk uses supplies.",
    choices: [
      { label: "Send a small robot first", change: { power: -12, shielding: 8 }, gains: ["shielding"], costs: ["power"], outcome: "The robot checked the path before anyone went out. Its battery used some power." },
      { label: "Take a short, careful walk", change: { oxygen: -14, power: 8 }, gains: ["power"], costs: ["oxygen"], outcome: "The crew found a sunny spot for the panels. Their suits used stored oxygen on the walk." },
      { label: "Study pictures from the window", change: { power: -8, oxygen: 8 }, gains: ["oxygen"], costs: ["power"], outcome: "The crew learned a little from inside. The scanner used power, and the crew stayed safe." }
    ]
  }
];

export const REPORT_LESSONS = [
  "Power spent on science leaves less for heaters and air systems.",
  "Shielding helps protect the crew during solar storms.",
  "A small plan can save big supplies on a long trip."
];

export const REPORT_COPY = {
  successTitle: "Your crew is safe!",
  successStory: "made it through 10 days! Great teamwork!",
  failureTitle: "Your trip ended early",
  failureStory: "'s trip ended early. The crew went back to Earth safely."
};

export const FACTS = [
  { id: "m1", planet: "Mars", text: "NASA's Phoenix lander had a weather station on Mars. It measured air temperature at three heights above the ground!", sourceName: "Phoenix Mars Meteorological Data", sourceUrl: "https://data.nasa.gov/dataset/phoenix-mars-meteorological-pressure-temperature-edr-v1-0-a27ad" },
  { id: "m2", planet: "Mars", text: "A NASA spacecraft called Mars Global Surveyor circled Mars and measured how hot or cold the surface was all over the planet.", sourceName: "MGS Thermal Emission Spectrometer", sourceUrl: "https://data.nasa.gov/dataset/mgs-sampler-thermal-emission-spectrometer-global-temperature-0895b" },
  { id: "m3", planet: "Mars", text: "A laser on Mars Global Surveyor measured how high and low the land on Mars is.", sourceName: "MOLA data", sourceUrl: "https://data.nasa.gov/dataset/mola-precision-experiment-data-record-15a65" },
  { id: "m4", planet: "Mars", text: "Mars has a giant canyon system called Valles Marineris. It is over 3,000 km long and up to 8 km deep!", sourceName: "NASA Photojournal PIA04304", sourceUrl: "https://photojournal.jpl.nasa.gov/catalog/PIA04304" },
  { id: "m5", planet: "Mars", text: "Scientists labelled about 326,000 spots in Mars photos so computers can learn which ground is safe for future rovers.", sourceName: "AI4MARS", sourceUrl: "https://data.nasa.gov/dataset/ai4mars-a-dataset-for-terrain-aware-autonomous-driving-on-mars" },
  { id: "m6", planet: "Mars", text: "Mars rover Opportunity carried a tiny microscope camera to study rocks up close, and rover Spirit had a panoramic camera for wide pictures.", sourceName: "MER1 Microscopic Imager", sourceUrl: "https://data.nasa.gov/dataset/mer1-microscopic-imager-science-calibrated-data-bundle" },
  { id: "l1", planet: "Moon", text: "One picture of the whole Moon was made by joining 1,231 photos from a NASA spacecraft camera!", sourceName: "NASA SVS Moon Mosaic", sourceUrl: "https://svs.gsfc.nasa.gov/5001" },
  { id: "l2", planet: "Moon", text: "NASA's Lunar Reconnaissance Orbiter has circled the Moon since the summer of 2009.", sourceName: "NASA SVS", sourceUrl: "https://svs.gsfc.nasa.gov/5001" },
  { id: "l3", planet: "Moon", text: "Two NASA spacecraft called GRAIL flew together to measure the Moon's gravity.", sourceName: "GRAIL LGRS data", sourceUrl: "https://data.nasa.gov/dataset/grail-moon-lgrs-raw-science-v1-0-95ba3" },
  { id: "l4", planet: "Moon", text: "Lunar Prospector circled the Moon from 1998 to 1999, and scientists still keep a record of exactly where it flew.", sourceName: "LP Moon Spacecraft Trajectory", sourceUrl: "https://data.nasa.gov/dataset/lp-moon-spacecraft-trajectory-v1-0-9fb65" },
  { id: "l5", planet: "Moon", text: "Many Moon craters and mountains have official names, chosen by astronomers.", sourceName: "Gazetteer of Planetary Nomenclature: Moon", sourceUrl: "https://data.nasa.gov/dataset/gazetteer-of-planetary-nomenclature-moon-1-1-million-scale-maps-of-the-moon" },
  { id: "l6", planet: "Moon", text: "The Moon spacecraft LRO has two cameras: a narrow one for close-up pictures and a wide one for big views.", sourceName: "LRO LROC data", sourceUrl: "https://data.nasa.gov/dataset/lro-moon-lroc-3-cdr-v1-0-53601" },
  { id: "solar-flare-light", planet: "Both", text: "Light from a solar flare takes about 8 minutes to reach Earth.", sourceName: "NASA Solar Storms and Flares", sourceUrl: "https://science.nasa.gov/sun/solar-storms-and-flares/" },
  { id: "meteoroid-risk", planet: "Both", text: "Tiny space rocks can damage spacecraft, so NASA studies where they travel.", sourceName: "NASA Meteoroid Environment Office", sourceUrl: "https://www.nasa.gov/meteoroid-environment-office/overview/" },
  { id: "radiation-belts", planet: "Both", text: "Earth has rings of charged particles around it called the Van Allen Belts.", sourceName: "NASA Radiation Belts", sourceUrl: "https://science.nasa.gov/science-research/heliophysics/nasa-cubesat-finds-new-radiation-belts-after-may-2024-solar-storm/" },
  { id: "radio-delay", planet: "Both", text: "A radio message takes about 1.3 seconds to reach the Moon and 3 to 22 minutes to reach Mars.", sourceName: "NASA JPL: Talking to Perseverance", sourceUrl: "https://science.nasa.gov/blog/speaking-percys-language-how-to-talk-so-perseverance-will-listen/" },
  { id: "mars-solar-power", planet: "Mars", text: "NASA's Spirit and Opportunity rovers used solar panels to make electricity from sunlight.", sourceName: "NASA Mars Exploration Rovers", sourceUrl: "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/" },
  { id: "moon-dust", planet: "Moon", text: "Moon dust can stick to spacesuits because it builds up static electricity.", sourceName: "NASA Science: Moon's South Pole", sourceUrl: "https://science.nasa.gov/solar-system/moon/phenomena-nasa-astronauts-will-encounter-at-moons-south-pole/" }
];

export const DESTINATION_CHOICES = [
  { id: "moon", label: "Moon", emoji: "🌙", buttonClass: "btn-mint", consequence: "Quiet and dusty. Close to Earth." },
  { id: "mars", label: "Mars", emoji: "🔴", buttonClass: "btn-peach", consequence: "Far away and red. A big adventure." }
];

export const JOURNEY_EVENT_STORY = {
  solarFlare: { title: "A solar flare!", alert: "Bright energy is streaming from the Sun!", explain: ["A solar flare is a bright burst from the Sun.", "It can affect astronauts and spacecraft."], factId: "solar-flare-light", labels: ["Sun", "Flare", "Rocket"] },
  meteoroids: { title: "Tiny space rocks!", alert: "Little rocks are zipping past the rocket!", explain: ["Meteoroids are bits of rock moving through space.", "Even tiny bits can be a risk to spacecraft."], factId: "meteoroid-risk", labels: ["Space rocks", "Rocket", "Dent"] },
  radiationBelt: { title: "A radiation belt!", alert: "Charged space particles are nearby!", explain: ["Earth has belts of tiny charged particles held by its magnetic field.", "Spacecraft plan their path to cross these belts safely."], factId: "radiation-belts", labels: ["Earth", "Particle belt", "Rocket"] },
  radioSignal: { title: "A slow radio message!", alert: "A message from Earth is taking its time!", explain: ["Radio messages travel at the speed of light, but space is very big.", "The message delay depends on how far away the destination is."], factId: "radio-delay", labels: ["Earth", "Radio message", "Rocket"] },
  powerGlitch: { title: "A power glitch!", alert: "The rocket lights are flickering!", explain: ["Spacecraft use power to run lights, radios, and tools.", "The crew checks the power system and saves energy when needed."], factId: "mars-solar-power", labels: ["Power", "Rocket lights", "Battery"] }
};
