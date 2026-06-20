import { useEffect, useRef } from "react";

export default function MapView({ markers = [], height = 300 }) {
  const mapRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!window.L) return;

    // Create map only once
    if (!mapRef.current) {
      mapRef.current = window.L.map(containerRef.current, {
        center: [0, 0],
        zoom: 2,
        scrollWheelZoom: true,
      });

      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);
    }

    // Clear existing markers layer if present
    if (mapRef.current._markersLayer) {
      mapRef.current.removeLayer(mapRef.current._markersLayer);
    }

    const markersLayer = window.L.layerGroup();

    markers.forEach((m) => {
      if (!m || !m.lat || !m.lng) return;

      const color = m.itemType === "found" ? "#22c55e" : "#ef4444";
      const icon = window.L.divIcon({
        html: `
          <div style="display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:${color};box-shadow:0 0 0 4px rgba(255,255,255,0.85),0 10px 18px rgba(15,23,42,0.18);border:2px solid white;">
            <div style="width:10px;height:10px;border-radius:50%;background:white;"></div>
          </div>
        `,
        className: "",
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -30]
      });

      const marker = window.L.marker([m.lat, m.lng], {
        icon
      });

      if (m.title) {
        const popupHtml = `
          <div style="min-width:200px;font-family:Arial,Helvetica,sans-serif;">
            <div style="font-weight:700;margin-bottom:6px;color:#0f172a;">${m.title}</div>
            <div style="font-size:0.9rem;color:#475569;margin-bottom:8px;">${m.date || "No date"}</div>
            <a href="/items/${m.id}" style="display:inline-flex;align-items:center;justify-content:center;padding:8px 12px;border-radius:999px;background:#0f172a;color:white;text-decoration:none;font-size:0.85rem;">View Details</a>
          </div>
        `;
        marker.bindPopup(popupHtml, { closeButton: false, minWidth: 220 });
      }

      marker.addTo(markersLayer);
    });

    markersLayer.addTo(mapRef.current);
    mapRef.current._markersLayer = markersLayer;

    // Fit map to markers if available
    const validMarkers = markers.filter((m) => m && m.lat && m.lng);
    if (validMarkers.length === 1) {
      mapRef.current.setView([validMarkers[0].lat, validMarkers[0].lng], 13);
    } else if (validMarkers.length > 1) {
      const bounds = validMarkers.map((m) => [m.lat, m.lng]);
      mapRef.current.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [markers]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: typeof height === "number" ? `${height}px` : height }}
      className="rounded-2xl overflow-hidden border border-slate-200"
    />
  );
}
