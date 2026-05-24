import { useEffect, useState } from 'react';
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
  key: number,
  obs?: string
}

export function MapaColeta() {
  const Locais: Local[] = [
    {
      name: "marco 0",
      endereco: "lugar",
      LatLong: [-23.55052, -46.633308],
      key: 1,
      horario:'sei lá'
    },  
    {
      name: "shopping",
      endereco: "lugar",
      LatLong: [-23.5597000098, -46.6487628251],
      key: 2,
      horario:'sei lá'
    },  
    {
      name: "Instituto Guerreiros do Norte Thaienny Mily Casa de Apoio as Crianças com Cancer",
      endereco: "R. São Félix do Piauí, n213 - Vila Carmosina, São Paulo - SP,",
      LatLong: [-23.5489086, -46.4529659],
      key: 3,
      horario:'todos os dias'
    }
  ];
  const [minhaPosicao, setMinhaPosicao] = useState<L.LatLngTuple | null>(null);

  useEffect(() => {
    async function carregarLocalizacaoAtual() {
      try {
        const coordenadas = await getLocale();
        setMinhaPosicao(coordenadas);
        console.log("Posição obtida com sucesso:", coordenadas);
      }catch (erro) {
        console.error("Erro ao pegar localização, usando padrão. Erro:", erro);
        setMinhaPosicao([-23.55052, -46.633308]); 
      }
    }

    carregarLocalizacaoAtual();
  }, []);

  if (!minhaPosicao) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Carregando mapa com sua localização...</div>;
  } 

  return (
    <div style={{ height: '500px', width: '100%' }}>
      
      <MapContainer 
      center={minhaPosicao} 
      zoom={15} 
      style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {Locais.map((Res)=>{
          return (
          <Marker position={Res.LatLong} key={Res.key}>
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