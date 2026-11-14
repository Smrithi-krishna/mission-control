import { MOON_FACTS } from "../data/moon/facts.js";
import { MARS_FACTS } from "../data/mars/facts.js";

// Returns the list of facts for the chosen destination ("moon" or "mars")
export const getFactsFor = (destination) => {
  if (destination === "moon") return MOON_FACTS;
  if (destination === "mars") return MARS_FACTS;
  return [];
};

// Picks a random fact the player has not seen yet.
// Returns null if every fact has already been shown.
export const getRandomFact = (destination, seenIds = []) => {
  const unseen = getFactsFor(destination).filter(
    (fact) => !seenIds.includes(fact.id)
  );

  if (unseen.length === 0) return null;

  const index = Math.floor(Math.random() * unseen.length);
  return unseen[index];
};

// Returns a NEW state that remembers this fact was shown
export const markFactSeen = (state, factId) => ({
  ...state,
  factsSeen: [...(state.factsSeen ?? []), factId]
});
