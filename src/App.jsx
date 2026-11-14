import { useState } from "react";
import { createInitialGameState } from "./engine/gameState";
import MissionControl from "./levels/MissionControl";
import Astronaut from "./components/Astronaut";

// Screen ids: menu → missionControl → journey → moon | mars → report
const SCREENS = {
  menu: "menu",
  missionControl: "missionControl",
  journey: "journey",
  moon: "moon",
  mars: "mars",
  report: "report"
};

function MenuScreen({ onStart }) {
  return (
    <section className="screen">
      <div className="menu-hero">
        <p className="star-row" aria-hidden="true">
          ✦ ✧ ✦
        </p>
        <h1>Mission Control</h1>
        <p className="screen-subtitle">A cozy space adventure for NASA Space Apps 2026.</p>
      </div>
      <Astronaut mood="happy" message="Hi! Want to fly today?" />
      <button type="button" className="btn btn-peach" onClick={onStart}>
        Start mission
      </button>
    </section>
  );
}

function PlaceholderScreen({ title, note, onBack }) {
  return (
    <section className="screen">
      <h1 className="screen-title">{title}</h1>
      <p className="panel">{note}</p>
      <button type="button" className="btn btn-mint" onClick={onBack}>
        Back to Mission Control
      </button>
    </section>
  );
}

function App() {
  const [screen, setScreen] = useState(SCREENS.menu);
  const [gameState, setGameState] = useState(createInitialGameState);

  const startMission = () => {
    setGameState(createInitialGameState());
    setScreen(SCREENS.missionControl);
  };

  // Mission Control currently only records Moon vs Mars.
  const handleChoice = (choiceId) => {
    setGameState((prev) => ({
      ...prev,
      destination: choiceId,
      currentLevel: "mission-control"
    }));
  };

  const handleNext = () => {
    setScreen(SCREENS.journey);
  };

  return (
    <div className="app-shell">
      {screen === SCREENS.menu && <MenuScreen onStart={startMission} />}

      {screen === SCREENS.missionControl && (
        <MissionControl
          gameState={gameState}
          onChoice={handleChoice}
          onNext={handleNext}
        />
      )}

      {screen === SCREENS.journey && (
        <PlaceholderScreen
          title="Space Journey"
          note="Coming next: the rocket trip screen."
          onBack={() => setScreen(SCREENS.missionControl)}
        />
      )}

      {screen === SCREENS.moon && (
        <PlaceholderScreen
          title="Moon"
          note="Coming next: moon exploration."
          onBack={() => setScreen(SCREENS.missionControl)}
        />
      )}

      {screen === SCREENS.mars && (
        <PlaceholderScreen
          title="Mars"
          note="Coming next: mars exploration."
          onBack={() => setScreen(SCREENS.missionControl)}
        />
      )}

      {screen === SCREENS.report && (
        <PlaceholderScreen
          title="Mission Report"
          note="Coming next: stars, score, and play again."
          onBack={() => setScreen(SCREENS.menu)}
        />
      )}

      <footer className="app-footer">Images: NASA</footer>
    </div>
  );
}

export default App;
