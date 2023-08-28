import L from "leaflet";

export const MarkerIcon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
});

export const SchoolMarkerIcon = new L.Icon({
  iconSize: [50, 61],
  iconUrl: "/icons8-school-70.png",
  iconRetinaUrl: "/icons8-school-70.png",
});
