import { isAllowedNickname } from "./nickname";

const STORAGE_KEY = "mission-control-scores";
const MAX_SCORES = 20;

// Optional adapter contract: saveScore, getTopScores, clearMyScores.
// Configure a Firebase-backed adapter later without changing UI callers.
let sharedAdapter = null;

export function configureScoreboardAdapter(adapter) {
  sharedAdapter = adapter || null;
}

function safeRecord(record) {
  if (!record || typeof record !== "object") return null;
  const name = String(record.name || "").trim().slice(0, 12);
  if (!isAllowedNickname(name)) return null;
  return {
    id: String(record.id || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
    name,
    planet: record.planet === "Mars" ? "Mars" : "Moon",
    score: Math.max(0, Math.round(Number(record.score) || 0)),
    days: Math.max(0, Math.min(10, Math.round(Number(record.days) || 0))),
    stars: Math.max(0, Math.min(3, Math.round(Number(record.stars) || 0))),
    color: /^#[0-9a-f]{6}$/i.test(record.color) ? record.color : "#58cabb",
    createdAt: Number(record.createdAt) || Date.now()
  };
}

function sortScores(scores) {
  return scores.sort((a, b) => b.score - a.score || b.stars - a.stars || b.days - a.days || a.createdAt - b.createdAt);
}

function readLocalScores() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? sortScores(parsed.map(safeRecord).filter(Boolean)).slice(0, MAX_SCORES) : [];
  } catch {
    return [];
  }
}

function writeLocalScores(scores) {
  const topScores = sortScores(scores.map(safeRecord).filter(Boolean)).slice(0, MAX_SCORES);
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(topScores));
  } catch {
    // Keep the current session usable when browser storage is unavailable.
  }
  return topScores;
}

export async function saveScore({ name, planet, score, days, stars, color }) {
  const record = safeRecord({ name, planet, score, days, stars, color, createdAt: Date.now() });
  if (!record) return null;
  const localRecord = writeLocalScores([record, ...readLocalScores()]).find((item) => item.id === record.id) || record;
  if (sharedAdapter) {
    try {
      const sharedRecord = safeRecord(await sharedAdapter.saveScore(record));
      return sharedRecord || localRecord;
    } catch {
      // Fall back quietly if the shared store is offline or misconfigured.
    }
  }
  return localRecord;
}

export async function getTopScores(limit = 20) {
  const count = Math.max(0, Math.min(MAX_SCORES, Math.floor(Number(limit) || MAX_SCORES)));
  if (sharedAdapter) {
    try {
      const scores = await sharedAdapter.getTopScores(count);
      if (Array.isArray(scores)) return sortScores(scores.map(safeRecord).filter(Boolean)).slice(0, count);
    } catch {
      // Fall back quietly to this browser's saved scores.
    }
  }
  return readLocalScores().slice(0, count);
}

export async function clearMyScores() {
  if (sharedAdapter) {
    try {
      await sharedAdapter.clearMyScores();
    } catch {
      // Also clear the local copy if the shared store cannot be reached.
    }
  }
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Clearing local data can fail in restricted browser modes.
  }
}

