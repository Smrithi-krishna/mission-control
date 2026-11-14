import { INITIAL_RESOURCES } from "../data/common/resources";

export const createInitialGameState = () => ({
  destination: null,
  currentLevel: "mission-control",
  resources: { ...INITIAL_RESOURCES },
  discoveries: [],
  score: 0,
  completed: false
});
