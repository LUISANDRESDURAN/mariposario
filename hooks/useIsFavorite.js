import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

/**
 * Hook para saber si una mariposa es favorita del usuario.
 * @param {string} userId
 * @param {string} mariposaId
 * @returns {[boolean, function]}
 */
export function useIsFavorite(userId, mariposaId) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (!userId || !mariposaId) {
      setFavorite(false);
      return;
    }
    const favRef = doc(db, 'users', userId, 'favorites', mariposaId);
    const unsubscribe = onSnapshot(favRef, (docSnap) => {
      setFavorite(docSnap.exists());
    });
    return unsubscribe;
  }, [userId, mariposaId]);

  return favorite;
}
