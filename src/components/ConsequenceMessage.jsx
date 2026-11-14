import ResourceBar from "./ResourceBar";

const RESOURCES = [
  { key: "power", label: "Power", icon: "ϟ" },
  { key: "oxygen", label: "Oxygen", icon: "O₂" },
  { key: "shielding", label: "Shielding", icon: "⬡" }
];

function ConsequenceMessage({ result, resources, onContinue }) {
  return (
    <section className="consequence-card panel-glass">
      <div className="result-icon" aria-hidden="true">✓</div>
      <p className="eyebrow">HERE'S WHAT HAPPENED</p>
      <h2>Good thinking, Commander!</h2>
      <p className="scenario-story">{result.choice.outcome}</p>
      <div className="result-supplies"><p className="eyebrow">SUPPLIES UPDATED</p><div className="resource-list dashboard-resources">{RESOURCES.map((item) => <ResourceBar key={item.key} resourceKey={item.key} label={item.label} icon={item.icon} value={resources[item.key]} />)}</div></div>
      <button className="primary-button" type="button" onClick={onContinue}>Continue mission <span>→</span></button>
    </section>
  );
}

export default ConsequenceMessage;
