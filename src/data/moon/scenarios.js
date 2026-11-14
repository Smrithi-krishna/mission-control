export const MOON_SCENARIOS = [
  {
    id: "moon-solar-flare",
    question: "A solar flare is approaching!",
    description: "Your lunar module may be exposed to radiation.",
    choices: [
      {
        id: "activate-shield",
        text: "Activate the radiation shield",
        effect: { fuel: -5, oxygen: 0, food: 0, power: -10, morale: 5 },
        feedback: "The crew is protected, but the shield uses a lot of power.",
        points: 10
      },
      {
        id: "continue",
        text: "Keep working without the shield",
        effect: { fuel: 0, oxygen: -10, food: 0, power: 0, morale: -15 },
        feedback: "The crew is exposed to radiation and morale drops.",
        points: 0
      }
    ]
  },
  {
    id: "moon-rock-samples",
    question: "You found interesting rocks!",
    description: "A crater ahead is full of rock samples, but it is far from the base.",
    choices: [
      {
        id: "collect-all",
        text: "Collect as many samples as you can",
        effect: { fuel: -10, oxygen: -10, food: 0, power: 0, morale: 10 },
        feedback: "Great haul for the scientists, but the long walk used up supplies.",
        points: 10
      },
      {
        id: "collect-few",
        text: "Take a few samples and head back",
        effect: { fuel: 0, oxygen: -3, food: 0, power: 0, morale: 3 },
        feedback: "A safe trip with a small but useful collection.",
        points: 5
      },
      {
        id: "skip",
        text: "Skip the crater",
        effect: { fuel: 0, oxygen: 0, food: 0, power: 0, morale: -10 },
        feedback: "Safe, but the crew is disappointed to miss the chance.",
        points: 0
      }
    ]
  },
  {
    id: "moon-system-glitch",
    question: "A system glitch!",
    description: "The oxygen recycler is making a strange noise.",
    choices: [
      {
        id: "repair-now",
        text: "Stop everything and repair it",
        effect: { fuel: 0, oxygen: 5, food: 0, power: -10, morale: -5 },
        feedback: "Fixed! The repair drained power, but the air is clean again.",
        points: 10
      },
      {
        id: "ignore",
        text: "Ignore it for now",
        effect: { fuel: 0, oxygen: -20, food: 0, power: 0, morale: -5 },
        feedback: "The recycler gets worse and oxygen drops quickly.",
        points: 0
      }
    ]
  },
  {
    id: "moon-base-site",
    question: "Where should the base go?",
    description: "You need a safe spot to set up camp near the south pole.",
    choices: [
      {
        id: "crater-rim",
        text: "Build on the crater rim, where there is more sunlight",
        effect: { fuel: -5, oxygen: 0, food: 0, power: 10, morale: 5 },
        feedback: "Plenty of sunlight for the solar panels, but the climb used some fuel.",
        points: 10
      },
      {
        id: "flat-ground",
        text: "Build right here on flat ground",
        effect: { fuel: 0, oxygen: 0, food: -5, power: -5, morale: 0 },
        feedback: "Quick and easy, but the base gets less sunlight.",
        points: 5
      }
    ]
  }
];
