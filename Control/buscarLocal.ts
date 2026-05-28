import { getDocs } from "firebase/firestore";
import { locaisRef } from "./locaisService";
import * as L from 'leaflet';

export async function listarLocaisNoMapa() {
  const querySnapshot = await getDocs(locaisRef);
  let Locais: any[] = [];
  
  querySnapshot.forEach((doc) => {
    const local = doc.data();
    const LatLng: L.LatLngTuple = [local.LatLong.latitude,local.LatLong.longitude];
    const {LatLong, ...novo_local} = local;
    Locais.push({LatLong: LatLng,...novo_local});
  });
  return Locais;
}