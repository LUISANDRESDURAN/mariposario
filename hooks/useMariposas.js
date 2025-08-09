import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

/**
 * Hook para obtener la lista de mariposas en tiempo real.
 * @returns {{ mariposas: array, loading: boolean }}
 */
export function useMariposas() {
  const [mariposas, setMariposas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'mariposas'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMariposas(data);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { mariposas, loading };
}
