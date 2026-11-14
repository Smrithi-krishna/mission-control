import ResourceBar from "./ResourceBar.jsx";
import { RESOURCE_NAMES } from "../data/common/resources.js";

const LABELS = {
  fuel: "Fuel",
  oxygen: "Oxygen",
  food: "Food",
  power: "Power",
  morale: "Morale"
};

function ResourceBars({ resources, compact = false }) {
  if (!resources) return null;

  return (
    <div className="resource-bars">
      {RESOURCE_NAMES.map((name) => (
        <ResourceBar
          key={name}
          resourceKey={name}
          label={LABELS[name] ?? name}
          value={resources[name]}
          compact={compact}
        />
      ))}
    </div>
  );
}

export default ResourceBars;
