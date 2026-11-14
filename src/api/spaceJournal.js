const JOURNAL_KEY = "mission-control-space-journal";

export function readJournal() {
  try {
    const stored = JSON.parse(window.localStorage.getItem(JOURNAL_KEY) || "[]");
    return Array.isArray(stored) ? stored.filter((id) => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export function saveJournalFactIds(ids) {
  try {
    window.localStorage.setItem(JOURNAL_KEY, JSON.stringify([...new Set(ids)]));
  } catch {
    // Journal still works for this visit if browser storage is unavailable.
  }
}
