import { useMemo } from 'react';

/**
 * Hook para obtener y ordenar las etapas de una mariposa.
 * @param {array} etapasArrRaw
 * @returns {{ etapasArr: array, mostrarAddStage: boolean, etapasConPlus: array }}
 */
export function useEtapasMariposa(etapasArrRaw) {
  const ordenEtapas = ['mariposa', 'crisálida', 'larva', 'huevo'];
  const etapasArr = useMemo(() => {
    return Array.isArray(etapasArrRaw)
      ? [...etapasArrRaw].sort((a, b) => {
          const idxA = ordenEtapas.indexOf((a.nombreEtapa || '').toLowerCase());
          const idxB = ordenEtapas.indexOf((b.nombreEtapa || '').toLowerCase());
          return idxA - idxB;
        })
      : [];
  }, [etapasArrRaw]);

  const mostrarAddStage = etapasArr.length < 4;
  const etapasConPlus = mostrarAddStage ? [...etapasArr, { add: true }] : etapasArr;

  return { etapasArr, mostrarAddStage, etapasConPlus };
}
