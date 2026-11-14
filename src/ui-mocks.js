// Changeable placeholder values for the UI. Replace with live game data later.
import { INITIAL_RESOURCES } from "./data/common/resources";

export const INITIAL_OUTPOST = { ...INITIAL_RESOURCES };

export const SPACE_WEATHER = {
  level: "Medium",
  label: "Solar activity today",
  detail: "A few active spots on the Sun"
};

export const JOURNEY_EVENT_CHOICES = {
  solarFlare: [
    { id: "flare-shield", label: "Close the radiation shield", change: { power: -4, oxygen: 2 } },
    { id: "flare-save", label: "Save power and wait", change: { power: 5, oxygen: -3 } },
    { id: "flare-radio", label: "Send a radio check", change: { oxygen: 4, power: -5 } }
  ],
  meteoroids: [
    { id: "rock-dodge", label: "Dodge the rocks", change: { power: 6, oxygen: -4 } },
    { id: "rock-cover", label: "Use the spare radiation cover", change: { power: -4, oxygen: 2 } },
    { id: "rock-steady", label: "Hold a steady course", change: { oxygen: 5, fuel: -3 } }
  ],
  radiationBelt: [
    { id: "belt-shield", label: "Turn toward the radiation shield", change: { power: -4, oxygen: 2 } },
    { id: "belt-power", label: "Take the longer path", change: { power: 5, oxygen: -4 } },
    { id: "belt-hurry", label: "Cross quickly", change: { power: 5, fuel: -4 } }
  ],
  radioSignal: [
    { id: "radio-wait", label: "Wait for the message", change: { oxygen: 5, power: -4 } },
    { id: "radio-save", label: "Save power while waiting", change: { power: 5, fuel: -3 } },
    { id: "radio-repeat", label: "Ask Earth to repeat it", change: { power: -4, oxygen: -3 } }
  ],
  powerGlitch: [
    { id: "glitch-restart", label: "Restart the power box", change: { power: 7, oxygen: -4 } },
    { id: "glitch-dim", label: "Dim the cabin lights", change: { power: 5, oxygen: -3 } },
    { id: "glitch-check", label: "Check wires in the suit", change: { power: -4, fuel: -2 } }
  ]
};

// Temporary UI score until src/engine/scoring.js is added.
export function calculateMockScore(days, resources) {
  const supplies = Object.values(resources).reduce((total, value) => total + Math.max(0, Number(value) || 0), 0);
  return Math.max(0, Math.round(days) * 100 + Math.round(supplies));
}
