import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import * as L from 'leaflet';
import {getLocale} from '../Control/locale.ts';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

interface Local {
  name:  string,
  endereco: string,
  LatLong: L.LatLngTuple,
  horario: string,
  obs?: string
}

getLocale().then(()=>{
  
})

export function MapaColeta() {
  const Locais: Local[] = [
    {
      name: "casa",
      endereco: "lugar",
      LatLong: [-23.55052, -46.633308],
      horario:'sei lá'
    },  
    {
      name: "casa",
      endereco: "lugar",
      LatLong: [-23.5597000098, -46.6487628251],
      horario:'sei lá'
    },  
    {
      name: "casa",
      endereco: "lugar",
      LatLong: [-22.5597000098, -45.6487628251],
      horario:'sim'
    }
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
        {Locais.map((Res)=>{
          return (
          <Marker position={Res.LatLong}>
            <Popup>
              <strong>{Res.name}</strong> <br />
              {Res.endereco} - {Res.horario}.
            </Popup>
          </Marker>
          )})}
      </MapContainer>
    </div>
  );
}