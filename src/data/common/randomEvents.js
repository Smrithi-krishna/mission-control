export const RANDOM_EVENTS = [
  {
    id: "event-solar-flare",
    question: "Solar flare alert!",
    description: "A burst of radiation from the Sun is heading your way.",
    choices: [
      {
        id: "raise-shield",
        text: "Raise the radiation shield",
        effect: { power: -15, oxygen: 0, fuel: 0 },
        feedback: "The crew is safe, but the shield used a lot of power.",
        points: 10
      },
      {
        id: "ride-it-out",
        text: "Ride it out",
        effect: { power: -5, oxygen: -10, fuel: 0 },
        feedback: "The crew is stressed and the air system works overtime.",
        points: 0
      }
    ]
  },
  {
    id: "event-micrometeoroid",
    question: "Tiny rocks ahead!",
    description: "A cloud of tiny space rocks is drifting toward your ship.",
    choices: [
      {
        id: "steer-away",
        text: "Steer around the cloud",
        effect: { power: 0, oxygen: 0, fuel: -10 },
        feedback: "You dodge the rocks, but the engines burned extra fuel.",
        points: 10
      },
      {
        id: "fly-through",
        text: "Fly straight through",
        effect: { power: -5, oxygen: -10, fuel: 0 },
        feedback: "A few rocks hit the hull and a small air leak needs patching.",
        points: 0
      }
    ]
  },
  {
    id: "event-glitch",
    question: "System glitch!",
    description: "A warning light is blinking on the control panel.",
    choices: [
      {
        id: "fix-now",
        text: "Fix it right away",
        effect: { power: -5, oxygen: 5, fuel: 0 },
        feedback: "Fixed! The air system is working well again.",
        points: 10
      },
      {
        id: "restart",
        text: "Restart the system and hope",
        effect: { power: -10, oxygen: -10, fuel: 0 },
        feedback: "The restart used a lot of power and the air got stale.",
        points: 0
      }
    ]
  },
  {
    id: "event-sunny-spell",
    question: "A bright, sunny spell!",
    description: "The solar panels are catching extra sunlight.",
    choices: [
      {
        id: "store-power",
        text: "Charge the batteries",
        effect: { power: 15, oxygen: 0, fuel: 0 },
        feedback: "The batteries fill up nicely.",
        points: 5
      },
      {
        id: "make-fuel",
        text: "Use the energy to top up the fuel",
        effect: { power: 5, oxygen: 0, fuel: 10 },
        feedback: "The tanks get a boost, with a little power to spare.",
        points: 10
      }
    ]
  },
  {
    id: "event-dust",
    question: "Dust on the panels!",
    description: "A layer of dust is blocking the sunlight.",
    choices: [
      {
        id: "clean-panels",
        text: "Go outside and clean them",
        effect: { power: 10, oxygen: -10, fuel: 0 },
        feedback: "The panels are clean, but the spacewalk used oxygen.",
        points: 10
      },
      {
        id: "leave-it",
        text: "Leave them for now",
        effect: { power: -10, oxygen: 0, fuel: 0 },
        feedback: "Less sunlight means less power.",
        points: 0
      }
    ]
  }
];
