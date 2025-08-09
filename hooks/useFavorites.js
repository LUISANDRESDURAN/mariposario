import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

/**
 * Hook para obtener los favoritos de un usuario en tiempo real.
 * @param {string} userId
 * @param {boolean} enabled - Si debe escuchar o no
 * @returns {array} favorites
 */
export function useFavorites(userId, enabled) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!userId || !enabled) return;
    const favRef = collection(db, 'users', userId, 'favorites');
    const unsubscribe = onSnapshot(favRef, (snapshot) => {
      setFavorites(snapshot.docs.map(doc => doc.id));
    });
    return unsubscribe;
  }, [userId, enabled]);

  return favorites;
}
