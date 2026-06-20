const mongoose = require('mongoose');

const GeocodeSchema = new mongoose.Schema({
  query: { type: String, required: true, unique: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  display_name: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Geocode', GeocodeSchema);
