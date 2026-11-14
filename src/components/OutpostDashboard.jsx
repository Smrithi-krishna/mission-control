import ResourceBar from "./ResourceBar";
import { SPACE_WEATHER } from "../ui-mocks";

const RESOURCES = [
  { key: "power", label: "Power", icon: "ϟ", tip: "Power runs lights, heaters, and machines." },
  { key: "oxygen", label: "Oxygen", icon: "O₂", tip: "Oxygen is the air people need to breathe." },
  { key: "shielding", label: "Shielding", icon: "⬡", tip: "Shielding is a protective layer that helps block radiation." }
];

function OutpostDashboard({ resources, day, destination, onDestination, onFact }) {
  return (
    <section className="dashboard panel-glass">
      <div className="dashboard-heading">
        <div>
          <p className="eyebrow">YOUR SPACE HOME</p>
          <h1>Keep the crew safe.</h1>
          <p className="muted">Small choices make a big difference out here.</p>
        </div>
        <div className="destination-switch" aria-label="Choose where to live">
          {["Moon", "Mars"].map((place) => <button key={place} className={place === destination ? "active" : ""} onClick={() => onDestination(place)} type="button">{place}</button>)}
        </div>
      </div>
      <div className="dashboard-grid">
        <section className="resource-panel">
          <div className="panel-heading"><h2>Your supplies</h2><span>DAY {day} OF 10</span></div>
          <div className="resource-list dashboard-resources">
            {RESOURCES.map((item) => <div key={item.key} title={item.tip}><ResourceBar resourceKey={item.key} label={item.label} icon={item.icon} value={resources[item.key]} /><span className="resource-tip" tabIndex="0" aria-label={item.tip}>?</span></div>)}
          </div>
          <p className="micro-copy"><span className="dot dot--amber" /> Bars turn amber below 40% and red below 20%.</p>
          <p className="terms-help"><span tabIndex="0" title="Radiation is energy from the Sun and space that can harm people." aria-label="Radiation: energy from the Sun and space that can harm people">Radiation</span> is energy from space. <span tabIndex="0" title="Shielding is a protective layer that blocks some radiation." aria-label="Shielding: a protective layer that blocks some radiation">Shielding</span> helps block it.</p>
        </section>
        <section className="weather-panel">
          <div className="weather-icon" aria-hidden="true">☼</div>
          <div className="weather-copy"><p className="eyebrow">SPACE WEATHER</p><h2>{SPACE_WEATHER.level}</h2><p>{SPACE_WEATHER.label}</p><small>{SPACE_WEATHER.detail}</small></div>
          <div className={`weather-meter weather-meter--${SPACE_WEATHER.level.toLowerCase()}`} aria-label={`Solar activity: ${SPACE_WEATHER.level}`}><i /><i /><i /></div>
          <p className="source-line">Source: NASA DONKI</p>
        </section>
      </div>
      <button className="fact-link" type="button" onClick={onFact}><span>✦</span> Did you know? <b>Open a space fact</b><span aria-hidden="true">↗</span></button>
    </section>
  );
}

export default OutpostDashboard;
