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
      name: "fim do mundo",
      endereco: "lugar",
      LatLong: [-22.5597000098, -45.6487628251],
      key: 3,
      horario:'sim'
    }
  ];
  let minhaPosicao:L.LatLngTuple
  const [minhaPosicao, setMinhaPosicao] = useState<L.LatLngTuple>([-23.55052, -46.633308]);

  useEffect(() => {
    async function carregarLocalizacaoAtual() {
      try {
        const coordenadas = await getLocale();
        setMinhaPosicao(coordenadas);
      } catch (erro) {
        setMinhaPosicao([-23.55052, -46.633308]); 
      }
    }

    async function verificarMaisPerto() {
      await carregarLocalizacaoAtual();
      console.log(minhaPosicao)
      let MaisProximo:Local
      Locais.map((Res)=>{
        console.log(Res.name)
        console.log(Res.LatLong[0]-minhaPosicao[0])
        console.log(Res.LatLong[1]-minhaPosicao[1])
      })
    }
    
    verificarMaisPerto()
    console.log(minhaPosicao)
  }, []);


  return (
    <div style={{ height: '500px', width: '100%' }}>
      <MapContainer 
      center={minhaPosicao} 
      zoom={13} 
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