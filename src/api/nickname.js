const BLOCKED_WORDS = ["asshole", "bastard", "bitch", "cunt", "dick", "fuck", "piss", "shit"];

export function isAllowedNickname(value) {
  const name = String(value || "").trim();
  if (!name || [...name].length > 12) return false;
  return !BLOCKED_WORDS.some((word) => new RegExp(`(^|[^\\p{L}])${word}([^\\p{L}]|$)`, "iu").test(name));
}
