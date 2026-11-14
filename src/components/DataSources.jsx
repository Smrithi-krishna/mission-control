import { FACTS } from "../ui-story";

function DataSources({ onClose }) {
  return <main className="data-sources-screen app-shell game-shell">
    <section className="data-sources-card panel-glass" aria-labelledby="data-sources-title">
      <button className="scoreboard-close" type="button" onClick={onClose} aria-label="Close sources">×</button>
      <p className="eyebrow">SPACE TRIP</p><h1 id="data-sources-title">Data &amp; Sources</h1>
      <p>Space facts come from NASA and its science partners.</p>
      <div className="data-source-list">{FACTS.map((fact) => <article key={fact.id} className="data-source-item"><span className="data-source-planet">{fact.planet === "Moon" ? "🌙 MOON" : fact.planet === "Mars" ? "🔴 MARS" : "✦ BOTH WORLDS"}</span><p>{fact.text}</p><a href={fact.sourceUrl} target="_blank" rel="noopener noreferrer">{fact.sourceName} ↗</a></article>)}</div>
      <button type="button" className="primary-button" onClick={onClose}>Back</button>
    </section>
  </main>;
}

export default DataSources;
