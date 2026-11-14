export const exampleScenario = {
  id: "solar-flare-01",
  question: "A solar flare is approaching!",
  description: "Your spacecraft may be exposed to radiation.",
  choices: [
    {
      id: "activate-shield",
      text: "Activate the radiation shield",
      effect: {
        fuel: -10,
        oxygen: 0,
        power: -5,
      },
      feedback: "The crew is protected, but power is consumed."
    },
    {
      id: "continue",
      text: "Continue without activating the shield",
      effect: {
        fuel: 0,
        oxygen: -10,
        power: 0,
      },
      feedback: "The crew faces increased radiation risk."
    }
  ]
};
