import { INITIAL_RESOURCES } from "../data/common/resources.js";

export const createInitialGameState = () => ({
  destination: null,
  currentLevel: "mission-control",
  resources: { ...INITIAL_RESOURCES },
  discoveries: [],
  history: [],
  score: 0,
  completed: false
});
