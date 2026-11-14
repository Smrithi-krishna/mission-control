const NAMES = { fuel: "Fuel", oxygen: "Oxygen", power: "Power" };
const ICONS = { fuel: "⛽", oxygen: "◌", power: "⚡" };

function DecisionCard({ scenario, onChoose }) {
  return (
    <section className="decision-card panel-glass">
      <div className="section-kicker"><span className="kicker-star">✦</span> TODAY'S CHALLENGE <span className="kicker-line" /></div>
      <h2>{scenario.title}</h2>
      <p className="scenario-story">{scenario.story}</p>
      <p className="choice-prompt">What should the crew do?</p>
      <div className="choice-list">
        {scenario.choices.map((choice, index) => (
          <button className="choice-button" type="button" key={choice.label} onClick={() => onChoose(choice)}>
            <span className="choice-index">0{index + 1}</span>
            <span className="choice-copy"><strong>{choice.label}</strong><span className="tradeoff">{choice.gains.map((key) => <em className="gain" key={`g-${key}`}>+ {ICONS[key]} {NAMES[key]}</em>)}{choice.costs.map((key) => <em className="cost" key={`c-${key}`}>− {ICONS[key]} {NAMES[key]}</em>)}</span></span>
            <span className="choice-arrow" aria-hidden="true">→</span>
          </button>
        ))}
      </div>
      <p className="no-free-note">Every plan helps in one way and uses a supply.</p>
    </section>
  );
}

export default DecisionCard;
