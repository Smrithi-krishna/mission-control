// Small cartoon astronaut. Mood: "happy" | "worried". Size: "md" | "sm".

function Astronaut({ mood = "happy", message, size = "md" }) {
  const isWorried = mood === "worried";

  return (
    <div
      className={`astronaut${isWorried ? " astronaut--worried" : ""}${size === "sm" ? " astronaut--sm" : ""}`}
    >
      <svg
        className="astronaut__figure"
        viewBox="0 0 120 140"
        role="img"
        aria-label={isWorried ? "Worried astronaut" : "Happy astronaut"}
      >
        <ellipse cx="60" cy="128" rx="26" ry="5" fill="#0b1026" opacity="0.45" />
        <rect x="40" y="74" width="40" height="44" rx="10" fill="#e8e6e1" />
        <rect x="48" y="82" width="24" height="18" rx="4" fill="#4fd1c5" />
        <rect x="20" y="80" width="18" height="10" rx="4" fill="#c4bdb3" />
        <rect x="82" y="80" width="18" height="10" rx="4" fill="#c4bdb3" />
        <circle cx="60" cy="48" r="30" fill="#c4bdb3" stroke="#9aa0b0" strokeWidth="2" />
        <circle cx="60" cy="48" r="22" fill="#151b36" />
        <ellipse cx="50" cy="40" rx="7" ry="10" fill="#4fd1c5" opacity="0.25" />
        {isWorried ? (
          <>
            <circle cx="51" cy="48" r="2.5" fill="#e8e6e1" />
            <circle cx="69" cy="48" r="2.5" fill="#e8e6e1" />
            <path
              d="M51 60 Q60 54 69 60"
              fill="none"
              stroke="#e8e6e1"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </>
        ) : (
          <>
            <circle cx="51" cy="46" r="2.5" fill="#e8e6e1" />
            <circle cx="69" cy="46" r="2.5" fill="#e8e6e1" />
            <path
              d="M51 56 Q60 64 69 56"
              fill="none"
              stroke="#e8e6e1"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </>
        )}
      </svg>
      {message ? <p className="astronaut__bubble">{message}</p> : null}
    </div>
  );
}

export default Astronaut;
