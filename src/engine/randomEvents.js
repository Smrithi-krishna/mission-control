import { RANDOM_EVENTS } from "../data/common/randomEvents.js";

// Chance (0 to 1) that an event happens between scenarios. 0.4 = 40%.
export const EVENT_CHANCE = 0.4;

// Picks a random event the player has not faced yet.
// Reads state.history, which makeDecision already fills in.
// Returns null when every event has been used.
export const getRandomEvent = (state) => {
  const seenIds = (state.history ?? []).map((entry) => entry.scenarioId);

  const unseen = RANDOM_EVENTS.filter((event) => !seenIds.includes(event.id));

  if (unseen.length === 0) return null;

  const index = Math.floor(Math.random() * unseen.length);
  return unseen[index];
};

// Rolls the dice: returns an event, or null if nothing happens this time.
// "chance" can be changed for testing, e.g. rollForEvent(state, 1) always gives one.
export const rollForEvent = (state, chance = EVENT_CHANCE) => {
  if (Math.random() >= chance) return null;
  return getRandomEvent(state);
};
