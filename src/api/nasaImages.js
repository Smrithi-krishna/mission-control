// NASA Image and Video Library — no API key required.
// Docs: https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf

const SEARCH_URL = "https://images-api.nasa.gov/search";
const FALLBACK_IMAGE = "/fallback-space.svg";

/**
 * Pick a usable image href from a NASA search response.
 */
function pickImageHref(payload) {
  const items = payload?.collection?.items ?? [];

  for (const item of items) {
    const link = (item.links ?? []).find(
      (entry) => entry.render === "image" || entry.rel === "preview"
    );
    if (link?.href) {
      const info = item.data?.[0] ?? {};
      return {
        url: link.href,
        title: info.title || "NASA image",
        credit: info.photographer || info.center || "NASA"
      };
    }
  }

  return null;
}

/**
 * Fetch one still image for a search query.
 * Always resolves with { url, title, credit, loading, isFallback }.
 */
export async function fetchNasaImage(query) {
  try {
    const params = new URLSearchParams({
      q: query,
      media_type: "image"
    });
    const response = await fetch(`${SEARCH_URL}?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`NASA search failed (${response.status})`);
    }

    const payload = await response.json();
    const picked = pickImageHref(payload);

    if (!picked) {
      throw new Error("No NASA image in search results");
    }

    return { ...picked, isFallback: false };
  } catch (error) {
    console.warn("NASA image lookup failed, using local fallback.", error);
    return {
      url: FALLBACK_IMAGE,
      title: "Soft pastel space scene",
      credit: "Local fallback",
      isFallback: true
    };
  }
}

/**
 * React-friendly helper: start in a loading state, then swap in the photo.
 */
export function createNasaImageState() {
  return {
    url: FALLBACK_IMAGE,
    title: "Loading NASA image…",
    credit: "NASA",
    isFallback: true,
    loading: true
  };
}
