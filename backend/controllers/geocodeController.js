const fetch = require('node-fetch');
const Geocode = require('../models/Geocode');

// GET /api/geocode?query=...  => returns { lat, lng, display_name }
exports.getGeocode = async (req, res) => {
  try {
    const q = (req.query.query || '').trim();
    if (!q) return res.status(400).json({ message: 'query parameter required' });

    // Try cache
    const cached = await Geocode.findOne({ query: q });
    if (cached) {
      return res.json({ lat: cached.lat, lng: cached.lng, display_name: cached.display_name, source: 'cache' });
    }

    // Call Nominatim
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(q)}`;
    const resp = await fetch(url, {
      headers: {
        'User-Agent': 'LOFO-App/1.0 (backend)'
      }
    });

    if (!resp.ok) return res.status(502).json({ message: 'geocode upstream failure' });

    const data = await resp.json();
    if (!data || data.length === 0) return res.status(404).json({ message: 'no results' });

    const first = data[0];
    const lat = parseFloat(first.lat);
    const lng = parseFloat(first.lon);
    const display_name = first.display_name;

    // Cache result (ignore duplicate key races)
    try {
      await Geocode.create({ query: q, lat, lng, display_name });
    } catch (err) {
      // ignore cache write errors
      console.warn('Geocode cache write ignored', err.message);
    }

    return res.json({ lat, lng, display_name, source: 'nominatim' });
  } catch (err) {
    console.error('getGeocode error', err);
    return res.status(500).json({ message: 'server error' });
  }
};
