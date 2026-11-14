import ResourceBar from "./ResourceBar.jsx";
import { RESOURCE_DEFINITIONS } from "../data/common/resources.js";

function ResourceBars({ resources, compact = false }) {
  if (!resources) return null;

  return (
    <div className="resource-bars">
      {RESOURCE_DEFINITIONS.map(({ key, label, icon }) => (
        <ResourceBar
          key={key}
          resourceKey={key}
          label={label}
          icon={icon}
          value={resources[key]}
          compact={compact}
        />
      ))}
    </div>
  );
}

export default ResourceBars;
