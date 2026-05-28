import { GeoPoint } from "firebase/firestore";

export interface Local {
  id?: string;        
  name: string;
  endereco: string;
  LatLong: GeoPoint;  
  horario: string;
  obs?: string;       
}