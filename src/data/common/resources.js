export const RESOURCE_DEFINITIONS = [
  { key: "fuel", label: "Fuel", icon: "⛽", tip: "Fuel moves the spacecraft and vehicles." },
  { key: "oxygen", label: "Oxygen", icon: "O₂", tip: "Oxygen is the air people need to breathe." },
  { key: "power", label: "Power", icon: "ϟ", tip: "Power runs lights, heaters, and machines." }
];

export const RESOURCE_NAMES = RESOURCE_DEFINITIONS.map(({ key }) => key);
export const INITIAL_RESOURCES = Object.fromEntries(RESOURCE_NAMES.map((key) => [key, 100]));
export const clampResource = (value) => Math.min(100, Math.max(0, Number(value) || 0));
