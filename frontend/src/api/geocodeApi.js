// Lightweight geocoding helper using Nominatim (OpenStreetMap)
// Does not modify existing backend; calls external API for coordinates

export async function geocode(location) {
  if (!location) return null;

  try {
    // Prefer backend cached lookup
    const backendUrl = `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/geocode?query=${encodeURIComponent(
      location
    )}`;

    const res = await fetch(backendUrl);
    if (res.ok) {
      const data = await res.json();
      if (data && data.lat && data.lng) return { lat: data.lat, lng: data.lng, display_name: data.display_name };
    }

    // Fallback to direct Nominatim if backend misses or fails
    const nomUrl = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
      location
    )}`;

    const res2 = await fetch(nomUrl, {
      headers: {
        "Accept-Language": "en",
        "User-Agent": "LOFO-App/1.0 (your-email@example.com)"
      }
    });

    if (!res2.ok) return null;

    const data2 = await res2.json();
    if (!data2 || data2.length === 0) return null;
    const first = data2[0];

    return {
      lat: parseFloat(first.lat),
      lng: parseFloat(first.lon),
      display_name: first.display_name
    };
  } catch (err) {
    console.error("Geocode error", err);
    return null;
  }
}
