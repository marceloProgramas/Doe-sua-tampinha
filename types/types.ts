import * as L from 'leaflet';

export interface Local {
  nome:  string,
  endereco: string,
  LatLong: L.LatLngTuple,
  horario: string,
  key: string,
  obs?: string
}
