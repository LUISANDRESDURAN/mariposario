import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

/**
 * Hook para obtener el detalle de una mariposa por id.
 * @param {string} id - ID de la mariposa
 * @param {object} [mockData] - Datos mock si no hay id
 * @returns { loading, data, error, reload }
 */
export function useMariposaDetail(id, mockData) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMariposa = async () => {
    setLoading(true);
    setError(null);
    try {
      if (id) {
        const docRef = doc(db, 'mariposas', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData({ id: docSnap.id, ...docSnap.data() });
        } else {
          setData(null);
        }
      } else if (mockData) {
        setData(mockData);
      } else {
        setData(null);
      }
    } catch (e) {
      setError(e);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMariposa();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return { data, loading, error, reload: fetchMariposa };
}
