export const MARS_SCENARIOS = [
  {
    id: "mars-dust-storm",
    question: "A dust storm is coming!",
    description: "Dust is blocking the sunlight your solar panels need.",
    choices: [
      {
        id: "shelter",
        text: "Shelter inside and save power",
        effect: { fuel: 0, oxygen: -5, power: -5 },
        feedback: "You wait it out safely, but it is a long, boring day.",
        points: 10
      },
      {
        id: "keep-working",
        text: "Keep working outside",
        effect: { fuel: -5, oxygen: -15, power: -15 },
        feedback: "The dust clogs your equipment and wastes supplies.",
        points: 0
      }
    ]
  },
  {
    id: "mars-landing-site",
    question: "Choose a landing spot",
    description: "Scanners show a flat plain nearby and a rocky area with more to study.",
    choices: [
      {
        id: "flat-plain",
        text: "Land on the flat plain",
        effect: { fuel: -5, oxygen: 0, power: 0 },
        feedback: "A smooth landing, and everyone feels safe.",
        points: 10
      },
      {
        id: "rocky-area",
        text: "Land near the rocky area",
        effect: { fuel: -15, oxygen: 0, power: -5 },
        feedback: "A bumpy landing that burned extra fuel, but the science team is thrilled.",
        points: 5
      }
    ]
  },
  {
    id: "mars-low-power",
    question: "Power is running low",
    description: "The base batteries are draining faster than expected.",
    choices: [
      {
        id: "cut-lights",
        text: "Switch off the non-essential systems",
        effect: { fuel: 0, oxygen: 0, power: 10 },
        feedback: "Power recovers, but the crew finds it dark and uncomfortable.",
        points: 10
      },
      {
        id: "use-fuel",
        text: "Run the backup generator",
        effect: { fuel: -20, oxygen: 0, power: 20 },
        feedback: "Lots of power, but the generator burns a lot of fuel.",
        points: 5
      },
      {
        id: "wait",
        text: "Wait and hope the sun returns",
        effect: { fuel: 0, oxygen: 0, power: -15 },
        feedback: "The batteries keep draining, and nothing improves.",
        points: 0
      }
    ]
  },
  {
    id: "mars-water-ice",
    question: "You spotted something shiny!",
    description: "Your rover found what looks like ice under the surface.",
    choices: [
      {
        id: "dig-now",
        text: "Dig it up right now",
        effect: { fuel: -5, oxygen: 0, power: -10 },
        feedback: "Water ice! The crew cheers, and the digging used some power.",
        points: 10
      },
      {
        id: "mark-and-return",
        text: "Mark the spot and return later",
        effect: { fuel: 0, oxygen: 0, power: 0 },
        feedback: "Safe, but you have to find the spot again later.",
        points: 0
      }
    ]
  }
];
