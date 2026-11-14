import { useEffect, useState } from "react";
import { INITIAL_OUTPOST, OUTPOST_SCENARIOS, SPACE_FACT } from "./ui-mocks";
import OutpostDashboard from "./components/OutpostDashboard";
import AstronautSetup, { SUIT_COLORS } from "./components/AstronautSetup";
import PlayerAstronaut from "./components/PlayerAstronaut";
import DecisionCard from "./components/DecisionCard";
import ConsequenceMessage from "./components/ConsequenceMessage";
import FactPopup from "./components/FactPopup";
import MissionReport from "./components/MissionReport";

const PILOT_NAMES = ["Nova", "Star Pilot", "Captain Zen", "Luna", "Orbit"];

function readPilotSettings() {
  try {
    const saved = JSON.parse(window.localStorage.getItem("mission-control-pilot") || "null");
    return {
      name: typeof saved?.name === "string" && saved.name.trim() ? saved.name.slice(0, 12) : "Captain Nova",
      color: SUIT_COLORS.some((item) => item.value === saved?.color) ? saved.color : SUIT_COLORS[0].value
    };
  } catch {
    return { name: "Captain Nova", color: SUIT_COLORS[0].value };
  }
}

function App() {
  const [pilot, setPilot] = useState(readPilotSettings);
  const { name: pilotName, color: suitColor } = pilot;
  const [started, setStarted] = useState(false);
  const [openingStep, setOpeningStep] = useState("name");
  const [destination, setDestination] = useState(null);
  const [activePlanet, setActivePlanet] = useState(null);
  const [revealedPlanet, setRevealedPlanet] = useState(null);
  const [resources, setResources] = useState(INITIAL_OUTPOST);
  const [day, setDay] = useState(3);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [showFact, setShowFact] = useState(false);
  const [report, setReport] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem("mission-control-pilot", JSON.stringify(pilot));
    } catch {
      // The pilot can still play when storage is disabled or full.
    }
  }, [pilot]);

  const updatePilotName = (value) => {
    setPilot((current) => ({ ...current, name: value.replace(/[^\p{L} ]/gu, "").slice(0, 12) }));
  };

  const surpriseName = () => {
    const choices = PILOT_NAMES.filter((item) => item !== pilotName);
    updatePilotName(choices[Math.floor(Math.random() * choices.length)]);
  };

  const reset = () => {
    setResources(INITIAL_OUTPOST);
    setDay(3);
    setScenarioIndex(0);
    setResult(null);
    setReport(false);
  };

  const choose = (choice) => {
    const next = Object.fromEntries(
      Object.entries(resources).map(([key, value]) => [key, Math.max(0, Math.min(100, value + (choice.change[key] || 0)))])
    );
    setResources(next);
    setResult({ choice, scenario: OUTPOST_SCENARIOS[scenarioIndex] });
  };

  const continueMission = () => {
    setResult(null);
    if (scenarioIndex + 1 >= OUTPOST_SCENARIOS.length) {
      if (Object.values(resources).every((value) => value > 0)) setDay(10);
      setReport(true);
      return;
    }
    if (Object.values(resources).some((value) => value <= 0)) {
      setReport(true);
      return;
    }
    setScenarioIndex((index) => index + 1);
    setDay((value) => value + 1);
  };

  const startOver = () => {
    reset();
    setDestination(null);
    setOpeningStep("name");
    setStarted(false);
  };

  const worried = Object.values(resources).some((value) => value < 40);

  if (!started && openingStep === "name") {
    return (
      <main className="app-shell intro-shell astronaut-step">
        <AstronautSetup
          name={pilotName}
          onNameChange={updatePilotName}
          color={suitColor}
          onColorChange={(color) => setPilot((current) => ({ ...current, color }))}
          onSurprise={surpriseName}
          canStart={Boolean(pilotName.trim())}
          onNext={() => setOpeningStep("planet")}
        />
      </main>
    );
  }

  if (!started) {
    return (
      <main className="app-shell intro-shell planet-step">
        <div className="planet-stage">
          <div className="planet-targets" aria-label="Choose a planet">
            {[
              { name: "Mars", id: "mars" },
              { name: "Moon", id: "moon" }
            ].map((planet) => {
              const active = activePlanet === planet.id || revealedPlanet === planet.id;
              return (
                <div
                  key={planet.id}
                  className={`planet-target planet-target--${planet.id}${active ? " is-active" : ""}`}
                  onPointerEnter={() => setActivePlanet(planet.id)}
                  onPointerLeave={() => setActivePlanet(null)}
                >
                  <button
                    className="planet-hit-area"
                    type="button"
                    aria-label={`Show ${planet.name}`}
                    onFocus={() => setActivePlanet(planet.id)}
                    onBlur={() => setActivePlanet(null)}
                    onClick={() => setRevealedPlanet(planet.id)}
                  />
                  {active && <button className="planet-name-button" type="button" onClick={() => setDestination(planet.name)}>{planet.name}</button>}
                </div>
              );
            })}
          </div>
        </div>
        <h1 className="planet-heading">Where do you want to live?</h1>
        <p className="planet-hint">Hover or tap a planet.</p>
        <div className="planet-pilot">
          <PlayerAstronaut suitColor={suitColor} mood="happy" className="planet-pilot-art" />
          <p className="planet-speech">Tap a planet, {pilotName}!</p>
        </div>
        {destination && (
          <section className="planet-choice-card" aria-live="polite">
            <p>{destination}: {destination === "Moon" ? "close to Earth" : "far away and red"}</p>
            <button type="button" className="primary-button" onClick={() => setStarted(true)}>Let's go! <span>→</span></button>
          </section>
        )}
      </main>
    );
  }

  return (
    <main className="app-shell">
      <div className="space-backdrop" aria-hidden="true" />
      <header className="topbar">
        <div className="brand-mark" aria-hidden="true">✦</div>
        <div><p className="eyebrow">SPACE TRIP</p><p className="topbar-title">Home: {destination}</p></div>
        {started && <PlayerAstronaut suitColor={suitColor} mood={worried ? "worried" : "happy"} className="topbar-pilot" />}
        <div className="day-pill mission-status-pill"><strong>{pilotName}</strong>{started && <small>DAY {day} OF 10</small>}</div>
      </header>

      <OutpostDashboard resources={resources} day={day} destination={destination} onDestination={setDestination} onFact={() => setShowFact(true)} />

      <section className="play-area" aria-live="polite">
        {report ? (
          <MissionReport resources={resources} survived={!Object.values(resources).some((value) => value <= 0)} pilotName={pilotName} suitColor={suitColor} worried={worried} onRestart={startOver} />
        ) : result ? (
          <ConsequenceMessage result={result} resources={resources} onContinue={continueMission} />
        ) : (
          <DecisionCard scenario={OUTPOST_SCENARIOS[scenarioIndex]} onChoose={choose} />
        )}
      </section>

      <footer className="app-footer">Data: NASA (DONKI, Artemis, Mars missions)</footer>
      {showFact && <FactPopup fact={SPACE_FACT} onClose={() => setShowFact(false)} />}
    </main>
  );
}

export default App;
