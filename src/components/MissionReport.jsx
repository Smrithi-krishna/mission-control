import ResourceBar from "./ResourceBar";
import PlayerAstronaut from "./PlayerAstronaut";
import { REPORT_LESSONS } from "../ui-mocks";

const RESOURCES = [
  { key: "power", label: "Power", icon: "ϟ" },
  { key: "oxygen", label: "Oxygen", icon: "O₂" },
  { key: "shielding", label: "Shielding", icon: "⬡" }
];

function MissionReport({ resources, survived, pilotName, suitColor, worried, onRestart }) {
  return (
    <section className="report-card panel-glass">
      <div className={`report-emblem${survived ? "" : " report-emblem--failed"}`} aria-hidden="true">{survived ? "✦" : "!"}</div>
      <p className="eyebrow">TRIP REPORT</p>
      <h2>{survived ? "Your crew is safe!" : "Your trip ended early"}</h2>
      <div className="report-pilot"><PlayerAstronaut suitColor={suitColor} mood={worried ? "worried" : "happy"} className="report-pilot-art"/><p className="scenario-story">{survived ? <><strong>{pilotName} made it through 10 days!</strong> Great teamwork!</> : <><strong>{pilotName}'s trip ended early.</strong> The crew went back to Earth safely.</>}</p></div>
      <div className="report-supplies"><h3>Final supplies</h3><div className="resource-list dashboard-resources">{RESOURCES.map((item) => <ResourceBar key={item.key} resourceKey={item.key} label={item.label} icon={item.icon} value={resources[item.key]} />)}</div></div>
      <div className="lessons"><h3>Things we learned</h3><ul>{REPORT_LESSONS.map((lesson) => <li key={lesson}><span>✧</span>{lesson}</li>)}</ul></div>
      <button className="primary-button" type="button" onClick={onRestart}>Play again <span>↻</span></button>
    </section>
  );
}

export default MissionReport;
