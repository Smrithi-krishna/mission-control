import { useEffect, useRef, useState } from "react";
import { INITIAL_OUTPOST, JOURNEY_EVENT_CHOICES } from "./ui-mocks";
import { FACTS, OUTPOST_STORY } from "./ui-story";
import { getDefaultSoundSettings, playAlert, playBloop, playClick, playDing, playWin, resumeSound, setSoundSettings as applySoundSettings, startAmbient, testSound } from "./audio/sound";
import OutpostDashboard from "./components/OutpostDashboard";
import AstronautSetup, { SUIT_COLORS } from "./components/AstronautSetup";
import PlayerAstronaut from "./components/PlayerAstronaut";
import DecisionCard from "./components/DecisionCard";
import ConsequenceMessage from "./components/ConsequenceMessage";
import FactPopup from "./components/FactPopup";
import MissionReport from "./components/MissionReport";
import ScreenControls from "./components/ScreenControls";
import SoundPanel from "./components/SoundPanel";
import HowToPlay from "./components/HowToPlay";
import StoryIntro from "./components/StoryIntro";
import JourneyScreen from "./components/JourneyScreen";
import Scoreboard from "./components/Scoreboard";
import { calculateMockScore } from "./ui-mocks";
import { isAllowedNickname } from "./api/nickname";
import { getTopScores, saveScore } from "./api/scoreboard";
import { readJournal, saveJournalFactIds } from "./api/spaceJournal";
import DataSources from "./components/DataSources";

const PILOT_NAMES = ["Nova", "Star Pilot", "Captain Zen", "Luna", "Orbit"];
const RESOURCE_DETAILS = {
  power: { label: "Power", icon: "⚡" },
  oxygen: { label: "Oxygen", icon: "◌" },
  shielding: { label: "Shielding", icon: "⬡" }
};

function readPilotSettings() {
  try {
    const saved = JSON.parse(window.localStorage.getItem("mission-control-pilot") || "null");
    return {
      name: typeof saved?.name === "string" && isAllowedNickname(saved.name) ? saved.name.slice(0, 12) : "Captain Nova",
      color: SUIT_COLORS.some((item) => item.value === saved?.color) ? saved.color : SUIT_COLORS[0].value
    };
  } catch {
    return { name: "Captain Nova", color: SUIT_COLORS[0].value };
  }
}

function readSoundSettings() {
  const defaults = getDefaultSoundSettings();
  try {
    const saved = JSON.parse(window.localStorage.getItem("mission-control-sound") || "null");
    if (saved && typeof saved === "object") {
      return {
        musicVolume: Math.max(0, Math.min(100, Number(saved.musicVolume) || 0)),
        effectsVolume: Math.max(0, Math.min(100, Number(saved.effectsVolume) || 0)),
        mutedAll: Boolean(saved.mutedAll)
      };
    }
    return { ...defaults, mutedAll: window.localStorage.getItem("mission-control-muted") === "true" };
  } catch {
    return defaults;
  }
}

function App() {
  const [pilot, setPilot] = useState(readPilotSettings);
  const { name: pilotName, color: suitColor } = pilot;
  const [screen, setScreen] = useState("name");
  const [destination, setDestination] = useState(null);
  const [activePlanet, setActivePlanet] = useState(null);
  const [revealedPlanet, setRevealedPlanet] = useState(null);
  const [storyIndex, setStoryIndex] = useState(0);
  const [journeyEvents, setJourneyEvents] = useState([]);
  const [journeyIndex, setJourneyIndex] = useState(0);
  const [journeyPhase, setJourneyPhase] = useState("alert");
  const [resources, setResources] = useState(INITIAL_OUTPOST);
  const [day, setDay] = useState(1);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [activeFact, setActiveFact] = useState(null);
  const [journalIds, setJournalIds] = useState(readJournal);
  const [sourcesReturn, setSourcesReturn] = useState("name");
  const [report, setReport] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [soundSettings, setSoundSettings] = useState(readSoundSettings);
  const [soundOpen, setSoundOpen] = useState(false);
  const [audioBlocked, setAudioBlocked] = useState(false);
  const [nameWarning, setNameWarning] = useState(false);
  const [scoreboardReturn, setScoreboardReturn] = useState("name");
  const [latestScore, setLatestScore] = useState(null);
  const [personalBest, setPersonalBest] = useState(0);
  const [newRecord, setNewRecord] = useState(false);
  const muted = soundSettings.mutedAll;
  const winPlayed = useRef(false);
  const alertedEvent = useRef(null);
  const finishProcessed = useRef(false);

  useEffect(() => {
    try {
      window.localStorage.setItem("mission-control-pilot", JSON.stringify(pilot));
    } catch {
      // The pilot can still play when storage is disabled or full.
    }
  }, [pilot]);

  useEffect(() => {
    applySoundSettings(soundSettings);
    try {
      window.localStorage.setItem("mission-control-sound", JSON.stringify(soundSettings));
    } catch {
      // Sound still follows in-memory settings when storage is unavailable.
    }
    if (screen !== "name" && !soundSettings.mutedAll && soundSettings.musicVolume > 0) {
      startAmbient(() => setAudioBlocked(true)).then((ready) => {
        if (ready) setAudioBlocked(false);
      });
    }
  }, [soundSettings, screen]);

  const survived = Object.values(resources).every((value) => value > 0);
  useEffect(() => {
    if (screen === "game" && report && survived && !winPlayed.current) {
      winPlayed.current = true;
      playWin();
    }
  }, [screen, report, survived]);

  useEffect(() => {
    if (screen === "journey" && journeyPhase === "alert") {
      const key = `${journeyIndex}-${journeyEvents[journeyIndex]}`;
      if (alertedEvent.current !== key) {
        alertedEvent.current = key;
        playAlert();
      }
    }
  }, [screen, journeyPhase, journeyIndex, journeyEvents]);

  useEffect(() => {
    if (screen !== "game" || !report || finishProcessed.current) return;
    finishProcessed.current = true;
    const daysSurvived = survived ? 10 : day;
    const score = calculateMockScore(daysSurvived, resources);
    const stars = Object.values(resources).filter((value) => value >= 40).length;
    (async () => {
      const before = await getTopScores(20);
      const previousBest = before.filter((item) => item.name.toLocaleLowerCase() === pilotName.toLocaleLowerCase() && item.planet === destination).reduce((best, item) => Math.max(best, item.score), 0);
      const saved = await saveScore({ name: pilotName, planet: destination, score, days: daysSurvived, stars, color: suitColor });
      const after = await getTopScores(20);
      const rank = saved ? after.findIndex((item) => item.id === saved.id) : -1;
      const placedTopThree = rank >= 0 && rank < 3;
      setLatestScore(saved);
      setPersonalBest(Math.max(previousBest, score));
      setNewRecord(placedTopThree);
      if (placedTopThree && !survived) playWin();
    })();
  }, [screen, report, survived, day, resources, pilotName, destination, suitColor]);

  const clickSound = (event) => {
    if (event.target.closest("button")) playClick();
  };
  const updatePilotName = (value) => {
    const nextName = value.replace(/[^\p{L} ]/gu, "").slice(0, 12);
    if (nextName.trim() && !isAllowedNickname(nextName)) {
      setNameWarning(true);
      return;
    }
    setNameWarning(false);
    setPilot((current) => ({ ...current, name: nextName }));
  };
  const surpriseName = () => {
    const choices = PILOT_NAMES.filter((item) => item !== pilotName);
    updatePilotName(choices[Math.floor(Math.random() * choices.length)]);
  };
  const showNextFact = () => {
    const planetFacts = destination ? FACTS.filter((fact) => fact.planet === destination) : FACTS;
    if (!planetFacts.length) return;
    const unseen = planetFacts.filter((fact) => !journalIds.includes(fact.id));
    const pool = unseen.length ? unseen : planetFacts;
    const fact = pool[Math.floor(Math.random() * pool.length)];
    setActiveFact(fact);
    if (!journalIds.includes(fact.id)) {
      const nextJournal = [...journalIds, fact.id];
      setJournalIds(nextJournal);
      saveJournalFactIds(nextJournal);
      playDing();
    }
  };
  const showJournalFact = (fact) => setActiveFact(fact);
  const openSources = () => {
    setSourcesReturn(screen);
    setHelpOpen(false);
    setScreen("sources");
  };
  const goToGame = () => {
    setResult(null);
    setReport(false);
    setScreen("game");
  };
  const beginJourney = () => {
    const ids = Object.keys(JOURNEY_EVENT_CHOICES);
    for (let i = ids.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    const count = Math.random() < 0.5 ? 3 : 4;
    setJourneyEvents(ids.slice(0, count));
    setJourneyIndex(0);
    setJourneyPhase("alert");
    alertedEvent.current = null;
    setScreen("journey");
  };
  const startStory = () => {
    setStoryIndex(0);
    setScreen("story");
  };
  const advanceStory = () => {
    if (storyIndex + 1 === 4) beginJourney();
    else setStoryIndex((index) => index + 1);
  };
  const chooseJourney = (choice, eventId) => {
    const next = Object.fromEntries(Object.entries(resources).map(([key, value]) => [key, Math.max(0, Math.min(100, value + (choice.change[key] || 0)))]));
    const amounts = Object.entries(choice.change).filter(([, amount]) => amount !== 0);
    if (amounts.some(([, amount]) => amount > 0)) playDing();
    if (amounts.some(([, amount]) => amount < 0)) playBloop();
    setResources(next);
    setJourneyPhase("fly");
    setFeedback(amounts.map(([key, amount]) => ({ key, amount, type: amount > 0 ? "gain" : "cost", ...({ power: { label: "Power", icon: "⚡" }, oxygen: { label: "Oxygen", icon: "◌" }, shielding: { label: "Shielding", icon: "⬡" } })[key] })));
    setResult({ choice, scenario: { title: eventId, story: "The rocket is moving again." } });
    showNextFact();
  };
  const advanceJourney = () => {
    if (journeyIndex + 1 >= journeyEvents.length) setJourneyPhase("landing");
    else {
      setJourneyIndex((index) => index + 1);
      setJourneyPhase("alert");
    }
  };
  const choose = (choice) => {
    const next = Object.fromEntries(
      Object.entries(resources).map(([key, value]) => [key, Math.max(0, Math.min(100, value + (choice.change[key] || 0)))])
    );
    const changes = Object.entries(choice.change).map(([key, amount]) => ({
      key,
      type: amount >= 0 ? "gain" : "cost",
      amount: Math.abs(next[key] - resources[key]),
      ...RESOURCE_DETAILS[key]
    })).filter((item) => item.amount > 0);
    if (changes.some((item) => item.type === "gain")) playDing();
    if (changes.some((item) => item.type === "cost")) playBloop();
    setResources(next);
    setFeedback(changes);
    setResult({ choice, scenario: OUTPOST_STORY[scenarioIndex] });
  };
  const continueMission = () => {
    setResult(null);
    setFeedback([]);
    if (!survived || day >= 10) {
      setReport(true);
      showNextFact();
      return;
    }
    setScenarioIndex((index) => (index + 1) % OUTPOST_STORY.length);
    setDay((value) => value + 1);
    showNextFact();
  };
  const resetGame = () => {
    setResources(INITIAL_OUTPOST);
    setDay(1);
    setScenarioIndex(0);
    setResult(null);
    setFeedback([]);
    setReport(false);
    setDestination(null);
    setActivePlanet(null);
    setRevealedPlanet(null);
    setStoryIndex(0);
    winPlayed.current = false;
    setJourneyEvents([]);
    setJourneyIndex(0);
    setJourneyPhase("alert");
    setScreen("name");
    finishProcessed.current = false;
    setLatestScore(null);
    setPersonalBest(0);
    setNewRecord(false);
  };
  const openScoreboard = (returnTo = screen) => {
    setScoreboardReturn(returnTo);
    setScreen("scoreboard");
  };
  const controls = <ScreenControls muted={muted} onOpenSound={() => setSoundOpen(true)} onOpenHelp={() => setHelpOpen(true)} />;
  const helpDrawer = helpOpen && <HowToPlay drawer onClose={() => setHelpOpen(false)} onFactOfDay={() => { setHelpOpen(false); showNextFact(); }} journalIds={journalIds} onJournalFact={showJournalFact} onDataSources={openSources} />;
  const soundPanel = soundOpen && <SoundPanel settings={soundSettings} onChange={setSoundSettings} onClose={() => setSoundOpen(false)} onTest={async () => { const ready = await testSound(() => setAudioBlocked(true)); if (ready) setAudioBlocked(false); }} />;
  const soundBanner = audioBlocked && <div className="sound-unlock-banner" role="status"><span>Sound is waiting for you.</span><button type="button" onClick={async () => { const ready = await resumeSound(() => setAudioBlocked(true)); setAudioBlocked(!ready); }}>Tap to turn on sound</button></div>;
  const footer = <footer className="app-footer game-footer">Images and audio: NASA. Not endorsed by NASA.</footer>;
  const planetTheme = destination ? `game-shell--${destination.toLowerCase()}` : "";
  const commonScreenProps = { onClickCapture: clickSound };

  if (screen === "name") {
    return (
      <main className="app-shell intro-shell astronaut-step" {...commonScreenProps}>
        {controls}{soundBanner}
        <AstronautSetup name={pilotName} onNameChange={updatePilotName} color={suitColor} onColorChange={(color) => setPilot((current) => ({ ...current, color }))} onSurprise={() => { setNameWarning(false); surpriseName(); }} nameWarning={nameWarning} onScoreboard={() => openScoreboard("name")} canStart={Boolean(pilotName.trim() && isAllowedNickname(pilotName))} onNext={() => { startAmbient(() => setAudioBlocked(true)); setScreen("howto"); }} />
        {footer}{helpDrawer}{soundPanel}{activeFact && <FactPopup fact={activeFact} name={pilotName} suitColor={suitColor} onClose={() => setActiveFact(null)} onNextFact={showNextFact}/>}
      </main>
    );
  }

  if (screen === "howto") {
    return (
      <main className="app-shell intro-shell how-to-screen" {...commonScreenProps}>
        {controls}{soundBanner}
        <HowToPlay onSkip={() => setScreen("planet")} onContinue={() => setScreen("planet")} />
        {footer}{helpDrawer}{soundPanel}{activeFact && <FactPopup fact={activeFact} name={pilotName} suitColor={suitColor} onClose={() => setActiveFact(null)} onNextFact={showNextFact}/>}
      </main>
    );
  }

  if (screen === "planet") {
    const surfaceClass = destination ? ` planet-step--${destination.toLowerCase()}` : "";
    return (
      <main className={`app-shell intro-shell planet-step${surfaceClass}`} {...commonScreenProps}>
        {controls}{soundBanner}
        <div className={`planet-stage${destination ? ` planet-stage--${destination.toLowerCase()}` : ""}`}>
          {!destination && <div className="planet-targets" role="group" aria-label="Choose a planet">
            {[{ name: "Mars", id: "mars" }, { name: "Moon", id: "moon" }].map((planet) => {
              const active = activePlanet === planet.id || revealedPlanet === planet.id;
              return <div key={planet.id} className={`planet-target planet-target--${planet.id}${active ? " is-active" : ""}`} onPointerEnter={() => setActivePlanet(planet.id)} onPointerLeave={() => setActivePlanet(null)}>
                <button className="planet-hit-area" type="button" aria-label={`Show ${planet.name}`} onFocus={() => setActivePlanet(planet.id)} onBlur={() => setActivePlanet(null)} onClick={() => setRevealedPlanet(planet.id)} />
                {active && <button className="planet-name-button" type="button" onClick={() => setDestination(planet.name)}>{planet.name}</button>}
              </div>;
            })}
          </div>}
        </div>
        <h1 className="planet-heading">Where do you want to live?</h1>
        <p className="planet-hint">Hover or tap a planet.</p>
        <div className="planet-pilot"><PlayerAstronaut suitColor={suitColor} mood="happy" className="planet-pilot-art"/><p className="planet-speech">Tap a planet, {pilotName}!</p></div>
        {destination && <section className="planet-choice-card" aria-live="polite"><p>{destination}: {destination === "Moon" ? "close to Earth" : "far away and red"}</p><button type="button" className="primary-button" onClick={startStory}>Let's go! <span>→</span></button></section>}
        {footer}{helpDrawer}{soundPanel}{activeFact && <FactPopup fact={activeFact} name={pilotName} suitColor={suitColor} onClose={() => setActiveFact(null)} onNextFact={showNextFact}/>}
      </main>
    );
  }

  if (screen === "story") {
    return (
      <main className={`app-shell intro-shell game-shell story-shell ${planetTheme}`} {...commonScreenProps}>
        {controls}{soundBanner}
        <StoryIntro planet={destination} name={pilotName} color={suitColor} index={storyIndex} onNext={advanceStory} onSkip={beginJourney} />
        {footer}{helpDrawer}{soundPanel}{activeFact && <FactPopup fact={activeFact} name={pilotName} suitColor={suitColor} onClose={() => setActiveFact(null)} onNextFact={showNextFact}/>}
      </main>
    );
  }

  if (screen === "journey") {
    return <main className={`app-shell game-shell ${planetTheme}`} {...commonScreenProps}>
      {controls}{soundBanner}
      <JourneyScreen destination={destination} name={pilotName} color={suitColor} resources={resources} eventId={journeyEvents[journeyIndex]} phase={journeyPhase} index={journeyIndex} total={journeyEvents.length} onNext={() => setJourneyPhase((phase) => phase === "alert" ? "explain" : "choice")} onSkipExplain={() => setJourneyPhase("choice")} onChoose={chooseJourney} onFlyOn={advanceJourney} onEnter={goToGame}/>
      {footer}{helpDrawer}{soundPanel}{activeFact && <FactPopup fact={activeFact} name={pilotName} suitColor={suitColor} onClose={() => setActiveFact(null)} onNextFact={showNextFact}/>}
    </main>;
  }

  if (screen === "scoreboard") {
    return <><Scoreboard latestScoreId={latestScore?.id} onClose={() => setScreen(scoreboardReturn)} />{controls}{helpDrawer}{soundPanel}{footer}{activeFact && <FactPopup fact={activeFact} name={pilotName} suitColor={suitColor} onClose={() => setActiveFact(null)} onNextFact={showNextFact}/>}</>;
  }

  if (screen === "sources") return <><DataSources onClose={() => setScreen(sourcesReturn)}/>{controls}{soundBanner}{soundPanel}{footer}{activeFact && <FactPopup fact={activeFact} name={pilotName} suitColor={suitColor} onClose={() => setActiveFact(null)} onNextFact={showNextFact}/>}</>;

  return (
    <main className={`app-shell game-shell ${planetTheme}`} {...commonScreenProps}>
      <div className="space-backdrop" aria-hidden="true" />
      {controls}{soundBanner}
      <header className="topbar"><div className="brand-mark" aria-hidden="true">✦</div><div><p className="eyebrow">SPACE TRIP</p><p className="topbar-title">Home: {destination}</p></div><PlayerAstronaut suitColor={suitColor} mood={Object.values(resources).some((value) => value < 40) ? "worried" : "happy"} className="topbar-pilot"/><div className="day-pill mission-status-pill"><strong>{pilotName}</strong><small>DAY {day} OF 10</small></div></header>
      {!report && <OutpostDashboard resources={resources} day={day} destination={destination} onDestination={setDestination} onFact={showNextFact} />}
      <section className="play-area" aria-live="polite">
        {report ? <MissionReport resources={resources} survived={survived} pilotName={pilotName} suitColor={suitColor} worried={!survived} score={latestScore?.score} bestScore={personalBest} stars={latestScore?.stars} newRecord={newRecord} onScoreboard={() => openScoreboard("game")} onRestart={resetGame} /> : result ? <ConsequenceMessage result={result} resources={resources} feedback={feedback} onContinue={continueMission} /> : <DecisionCard scenario={OUTPOST_STORY[scenarioIndex]} onChoose={choose} />}
      </section>
      {footer}
      {helpDrawer}{soundPanel}{activeFact && <FactPopup fact={activeFact} name={pilotName} suitColor={suitColor} onClose={() => setActiveFact(null)} onNextFact={showNextFact}/>}
    </main>
  );
}

export default App;
