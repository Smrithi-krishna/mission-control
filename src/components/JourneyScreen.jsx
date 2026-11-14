import ResourceBar from "./ResourceBar";
import PlayerAstronaut from "./PlayerAstronaut";
import { FACTS, JOURNEY_EVENT_STORY } from "../ui-story";
import { JOURNEY_EVENT_CHOICES } from "../ui-mocks";
import { RESOURCE_DEFINITIONS } from "../data/common/resources";

function Planet({ destination }) {
  const isMoon = destination === "Moon";
  const gradientId = isMoon ? "moon-planet-fill" : "mars-planet-fill";
  return <svg className={`journey-planet ${isMoon ? "journey-planet--moon" : "journey-planet--mars"}`} viewBox="0 0 140 140" aria-label={isMoon ? "Moon" : "Mars"} role="img">
    <defs><radialGradient id={gradientId} cx="35%" cy="30%"><stop stopColor={isMoon ? "#e8f1ff" : "#ffb58a"}/><stop offset="1" stopColor={isMoon ? "#647a9e" : "#9a493d"}/></radialGradient></defs>
    <circle cx="70" cy="70" r="60" fill={`url(#${gradientId})`}/>
    {isMoon ? <g fill="#384763" opacity=".48"><circle cx="48" cy="46" r="12"/><circle cx="87" cy="82" r="18"/><circle cx="45" cy="93" r="8"/></g> : <path d="M18 63q29-25 57-7t49-8M25 92q28-16 52 1t38-3" fill="none" stroke="#722f37" strokeWidth="11" opacity=".45"/>}
  </svg>;
}

function JourneyMap({ destination, progress, name, color, eventId }) {
  return <div className={`journey-map journey-map--${destination.toLowerCase()} journey-map--event-${eventId || "none"}`}>
    <div className="journey-stars" aria-hidden="true">{Array.from({ length: 30 }, (_, i) => <i key={i} style={{ left: `${(i * 37) % 100}%`, top: `${(i * 61) % 100}%`, animationDelay: `${-(i % 9)}s` }}/>)}</div>
    <div className="journey-earth"><Planet destination="Moon"/><b>Earth</b></div>
    <div className="journey-flight-path" aria-hidden="true"><i/></div>
    <div className="journey-destination"><Planet destination={destination}/><b>{destination}</b></div>
    <div className="journey-rocket" style={{ left: `${12 + progress * 75}%`, top: `${56 - Math.sin(progress * Math.PI) * 25}%`, "--suit-color": color }} aria-label={`${name}'s rocket in flight`}>
      <svg viewBox="0 0 120 96" role="img" aria-label="A little rocket"><path d="M19 57 4 69l21 3m76-15 15 12-21 3" fill="#a8bad5" stroke="#e8efff" strokeWidth="4"/><path d="M29 58Q35 25 60 8q25 17 31 50l-6 20H36z" fill="#ecf3ff" stroke="#91a4c5" strokeWidth="4"/><path d="M43 63q17-13 34 0l-3 26q-14 7-28 0z" fill="var(--suit-color)" stroke="#fff" strokeWidth="3"/><circle cx="60" cy="48" r="17" fill="#17213b" stroke="#d8e6ff" strokeWidth="4"/><circle cx="60" cy="48" r="3" fill="#fff"/><path d="m60 68 2 4 5 1-4 3 1 5-4-2-4 2 1-5-4-3 5-1z" fill="#ffe28c"/><path className="journey-flame" d="M48 87q12 3 24 0l-6 9-6-5-6 5z" fill="#ff9f62"/></svg>
      <span>{name}</span>
    </div>
    <div className="journey-progress"><span style={{ width: `${progress * 100}%` }}/></div>
  </div>;
}

function EventPicture({ eventId }) {
  return <div className={`journey-event-picture journey-event-picture--${eventId}`} aria-label={JOURNEY_EVENT_STORY[eventId].labels.join(", ")} role="img">
    <svg viewBox="0 0 280 130" aria-hidden="true">
      {eventId === "solarFlare" && <><circle cx="48" cy="64" r="32" fill="#ffc85e"/><path d="M74 54q48-45 106-16M78 67q50 4 104-7M74 80q53 41 110 8" fill="none" stroke="#ff8e65" strokeWidth="9" strokeLinecap="round"/><path d="M200 49q21-18 42-9t16 29q-4 20-27 20l-23-12" fill="#dbe6f8" stroke="#9eb4d9" strokeWidth="3"/><circle cx="236" cy="60" r="11" fill="#17213b" stroke="#fff" strokeWidth="3"/></>}
      {eventId === "meteoroids" && <><path d="m35 20 14 12-9 13-14-12zM94 73l15 8-7 14-17-6zM176 19l12 9-9 12-13-8z" fill="#aeb9ce"/><path d="m25 13 30 34m58 17 27 22m24-66 34 31" stroke="#ffd885" strokeWidth="3"/><path d="M185 53q25-15 45 0l-8 51h-36z" fill="#eaf0ff" stroke="#aab9d4" strokeWidth="3"/><path d="m195 59 17 24-12-2 8 16" fill="none" stroke="#ff9475" strokeWidth="3"/></>}
      {eventId === "radiationBelt" && <><circle cx="112" cy="65" r="28" fill="#75a7d8"/><ellipse cx="112" cy="65" rx="75" ry="40" fill="none" stroke="#8b7de2" strokeWidth="7" opacity=".75"/><ellipse cx="112" cy="65" rx="92" ry="54" fill="none" stroke="#62cfdb" strokeWidth="4" opacity=".65"/><path d="M198 50q23-14 42-5t10 27q-4 18-23 18l-19-10" fill="#eaf0ff" stroke="#aab9d4" strokeWidth="3"/></>}
      {eventId === "radioSignal" && <><circle cx="40" cy="66" r="25" fill="#91b8e4"/><path d="M40 38v-14m-9 20L19 34m30 10 12-11" stroke="#fff" strokeWidth="4"/><path d="M73 66h130" stroke="#c6a8ff" strokeWidth="4" strokeDasharray="6 8"><animate attributeName="stroke-dashoffset" values="0;-28" dur="1s" repeatCount="indefinite"/></path><path d="M209 50q21-14 39-5t10 27q-4 18-23 18l-19-10" fill="#eaf0ff" stroke="#aab9d4" strokeWidth="3"/></>}
      {eventId === "powerGlitch" && <><path d="M49 31h63v72H49z" fill="#4d5574" stroke="#d8e4fb" strokeWidth="4"/><path d="M66 52h30M66 69h20M66 86h30" stroke="#f7d777" strokeWidth="5"><animate attributeName="opacity" values="1;.2;1" dur=".8s" repeatCount="indefinite"/></path><path d="M181 50q21-14 39-5t10 27q-4 18-23 18l-19-10" fill="#eaf0ff" stroke="#aab9d4" strokeWidth="3"/><path d="M112 66h60" stroke="#a6b5d0" strokeWidth="4" strokeDasharray="6 6"/></>}
    </svg>
    <div className="journey-picture-labels">{JOURNEY_EVENT_STORY[eventId].labels.map((label) => <span key={label}>{label}</span>)}</div>
  </div>;
}

function JourneyScreen({ destination, name, color, resources, eventId, phase, index, total, onNext, onSkipExplain, onChoose, onFlyOn, onEnter }) {
  const progress = phase === "landing" ? 1 : (index + (phase === "fly" ? 0.85 : phase === "choice" ? 0.55 : phase === "explain" ? 0.25 : 0)) / total;
  const event = eventId ? JOURNEY_EVENT_STORY[eventId] : null;
  const eventFact = event ? FACTS.find((item) => item.id === event.factId) : null;
  const options = eventId ? JOURNEY_EVENT_CHOICES[eventId] : [];
  return <main className={`app-shell game-shell journey-screen game-shell--${destination.toLowerCase()}`}>
    <header className="journey-hud"><span className="day-pill">DAY 1 OF 10</span><div className="journey-meters">{RESOURCE_DEFINITIONS.map(({ key, label, icon }) => <ResourceBar key={key} label={label} icon={icon} resourceKey={key} value={resources[key]} compact/>)}</div></header>
    <JourneyMap destination={destination} progress={progress} name={name} color={color} eventId={eventId}/>
    {phase === "landing" ? <section className="journey-card journey-landing" aria-live="polite"><div className="journey-landing-art">✦</div><h1>We made it to {destination}!</h1><PlayerAstronaut suitColor={color} mood="happy"/><button type="button" className="primary-button" onClick={onEnter}>Enter your space home <span>→</span></button></section> : <section className="journey-card" aria-live="polite">
      <p className="eyebrow">JOURNEY STOP {index + 1} OF {total}</p>
      {phase === "alert" && <><h1>{event.title}</h1><p>{event.alert}</p><EventPicture eventId={eventId}/><span className="journey-warning">⚠ Gentle alert</span><button type="button" className="primary-button" onClick={onNext}>See what it is <span>→</span></button></>}
      {phase === "explain" && <><h1>What is this?</h1><EventPicture eventId={eventId}/><p>{event.explain[0]} {event.explain[1]}</p>{eventFact && <div className="journey-fact"><p>Did you know? {eventFact.text}</p><a className="journey-source" href={eventFact.sourceUrl} target="_blank" rel="noopener noreferrer">Source: {eventFact.sourceName}</a></div>}<div className="journey-actions"><button type="button" className="primary-button" onClick={onNext}>Choose what to do</button>{index > 0 && <button type="button" className="journey-skip" onClick={onSkipExplain}>Skip this card</button>}</div></>}
      {phase === "choice" && <><h1>{event.title}</h1><p>What should {name} do?</p><div className="journey-choices">{options.map((choice) => <button type="button" className="journey-choice" key={choice.id} onClick={() => onChoose(choice, eventId)}><strong>{choice.label}</strong><span>{Object.entries(choice.change).map(([key, amount]) => <i key={key} className={amount > 0 ? "is-gain" : "is-cost"}>{amount > 0 ? "↑" : "↓"} {RESOURCE_DEFINITIONS.find((item) => item.key === key)?.label || key} {Math.abs(amount)}</i>)}</span></button>)}</div></>}
      {phase === "fly" && <><h1>Nice work, {name}!</h1><p>The rocket is moving on. Your supplies changed, so keep an eye on the meters.</p><PlayerAstronaut suitColor={color} mood={Object.values(resources).some((value) => value < 40) ? "worried" : "happy"}/><button type="button" className="primary-button" onClick={onFlyOn}>Fly on <span>→</span></button></>}
    </section>}
  </main>;
}

export default JourneyScreen;
