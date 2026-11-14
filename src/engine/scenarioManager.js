import { MOON_SCENARIOS } from "../data/moon/scenarios.js";
import { MARS_SCENARIOS } from "../data/mars/scenarios.js";

// Returns the list of scenarios for the chosen destination
export const getScenariosFor = (destination) => {
  if (destination === "moon") return MOON_SCENARIOS;
  if (destination === "mars") return MARS_SCENARIOS;
  return [];
};

// Picks a random scenario the player has not faced yet.
// Reads state.history, which makeDecision already fills in.
// Returns null when every scenario has been used.
export const getNextScenario = (state) => {
  const seenIds = (state.history ?? []).map((entry) => entry.scenarioId);

  const unseen = getScenariosFor(state.destination).filter(
    (scenario) => !seenIds.includes(scenario.id)
  );

  if (unseen.length === 0) return null;

  const index = Math.floor(Math.random() * unseen.length);
  return unseen[index];
};
