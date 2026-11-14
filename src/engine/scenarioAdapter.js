import { RESOURCE_NAMES } from "../data/common/resources.js";

export const toCardScenario = (scenario) => {
  if (!scenario) return null;

  return {
    id: scenario.id,
    title: scenario.question,
    story: scenario.description,
    choices: scenario.choices.map((choice) => ({
      id: choice.id,
      label: choice.text,
      outcome: choice.feedback,
      change: choice.effect,
      gains: RESOURCE_NAMES.filter((key) => (choice.effect?.[key] ?? 0) > 0),
      costs: RESOURCE_NAMES.filter((key) => (choice.effect?.[key] ?? 0) < 0)
    }))
  };
};
