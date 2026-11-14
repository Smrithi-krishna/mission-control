function FactPopup({ fact, onClose }) {
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section className="fact-popup panel-glass" role="dialog" aria-modal="true" aria-labelledby="fact-title" onClick={(event) => event.stopPropagation()}>
        <button className="close-button" type="button" onClick={onClose} aria-label="Close fact">×</button>
        <div className="fact-sparkle" aria-hidden="true">✦</div>
        <p className="eyebrow">A LITTLE SPACE SCIENCE</p>
        <h2 id="fact-title">Did you know?</h2>
        <p className="fact-title">{fact.title}</p>
        <p>{fact.body}</p>
        <small className="source-line">Source: <a href={fact.sourceUrl} target="_blank" rel="noreferrer">{fact.source.replace("Source: ", "")}</a></small>
        <button className="primary-button" type="button" onClick={onClose}>Cool! <span>✦</span></button>
      </section>
    </div>
  );
}

export default FactPopup;
