function PlayerAstronaut({ suitColor = "#58cabb", mood = "happy", className = "" }) {
  const worried = mood === "worried";
  return (
    <div className={`player-astronaut player-astronaut--${mood} ${className}`} aria-label={`${mood} astronaut`}>
      <svg viewBox="0 0 220 250" role="img" aria-label="A little astronaut riding a rocket" className="player-astronaut__art" style={{ "--suit-color": suitColor }}>
        <ellipse cx="110" cy="230" rx="49" ry="8" fill="#05091a" opacity=".55" />
        {/* Rocket flame */}
        <path d="M88 200c-2 17 5 24 8 31 6-6 9-12 7-20l7 18c9-9 10-18 3-30z" fill="#ff885f" />
        <path d="M97 205c0 9 3 13 7 18 4-6 3-12-1-18z" fill="#ffd476" />
        {/* Small rocket */}
        <path d="M77 166q33-24 66 0l-8 50q-24 16-49 0z" fill="#dce5f5" stroke="#9aa9c7" strokeWidth="3" />
        <path d="M77 181 61 199q-3 5 3 5l20-4m59-19 16 18q3 5-3 5l-20-4" fill="#8c78b6" stroke="#c5b2e8" strokeWidth="3" strokeLinejoin="round" />
        <path d="M88 176q22-12 44 0" fill="none" stroke="#b3bfd5" strokeWidth="3" />
        <circle cx="110" cy="192" r="8" fill="#7d8eac" stroke="#f3f5fa" strokeWidth="2" />
        {/* Astronaut suit and little arms */}
        <path d="M81 126q29-18 58 0l9 45q-6 13-20 10h-37q-14 3-19-10z" fill="var(--suit-color)" stroke="#e4e9f6" strokeWidth="4" />
        <path d="m81 140-18 25q-3 7 5 11l19-21m52-15 18 25q3 7-5 11l-19-21" fill="var(--suit-color)" stroke="#e4e9f6" strokeWidth="4" strokeLinecap="round" />
        <circle cx="126" cy="151" r="8" fill="#ffdc80" stroke="#fff3c7" strokeWidth="2" />
        <path d="m126 145 2 4 5 .5-3.5 3 .8 4.5-4.3-2.2-4.2 2.2.8-4.5-3.5-3 5-.5z" fill="#fff4bf" />
        {/* Helmet */}
        <circle cx="110" cy="92" r="48" fill="#dbe4f4" stroke="#f2f4fb" strokeWidth="5" />
        <circle cx="110" cy="92" r="37" fill="#18233f" stroke="#8999ba" strokeWidth="3" />
        <path d="M85 76q11-16 26-11" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".55" />
        {worried ? (
          <g fill="#fff2db"><circle cx="99" cy="91" r="3.5"/><circle cx="121" cy="91" r="3.5"/><path d="M101 111q9-9 18 0" fill="none" stroke="#fff2db" strokeWidth="3" strokeLinecap="round"/></g>
        ) : (
          <g fill="#fff2db"><circle cx="99" cy="91" r="3.5"/><circle cx="121" cy="91" r="3.5"/><path d="M100 105q10 12 20 0" fill="none" stroke="#fff2db" strokeWidth="3" strokeLinecap="round"/></g>
        )}
      </svg>
    </div>
  );
}

export default PlayerAstronaut;
