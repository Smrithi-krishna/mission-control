import {
  applyEffects,
  isResourceDepleted,
  getDepletedResources
} from "./resourceManager.js";

// Called when the player picks a choice.
// Takes the current game state, the scenario, and the id of the chosen choice.
// Returns the NEW game state plus the feedback text to show the player.
export const makeDecision = (state, scenario, choiceId) => {
  // 1. Find the choice the player picked
  const choice = scenario.choices.find((c) => c.id === choiceId);

  if (!choice) {
    throw new Error(`Choice "${choiceId}" not found in scenario "${scenario.id}"`);
  }

  // 2. Update the resources
  const resources = applyEffects(state.resources, choice.effect);

  // 3. Check if the mission has failed (any resource hit 0)
  const missionFailed = isResourceDepleted(resources);

  // 4. Build the new state (we never change the old one directly)
  const newState = {
    ...state,
    resources,
    score: state.score + (choice.points ?? 0),
    history: [
      ...(state.history ?? []),
      { scenarioId: scenario.id, choiceId: choice.id }
    ],
    completed: state.completed || missionFailed
  };

  // 5. Return everything the screen needs
  return {
    newState,
    feedback: choice.feedback,
    missionFailed,
    depletedResources: getDepletedResources(resources)
  };
};
import { createInitialGameState } from "./gameState";//temp testing
import { exampleScenario } from "../data/common/scenarioTemplate";

const result = makeDecision(createInitialGameState(), exampleScenario, "activate-shield");
console.log(result);//temp testing


