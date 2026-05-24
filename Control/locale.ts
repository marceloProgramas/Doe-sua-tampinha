import * as L from 'leaflet';

export async function getLocale(): Promise<L.LatLngTuple> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocalização não é suportada pelo seu navegador."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const crd = pos.coords;
        resolve([crd.latitude, crd.longitude]);
      },
      (err) => {
        reject(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  });
}