import { RESOURCE_NAMES } from "../data/common/resources.js";

const MIN_VALUE = 0;
const MAX_VALUE = 100;

// Keeps a number between 0 and 100
const clamp = (value) => Math.min(MAX_VALUE, Math.max(MIN_VALUE, value));

// Adds the changes (effects) to the resources and returns a NEW object.
// Example: applyEffects({ fuel: 50 }, { fuel: -20 }) gives { fuel: 30 }
export const applyEffects = (resources, effects = {}) => {
  const updated = { ...resources };

  for (const key of RESOURCE_NAMES) {
    if (effects[key] !== undefined) {
      updated[key] = clamp(updated[key] + effects[key]);
    }
  }

  return updated;
};

// Returns the names of resources that have run out, like ["oxygen"]
export const getDepletedResources = (resources) =>
  RESOURCE_NAMES.filter((key) => resources[key] <= 0);

// True if any resource has reached 0 (mission failed)
export const isResourceDepleted = (resources) =>
  getDepletedResources(resources).length > 0;
