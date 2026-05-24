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
  const Locais: L.LatLngTuple[] = [
    [-23.55052, -46.633308],  
    [-23.5597000098, -46.6487628251]  
  ];
  const posicaoInicial: L.LatLngTuple = [-23.55052, -46.633308];

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
        {Locais.map((Res )=>{
          return (
          <Marker position={Res}>
            <Popup>
              <strong>Ponto de Coleta Tampinhas</strong> <br />
              Rua Exemplo, 123 - Aberto de Seg a Sex.
            </Popup>
          </Marker>
          )})}
      </MapContainer>
    </div>
  );
}