function ScreenControls({ muted, onOpenSound, onOpenHelp }) {
  return (
    <div className="screen-controls">
      <button className="icon-control" type="button" onClick={onOpenHelp} aria-label="How to play" title="How to play">?</button>
      <button className="icon-control" type="button" onClick={onOpenSound} aria-label="Sound settings" title="Sound settings">{muted ? "🔇" : "🔊"}</button>
    </div>
  );
}

export default ScreenControls;
