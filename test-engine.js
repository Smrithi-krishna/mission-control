import { createInitialGameState } from "./src/engine/gameState.js";
import { makeDecision } from "./src/engine/decisionEngine.js";
import { exampleScenario } from "./src/data/common/scenarioTemplate.js";

const state = createInitialGameState();
const result = makeDecision(state, exampleScenario, "activate-shield");

console.log("Resources:", result.newState.resources);
console.log("Feedback:", result.feedback);
console.log("Mission failed?", result.missionFailed);
