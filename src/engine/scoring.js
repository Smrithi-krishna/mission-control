import { RESOURCE_NAMES } from "../data/common/resources.js";
import { getDepletedResources } from "./resourceManager.js";

// Easy to change later: tune these numbers when you playtest
const RESOURCE_WEIGHT = 5;      // average resource (0-100) x 5 = up to 500
const POINTS_PER_DISCOVERY = 50;
const POINTS_PER_FACT = 10;
const SUCCESS_SCORE = 600;
const PARTIAL_SCORE = 300;

// Average of all resources, 0 to 100
export const getAverageResource = (resources) => {
  const total = RESOURCE_NAMES.reduce((sum, key) => sum + (resources[key] ?? 0), 0);
  return total / RESOURCE_NAMES.length;
};

// Works out the outcome: "failed", "success", "partial" or "low"
export const getOutcome = (state, totalScore) => {
  if (getDepletedResources(state.resources).length > 0) return "failed";
  if (totalScore >= SUCCESS_SCORE) return "success";
  if (totalScore >= PARTIAL_SCORE) return "partial";
  return "low";
};

// Star rating from 0 to 3, for the mission report
export const getStars = (outcome) => {
  if (outcome === "success") return 3;
  if (outcome === "partial") return 2;
  if (outcome === "low") return 1;
  return 0;
};

// Calculates the final score and returns the full breakdown.
// Does not change the state.
export const calculateFinalScore = (state) => {
  const failed = getDepletedResources(state.resources).length > 0;

  const resourceScore = failed
    ? 0
    : Math.round(getAverageResource(state.resources) * RESOURCE_WEIGHT);
  const discoveryScore = (state.discoveries ?? []).length * POINTS_PER_DISCOVERY;
  const factScore = (state.factsSeen ?? []).length * POINTS_PER_FACT;
  const decisionScore = state.score ?? 0;

  const total = resourceScore + discoveryScore + factScore + decisionScore;
  const outcome = getOutcome(state, total);

  return {
    resourceScore,
    discoveryScore,
    factScore,
    decisionScore,
    total,
    outcome,
    stars: getStars(outcome)
  };
};

// Returns a NEW state marked as finished, with the final score saved
export const finishMission = (state) => {
  const result = calculateFinalScore(state);
  return {
    ...state,
    completed: true,
    finalScore: result.total,
    outcome: result.outcome
  };
};
