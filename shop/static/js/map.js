const href = "https://www.openstreetmap.org/copyright";
const link = `© <a href='${href}'>OpenStreetMap</a>`;
const tiles = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const layer = L.tileLayer(tiles, { attribution: link });

name = document.getElementById('location_name').value
latitude = parseFloat(document.getElementById('latitude').value.replace(",", "."))
long = parseFloat(document.getElementById('long').value.replace(",", "."))

console.log(latitude)
console.log(long)

const map = L.map("map", { layers: [layer], zoom: 20, center: [latitude, long] });

L.marker([latitude, long]).addTo(map)
    .bindPopup("Event")
    .openPopup();

map.fitWorld();