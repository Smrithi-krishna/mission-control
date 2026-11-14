import PlayerAstronaut from "./PlayerAstronaut";

function FactIcon({ planet }) {
  const isMoon = planet === "Moon";
  return <svg className="fact-icon-svg" viewBox="0 0 120 120" role="img" aria-label={isMoon ? "Moon and stars" : "Mars and stars"}>
    <defs><radialGradient id="fact-world" cx="35%" cy="30%"><stop stopColor={isMoon ? "#eff6ff" : "#ffd1aa"}/><stop offset="1" stopColor={isMoon ? "#657ba1" : "#a84739"}/></radialGradient></defs>
    <circle cx="60" cy="60" r="39" fill="url(#fact-world)"/>
    {isMoon ? <g fill="#34415b" opacity=".45"><circle cx="45" cy="47" r="8"/><circle cx="70" cy="70" r="11"/><circle cx="45" cy="77" r="5"/></g> : <path d="M25 51q18-13 37-2t33-4M28 70q20-12 36 0t29-1" fill="none" stroke="#713b40" strokeWidth="7" opacity=".48"/>}
    <path d="m19 20 2 6 6 2-6 2-2 6-2-6-6-2 6-2zM93 25l2 5 5 2-5 2-2 5-2-5-5-2 5-2zM94 88l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#ffe18a"/>
  </svg>;
}

function FactPopup({ fact, name, suitColor, onClose, onNextFact }) {
  if (!fact) return null;
  return <div className="fact-modal-layer" aria-live="polite">
    <section className="fact-popup fact-popup--journal panel-glass" role="dialog" aria-modal="false" aria-labelledby="fact-title">
      <button className="close-button" type="button" onClick={onClose} aria-label="Close fact">×</button>
      <div className="fact-popup-art"><FactIcon planet={fact.planet}/><PlayerAstronaut suitColor={suitColor} mood="happy" className="fact-astronaut"/><span className="fact-unlock-sparkle" aria-hidden="true">✦</span></div>
      <p className="eyebrow">A LITTLE SPACE SCIENCE</p>
      <h2 id="fact-title">Did you know?</h2>
      <p className="fact-popup-copy">{fact.text}</p>
      <small className="source-line">Source: {fact.sourceName}</small>
      <a className="fact-learn-more" href={fact.sourceUrl} target="_blank" rel="noopener noreferrer">Learn more ↗</a>
      <div className="fact-popup-actions"><button className="primary-button" type="button" onClick={onClose}>Cool! <span>✦</span></button><button className="fact-next-button" type="button" onClick={onNextFact}>Next fact <span>→</span></button></div>
      <span className="fact-name-salute">Nice exploring, {name}!</span>
    </section>
  </div>;
}

export default FactPopup;
