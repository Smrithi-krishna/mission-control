import { createInitialGameState } from "./src/engine/gameState.js";
import { makeDecision } from "./src/engine/decisionEngine.js";
import { exampleScenario } from "./src/data/common/scenarioTemplate.js";
import { getRandomFact, markFactSeen } from "./src/engine/factManager.js";
import { calculateFinalScore, finishMission } from "./src/engine/scoring.js";
import { getNextScenario } from "./src/engine/scenarioManager.js";

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

// Good mission: healthy resources, 2 discoveries, 3 facts
const goodState = {
  ...createInitialGameState(),
  resources: { fuel: 80, oxygen: 90, power: 85 },
  discoveries: ["rock-sample", "ice-found"],
  factsSeen: ["moon-gravity", "moon-orbit", "moon-size"]
};
console.log("Good mission:", calculateFinalScore(goodState));

// Failed mission: oxygen ran out
const badState = {
  ...createInitialGameState(),
  resources: { fuel: 80, oxygen: 0, power: 85 },
  factsSeen: ["moon-gravity"]
};
console.log("Failed mission:", calculateFinalScore(badState));
console.log("Finished state:", finishMission(goodState).outcome);

let playState = { ...createInitialGameState(), destination: "moon" };

for (let i = 0; i < 4; i++) {
  const scenario = getNextScenario(playState);
  if (!scenario) {
    console.log("Round", i + 1, ": no scenarios left, level complete!");
    break;
  }
  const res = makeDecision(playState, scenario, scenario.choices[0].id);
  playState = res.newState;
  console.log("Round", i + 1, ":", scenario.question);
  console.log("  ", res.feedback, "score:", playState.score);
}
