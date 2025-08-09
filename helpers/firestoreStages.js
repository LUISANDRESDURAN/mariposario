// helpers/firestoreStages.js
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

/**
 * Agrega una nueva etapa al array de etapas de una mariposa en Firestore.
 * @param {string} mariposaId - ID del documento de la mariposa
 * @param {object} newStage - Objeto con los datos de la nueva etapa
 * @returns {Promise<void>}
 */
export async function addStageToMariposa(mariposaId, newStage) {
  if (!mariposaId) throw new Error('ID de mariposa no proporcionado');
  const mariposaRef = doc(db, 'mariposas', mariposaId);
  await updateDoc(mariposaRef, {
    etapas: arrayUnion(newStage)
  });
}

/**
 * Elimina una etapa exacta del array de etapas de una mariposa en Firestore.
 * @param {string} mariposaId - ID del documento de la mariposa
 * @param {object} stageToDelete - Objeto de la etapa a eliminar (debe ser igual al guardado)
 * @returns {Promise<void>}
 */
export async function removeStageFromMariposa(mariposaId, stageToDelete) {
  if (!mariposaId) throw new Error('ID de mariposa no proporcionado');
  const mariposaRef = doc(db, 'mariposas', mariposaId);
  await updateDoc(mariposaRef, {
    etapas: arrayRemove(stageToDelete)
  });
}
