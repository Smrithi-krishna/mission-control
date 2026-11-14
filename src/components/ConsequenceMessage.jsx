import ResourceBar from "./ResourceBar";

const RESOURCES = [
  { key: "power", label: "Power", icon: "ϟ" },
  { key: "oxygen", label: "Oxygen", icon: "O₂" },
  { key: "shielding", label: "Shielding", icon: "⬡" }
];

function ConsequenceMessage({ result, resources, feedback = [], onContinue }) {
  return (
    <section className="consequence-card panel-glass">
      <div className="result-icon" aria-hidden="true">✓</div>
      <p className="eyebrow">HERE'S WHAT HAPPENED</p>
      <h2>Good thinking, Commander!</h2>
      <p className="scenario-story">{result.choice.outcome}</p>
      {feedback.length > 0 && <div className="reward-burst" aria-label="Supply changes">{feedback.map((item, index) => <span className={`reward-float reward-float--${item.type}`} key={`${item.key}-${index}`} style={{ "--float-delay": `${index * 100}ms` }}>{item.type === "gain" ? "+" : "−"}{item.amount} <i>{item.icon}</i><b>{item.label}</b><span className="reward-sparkle" aria-hidden="true">✦</span></span>)}</div>}
      <div className="result-supplies"><p className="eyebrow">SUPPLIES UPDATED</p><div className="resource-list dashboard-resources">{RESOURCES.map((item) => <ResourceBar key={item.key} resourceKey={item.key} label={item.label} icon={item.icon} value={resources[item.key]} />)}</div></div>
      <button className="primary-button" type="button" onClick={onContinue}>Next day <span>→</span></button>
    </section>
  );
}

export default ConsequenceMessage;
