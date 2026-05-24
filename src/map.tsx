import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import * as L from 'leaflet';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export function MapaColeta() {
  const posicaoInicial:L.LatLngTuple = [-23.55052, -46.633308]; 

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <MapContainer 
        center={posicaoInicial} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[-23.55552, -46.638308]}>
          <Popup>
            <strong>Ponto de Coleta Tampinhas</strong> <br />
            Rua Exemplo, 123 - Aberto de Seg a Sex.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}