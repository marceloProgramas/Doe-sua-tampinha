import { collection, addDoc } from "firebase/firestore";
import type { DocumentData, QueryDocumentSnapshot, FirestoreDataConverter } from "firebase/firestore";
import { db } from "./firebase";
import type { Local } from "../types/types";

const locaisConverter: FirestoreDataConverter<Local> = {
  toFirestore(local: Local): DocumentData {
    return {
      name: local.name,
      endereco: local.endereco,
      LatLong: local.LatLong,
      horario: local.horario,
      ...(local.obs && { obs: local.obs })
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Local {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      name: data.name,
      endereco: data.endereco,
      LatLong: data.LatLong,
      horario: data.horario,
      obs: data.obs
    };
  }
};

export const locaisRef = collection(db, "locais").withConverter(locaisConverter);

export async function salvarNoBanco(novoLocal: Local) {
  try {
    const docRef = await addDoc(locaisRef, novoLocal);
    console.log("Conectado e salvo com sucesso! ID:", docRef.id);
    return docRef.id;
  } catch (erro) {
    console.error("Erro ao conectar ou salvar no Firebase:", erro);
  }
}