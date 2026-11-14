import { createInitialGameState } from "./src/engine/gameState.js";
import { makeDecision } from "./src/engine/decisionEngine.js";
import { exampleScenario } from "./src/data/common/scenarioTemplate.js";
import { getRandomFact, markFactSeen } from "./src/engine/factManager.js";

const state = createInitialGameState();
const result = makeDecision(state, exampleScenario, "activate-shield");

console.log("Resources:", result.newState.resources);
console.log("Feedback:", result.feedback);
console.log("Mission failed?", result.missionFailed);

let factState = { ...createInitialGameState(), destination: "moon" };

for (let i = 0; i < 9; i++) {
  const fact = getRandomFact(factState.destination, factState.factsSeen ?? []);
  console.log("Fact", i + 1, ":", fact ? `${fact.title}: ${fact.body}` : "No new facts left");
  if (fact) factState = markFactSeen(factState, fact.id);
}
