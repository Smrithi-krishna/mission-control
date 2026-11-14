// Label + letter badge + animated bar.
// Turns rust/coral when the value drops below 25%.

const BADGES = {
  fuel: "F",
  oxygen: "O",
  morale: "M",
  food: "E",
  power: "P"
};

function ResourceBar({ label, icon, value = 0, resourceKey, compact = false }) {
  const safeValue = Math.max(0, Math.min(100, Number(value) || 0));
  const level = safeValue < 20 ? "critical" : safeValue < 40 ? "warning" : "";
  const displayIcon = icon || BADGES[resourceKey] || (label ? label[0] : "R");
  const displayLabel = label || resourceKey || "Resource";

  return (
    <div
      className={`resource-bar${level ? ` resource-bar--${level}` : ""}${compact ? " resource-bar--compact" : ""}`}
      role="img"
      aria-label={`${displayLabel}: ${Math.round(safeValue)} percent`}
    >
      <span className="resource-bar__icon" aria-hidden="true">
        {displayIcon}
      </span>
      <div className="resource-bar__meta">
        <span>{displayLabel}</span>
        <span>{Math.round(safeValue)}%</span>
      </div>
      <div className="resource-bar__track">
        <div
          className="resource-bar__fill"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}

export default ResourceBar;
