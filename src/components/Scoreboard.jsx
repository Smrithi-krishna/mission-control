import { useEffect, useState } from "react";
import PlayerAstronaut from "./PlayerAstronaut";
import { clearMyScores, getTopScores } from "../api/scoreboard";

const FILTERS = ["All", "Moon", "Mars"];
const MEDALS = ["🥇", "🥈", "🥉"];

function Scoreboard({ onClose, latestScoreId }) {
  const [filter, setFilter] = useState("All");
  const [scores, setScores] = useState([]);

  const refresh = async () => setScores(await getTopScores(20));
  useEffect(() => { refresh(); }, []);

  const clearScores = async () => {
    await clearMyScores();
    await refresh();
  };
  const shown = filter === "All" ? scores : scores.filter((item) => item.planet === filter);

  return <main className="scoreboard-screen app-shell game-shell">
    <section className="scoreboard-card panel-glass" aria-labelledby="scoreboard-heading">
      <button type="button" className="scoreboard-close" onClick={onClose} aria-label="Close scoreboard">×</button>
      <p className="eyebrow">SPACE TRIP</p>
      <h1 id="scoreboard-heading">Top Astronauts</h1>
      <p className="scoreboard-safety">Nickname only, never your real name.</p>
      <div className="scoreboard-tabs" role="tablist" aria-label="Filter scores by planet">
        {FILTERS.map((item) => <button type="button" role="tab" aria-selected={filter === item} className={filter === item ? "active" : ""} key={item} onClick={() => setFilter(item)}>{item === "Moon" ? "🌙 " : item === "Mars" ? "🔴 " : ""}{item}</button>)}
      </div>
      {shown.length === 0 ? <div className="scoreboard-empty"><span aria-hidden="true">✦</span><p>No astronauts yet. Be the first!</p></div> : <ol className="scoreboard-list">
        {shown.map((entry, index) => <li key={entry.id} className={`scoreboard-row${index < 3 ? ` scoreboard-row--top${index + 1}` : ""}${entry.id === latestScoreId ? " is-you" : ""}`}>
          <span className="scoreboard-rank">{MEDALS[index] || `#${index + 1}`}</span>
          <PlayerAstronaut suitColor={entry.color} mood="happy" className="scoreboard-avatar"/>
          <span className="scoreboard-name"><strong>{entry.name}</strong>{entry.id === latestScoreId && <small>YOU</small>}</span>
          <span className="scoreboard-planet" aria-label={entry.planet}>{entry.planet === "Moon" ? "🌙" : "🔴"}</span>
          <span className="scoreboard-stars" aria-label={`${entry.stars} stars`}>{"★".repeat(entry.stars)}{"☆".repeat(3 - entry.stars)}</span>
          <strong className="scoreboard-points">{entry.score.toLocaleString()}</strong>
        </li>)}
      </ol>}
      <div className="scoreboard-actions"><button type="button" className="scoreboard-clear" onClick={clearScores}>Clear my scores</button><button type="button" className="primary-button" onClick={onClose}>Back</button></div>
    </section>
  </main>;
}

export default Scoreboard;
