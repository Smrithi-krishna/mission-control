import { FACTS, HELP_DETAILS, HOW_TO_PLAY_CARDS } from "../ui-story";

function HowToPlay({ onContinue, onSkip, onClose, drawer = false, onFactOfDay, journalIds = [], onJournalFact, onDataSources }) {
  const cards = (
    <>
      <div className="how-to-cards">
        {HOW_TO_PLAY_CARDS.map((card, index) => <article className="how-to-card" key={card.title}><span className="how-to-icon" aria-hidden="true">{card.icon}</span><span className="how-to-number">0{index + 1}</span><h2>{card.title}</h2><p>{card.text}</p></article>)}
      </div>
      {drawer && <div className="help-details"><h2>Quick tips</h2><ul>{HELP_DETAILS.map((detail) => <li key={detail}>{detail}</li>)}</ul><button className="help-journal-action" type="button" onClick={onFactOfDay}>✦ Fact of the day</button><h2>Space Journal <span>({journalIds.length})</span></h2>{journalIds.length ? <ul className="journal-facts">{FACTS.filter((fact) => journalIds.includes(fact.id)).map((fact) => <li key={fact.id}><button type="button" onClick={() => onJournalFact(fact)}>{fact.planet === "Moon" ? "🌙" : fact.planet === "Mars" ? "🔴" : "✦"} {fact.text}</button></li>)}</ul> : <p className="journal-empty">Facts you discover will show up here.</p>}<button className="help-journal-action" type="button" onClick={onDataSources}>Data &amp; Sources</button></div>}
      <div className="how-to-actions">
        {onSkip && <button type="button" className="text-button" onClick={onSkip}>Skip</button>}
        {onContinue && <button type="button" className="primary-button" onClick={onContinue}>Next <span>→</span></button>}
      </div>
    </>
  );

  if (drawer) {
    return <div className="help-backdrop" role="presentation" onClick={onClose}><section className="help-drawer panel-glass" role="dialog" aria-modal="true" aria-labelledby="help-heading" onClick={(event) => event.stopPropagation()}><button type="button" className="help-close" onClick={onClose} aria-label="Close help">×</button><p className="eyebrow">A QUICK GUIDE</p><h1 id="help-heading">How to play</h1>{cards}</section></div>;
  }

  return <section className="how-to-content"><p className="eyebrow">BEFORE YOU BLAST OFF</p><h1>How to play</h1>{cards}</section>;
}

export default HowToPlay;
