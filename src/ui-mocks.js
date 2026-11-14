// Changeable placeholder values for the UI. Replace with live game data later.
export const INITIAL_OUTPOST = { power: 78, oxygen: 86, shielding: 64 };

export const SPACE_WEATHER = {
  level: "Medium",
  label: "Solar activity today",
  detail: "A few active spots on the Sun"
};

export const JOURNEY_EVENT_CHOICES = {
  solarFlare: [
    { id: "flare-shield", label: "Close the shield", change: { shielding: 7, power: -4 } },
    { id: "flare-save", label: "Save power and wait", change: { power: 5, oxygen: -3 } },
    { id: "flare-radio", label: "Send a radio check", change: { oxygen: 4, power: -5 } }
  ],
  meteoroids: [
    { id: "rock-dodge", label: "Dodge the rocks", change: { power: 6, oxygen: -4 } },
    { id: "rock-cover", label: "Use the spare cover", change: { shielding: 6, power: -4 } },
    { id: "rock-steady", label: "Hold a steady course", change: { oxygen: 5, shielding: -3 } }
  ],
  radiationBelt: [
    { id: "belt-shield", label: "Turn toward the shield", change: { shielding: 7, oxygen: -4 } },
    { id: "belt-power", label: "Take the longer path", change: { power: 5, oxygen: -4 } },
    { id: "belt-hurry", label: "Cross quickly", change: { power: 5, shielding: -4 } }
  ],
  radioSignal: [
    { id: "radio-wait", label: "Wait for the message", change: { oxygen: 5, power: -4 } },
    { id: "radio-save", label: "Save power while waiting", change: { power: 5, shielding: -3 } },
    { id: "radio-repeat", label: "Ask Earth to repeat it", change: { shielding: 4, oxygen: -3 } }
  ],
  powerGlitch: [
    { id: "glitch-restart", label: "Restart the power box", change: { power: 7, oxygen: -4 } },
    { id: "glitch-dim", label: "Dim the cabin lights", change: { power: 5, shielding: -3 } },
    { id: "glitch-check", label: "Check wires in the suit", change: { shielding: 5, power: -4 } }
  ]
};

// Temporary UI score until src/engine/scoring.js is added.
export function calculateMockScore(days, resources) {
  const supplies = Object.values(resources).reduce((total, value) => total + Math.max(0, Number(value) || 0), 0);
  return Math.max(0, Math.round(days) * 100 + Math.round(supplies));
}
