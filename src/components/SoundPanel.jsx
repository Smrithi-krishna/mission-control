function SoundPanel({ settings, onChange, onTest, onClose }) {
  const set = (key, value) => onChange({ ...settings, [key]: value });
  return (
    <div className="sound-popover" role="dialog" aria-label="Sound settings">
      <div className="sound-popover-heading"><div><p className="eyebrow">SOUND</p><h2>Sound settings</h2></div><button type="button" className="sound-close" onClick={onClose} aria-label="Close sound settings">×</button></div>
      <label className="sound-slider"><span>Music volume <b>{settings.musicVolume}%</b></span><input type="range" min="0" max="100" step="1" value={settings.musicVolume} onChange={(event) => set("musicVolume", Number(event.target.value))} /></label>
      <p className="sound-boost-note">Music boost ×2 (up to ×4)</p>
      <label className="sound-slider"><span>Effects volume <b>{settings.effectsVolume}%</b></span><input type="range" min="0" max="100" step="1" value={settings.effectsVolume} onChange={(event) => set("effectsVolume", Number(event.target.value))} /></label>
      <label className="sound-mute-toggle"><input type="checkbox" checked={settings.mutedAll} onChange={(event) => set("mutedAll", event.target.checked)} /><span className="switch-track" aria-hidden="true"/><span>Mute all</span></label>
      <button type="button" className="primary-button sound-test-button" onClick={onTest}>Test sound <span>♪</span></button>
    </div>
  );
}

export default SoundPanel;
