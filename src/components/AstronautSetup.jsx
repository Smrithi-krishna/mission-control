import PlayerAstronaut from "./PlayerAstronaut";

export const SUIT_COLORS = [
  { name: "Mint", value: "#58cabb" },
  { name: "Coral", value: "#e68477" },
  { name: "Violet", value: "#a98ae5" },
  { name: "Sky blue", value: "#70aee8" }
];

function AstronautSetup({ name, onNameChange, color, onColorChange, canStart, onNext, onSurprise }) {
  return (
    <section className="astronaut-setup panel-glass" aria-labelledby="astronaut-heading">
      <h1 id="astronaut-heading" className="setup-title">Meet your astronaut</h1>
      <div className="pilot-art-wrap"><PlayerAstronaut suitColor={color} /><span className="pilot-orbit pilot-orbit--one"/><span className="pilot-orbit pilot-orbit--two"/></div>
      <label className="name-label" htmlFor="pilot-name">Pick your astronaut name</label>
      <div className="name-input-row"><input id="pilot-name" type="text" maxLength={12} value={name} onChange={(event) => onNameChange(event.target.value)} placeholder="Type a nickname" autoComplete="off"/><button type="button" className="surprise-button" onClick={onSurprise}>Surprise me</button></div>
      <p className="name-hint">Use a nickname, not your real name.</p>
      <fieldset className="suit-picker"><legend>Suit colour</legend><div className="color-options">{SUIT_COLORS.map((option) => <button key={option.value} type="button" className={`color-choice${color === option.value ? " selected" : ""}`} style={{ "--swatch": option.value }} aria-label={`${option.name} suit`} aria-pressed={color === option.value} onClick={() => onColorChange(option.value)} />)}</div></fieldset>
      <button className="primary-button start-mission-button" type="button" onClick={onNext} disabled={!canStart}>Next <span>→</span></button>
    </section>
  );
}

export default AstronautSetup;
