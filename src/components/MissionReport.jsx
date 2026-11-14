import ResourceBar from "./ResourceBar";
import PlayerAstronaut from "./PlayerAstronaut";
import { REPORT_COPY, REPORT_LESSONS } from "../ui-story";
import { RESOURCE_DEFINITIONS } from "../data/common/resources";

function MissionReport({ resources, discoveries = [], survived, pilotName, suitColor, worried, onRestart, score, bestScore, stars, newRecord, onScoreboard }) {
  return (
    <section className={`report-card panel-glass${newRecord ? " report-card--new-record" : ""}`}>
      {(survived || newRecord) && <div className="confetti-layer" aria-hidden="true">{Array.from({ length: newRecord ? 72 : 56 }, (_, index) => <i key={index} style={{ "--confetti-x": `${(index * 37) % 100}%`, "--confetti-delay": `${(index % 11) * 90}ms`, "--confetti-duration": `${2.1 + (index % 8) * 0.18}s`, "--confetti-rotate": `${(index * 71) % 720}deg` }} />)}</div>}
      {newRecord && <p className="new-record-banner">🏆 New record!</p>}
      <div className={`report-emblem${survived ? "" : " report-emblem--failed"}`} aria-hidden="true">{survived ? "✦" : "↻"}</div>
      <p className="eyebrow">TRIP REPORT</p>
      <h2>{survived ? REPORT_COPY.successTitle : REPORT_COPY.failureTitle}</h2>
      <div className="report-pilot"><PlayerAstronaut suitColor={suitColor} mood={worried ? "worried" : "happy"} className="report-pilot-art"/><p className="scenario-story"><strong>{pilotName}{survived ? ` ${REPORT_COPY.successStory}` : REPORT_COPY.failureStory}</strong></p></div>
      <div className="report-supplies"><h3>Final supplies</h3><div className="resource-list dashboard-resources">{RESOURCE_DEFINITIONS.map((item) => <ResourceBar key={item.key} resourceKey={item.key} label={item.label} icon={item.icon} value={resources[item.key]} />)}</div></div>
      <div className="report-score"><strong>Score: {score?.toLocaleString() || 0}</strong><span>Your best score: {bestScore?.toLocaleString() || 0}</span><span aria-label={`${stars || 0} stars`}>{"★".repeat(stars || 0)}{"☆".repeat(3 - (stars || 0))}</span></div>
      <div className="lessons"><h3>Discoveries</h3><p>{discoveries.length ? `${discoveries.length} mission discoveries recorded.` : "No discoveries recorded this mission."}</p><h3>Things we learned</h3><ul>{REPORT_LESSONS.map((lesson) => <li key={lesson}><span>✧</span>{lesson}</li>)}</ul></div>
      <div className="report-actions"><button className="primary-button" type="button" onClick={onRestart}>{survived ? "Play again" : "Try again!"} <span>↻</span></button><button className="report-scoreboard-button" type="button" onClick={onScoreboard}>🏆 Top Astronauts</button></div>
    </section>
  );
}

export default MissionReport;
