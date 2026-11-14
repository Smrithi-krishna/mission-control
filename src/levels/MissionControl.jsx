import { useEffect, useMemo, useState } from "react";
import ResourceBar from "../components/ResourceBar";
import Astronaut from "../components/Astronaut";
import { createNasaImageState, fetchNasaImage } from "../api/nasaImages";
import { DESTINATION_CHOICES } from "../ui-story";

const PRIMARY_RESOURCES = [
  { key: "fuel", label: "Fuel" },
  { key: "oxygen", label: "Oxygen" },
  { key: "morale", label: "Morale" }
];

// Plain-word planet cards for this screen (no emoji headings).
const PLANETS = [
  {
    id: "mars",
    name: "Mars",
    blurb: "A dry red world with giant hills and old volcanoes."
  },
  {
    id: "moon",
    name: "Moon",
    blurb: "Earth's quiet neighbour. Dust, craters, and a short trip."
  }
];

function MissionControl({ gameState, onChoice, onNext }) {
  const resources = gameState?.resources ?? {};
  const destination = gameState?.destination;
  const [bg, setBg] = useState(createNasaImageState);

  useEffect(() => {
    let live = true;

    fetchNasaImage("earth from space").then((result) => {
      if (live) {
        setBg({ ...result, loading: false });
      }
    });

    return () => {
      live = false;
    };
  }, []);

  const mood = useMemo(() => {
    const low = PRIMARY_RESOURCES.some((item) => (resources[item.key] ?? 100) < 25);
    return low ? "worried" : "happy";
  }, [resources]);

  const picked = DESTINATION_CHOICES.find((item) => item.id === destination);

  const selectPlanet = (id) => {
    onChoice?.(id);
  };

  return (
    <section className="mission-control">
      <div
        className="mission-control__bg"
        style={{ backgroundImage: `url("${bg.url}")` }}
        role="img"
        aria-label={bg.loading ? "Loading NASA sky" : bg.title}
      />
      <div className="mission-control__overlay" />

      <div className="mission-control__inner">
      <aside className="mission-control__hud">
        <p className="mission-status">Space Trip</p>
        <div className="resource-list">
          {PRIMARY_RESOURCES.map((item) => (
            <ResourceBar
              key={item.key}
              resourceKey={item.key}
              label={item.label}
              value={resources[item.key]}
              compact
            />
          ))}
        </div>
      </aside>

      <div className="mission-control__stage">
        {bg.loading ? (
          <p className="bg-status">Loading sky photo…</p>
        ) : null}

        <div className="planet-row">
          {PLANETS.map((planet) => {
            const selected = destination === planet.id;
            return (
              <button
                key={planet.id}
                type="button"
                className={`planet-card planet-card--${planet.id}${selected ? " is-selected" : ""}`}
                onClick={() => selectPlanet(planet.id)}
              >
                <span className="planet-card__orb" aria-hidden="true" />
                <h2>{planet.name}</h2>
                <p>{planet.blurb}</p>
                <span className="btn">{selected ? "Selected" : "Select"}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mission-control__dock">
        <Astronaut size="sm" mood={mood} />
        {picked ? (
          <button
            type="button"
            className="btn btn-peach mission-control__launch"
            onClick={() => onNext?.()}
          >
            Continue
          </button>
        ) : null}
      </div>
      </div>
    </section>
  );
}

export default MissionControl;
