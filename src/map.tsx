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
      name: "Instituto Guerreiros do Norte Thaienny Mily Casa de Apoio as Crianças com Cancer",
      endereco: "R. São Félix do Piauí, n213 - Vila Carmosina, São Paulo - SP,",
      LatLong: [-23.5489086, -46.4529659],
      key: 1,
      horario:'todos os dias'
    },
    {
      name: "local test",
      endereco: "R. Sabbado D'Ângelo, 1275 - Itaquera, São Paulo - SP",
      LatLong: [-23.5447937, -46.4458657],
      key: 2,
      horario:'todos os dias'
    },
    {
      name: "local test 2",
      endereco: "R. Sabbado D'Ângelo, 1275 - Itaquera, São Paulo - SP",
      LatLong: [-23.5450117, -46.4588806],
      key: 3,
      horario:'todos os dias'
    }
  ];
  const [minhaPosicao, setMinhaPosicao] = useState<Local | null>(null);

  useEffect(() => {
    async function carregarLocalizacaoAtual() {
      try {
        const coordenadas = await getLocale();
        setMinhaPosicao({
          name:  "string",
          endereco: "string",
          LatLong: coordenadas,
          horario: "string",
          key: 0,
        });
        CompararDis(coordenadas)
      }catch (erro) {
        setMinhaPosicao({
          name:  "string",
          endereco: "string",
          LatLong: [-23.55052, -46.633308],
          horario: "string",
          key: 0,
        }); 
      }
    }

    function CompararDis(posicao:L.LatLngTuple){
      let distMin:number = 100;
      let Prox: Local | undefined = undefined;
      for(let Local of Locais){
        let distancia:number = Math.sqrt((posicao[0]-Local.LatLong[0])**2 + (posicao[1]-Local.LatLong[1])**2);
        if(distMin> distancia){
          distMin = distancia;
          Prox = Local;
        }
      }
      if(Prox){
        setMinhaPosicao(Prox);
      }
    }

    carregarLocalizacaoAtual();
  }, []);

  if (!minhaPosicao) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Carregando mapa com sua localização...</div>;
  } 

  return (
    <div style={{ height: '500px', width: '70%' }}>
      
      <MapContainer 
      center={minhaPosicao.LatLong} 
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
              {Res.endereco} - {Res.horario}.<br/>
              saiba como chegar: 
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${Res.LatLong[0]},${Res.LatLong[1]}`} target='_blank'>clique aqui</a>
            </Popup>
          </Marker>
          )})}
      </MapContainer>
      <p>local mais proximo: {minhaPosicao.name}</p>
    </div>
  );
}