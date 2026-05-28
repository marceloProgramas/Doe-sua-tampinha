import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import * as L from 'leaflet';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import {getLocale} from '../Control/locale.ts';
import {listarLocaisNoMapa} from "../Control/buscarLocal.ts";

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export interface Local {
  name:  string,
  endereco: string,
  LatLong: L.LatLngTuple,
  horario: string,
  id: string,
  obs?: string
}

export function MapaColeta() {
  const [Locais,setLocais] = useState<Local[]| null>(null);
  const [minhaPosicao, setMinhaPosicao] = useState<Local | null>(null);

  useEffect(() => {
    async function carregarLocalizacaoAtual(Locais: Local[]) {
      try {
        const coordenadas = await getLocale();
        CompararDis(Locais, coordenadas)
      }catch (erro) {
        setMinhaPosicao({
          name:  "string",
          endereco: "string",
          LatLong: [-23.55052, -46.633308],
          horario: "string",
          id: "0",
        }); 
        console.error(erro)
      }
    }

    function CompararDis(Locais:Local[], posicao:L.LatLngTuple){
      let distMin:number = 1000000;
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
    
    listarLocaisNoMapa().then((r)=>{
      setLocais(r);
      carregarLocalizacaoAtual(r);
    });
  }, []);

  if (!minhaPosicao || !Locais) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Carregando mapa com sua localização...</div>;
  } 

  return (
    <div style={{ height: '500px', width: '100%' }}>
      
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
          <Marker position={Res.LatLong} key={Res.id}>
            <Popup>
              <strong>{Res.name}</strong> <br />
              {Res.endereco} - {Res.horario}.<br/>
              saiba como chegar: 
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${Res.LatLong[0]},${Res.LatLong[1]}`} target='_blank'>clique aqui</a>
            </Popup>
          </Marker>
          )})}
      </MapContainer>
    </div>
  );
}