import { useCallback } from 'react';
import { addStageToMariposa, removeStageFromMariposa } from '../helpers/firestoreStages';
import { Alert } from 'react-native';

/**
 * Hook para exponer handlers de etapas (guardar y eliminar) con feedback y lógica desacoplada.
 * @param {object} params
 * @param {string} mariposaId
 * @param {array} etapasArr
 * @param {number} stageIndex
 * @param {object} newStage
 * @param {function} setShowAddStageForm
 * @param {function} setNewStage
 * @param {function} setEditingStageIndex
 * @param {function} reload
 * @param {number|null} editingStageIndex
 * @returns {{ handleSaveStage: function, handleDeleteStage: function }}
 */
export function useEtapasActions({
  mariposaId,
  etapasArr,
  stageIndex,
  newStage,
  setShowAddStageForm,
  setNewStage,
  setEditingStageIndex,
  reload,
  editingStageIndex
}) {
  const handleSaveStage = useCallback(async () => {
    try {
      if (editingStageIndex !== null && etapasArr[editingStageIndex]) {
        await removeStageFromMariposa(mariposaId, etapasArr[editingStageIndex]);
        await addStageToMariposa(mariposaId, newStage);
        Alert.alert('Éxito', 'La etapa fue actualizada.');
      } else {
        await addStageToMariposa(mariposaId, newStage);
        Alert.alert('Éxito', 'La nueva etapa fue agregada.');
      }
      setShowAddStageForm(false);
      setNewStage({ nombreEtapa: '', descripcionEtapa: '', duracion: '', hospedador: '' });
      setEditingStageIndex(null);
      reload();
    } catch (err) {
      Alert.alert('Error', 'No se pudo guardar la etapa.');
    }
  }, [editingStageIndex, etapasArr, mariposaId, newStage, reload, setShowAddStageForm, setNewStage, setEditingStageIndex]);

  const handleDeleteStage = useCallback(async () => {
    const etapaAEliminar = etapasArr[stageIndex];
    if (!etapaAEliminar) return;
    Alert.alert(
      'Eliminar etapa',
      '¿Estás seguro de que deseas eliminar esta etapa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar', style: 'destructive', onPress: async () => {
            try {
              await removeStageFromMariposa(mariposaId, etapaAEliminar);
              reload();
              Alert.alert('Éxito', 'La etapa fue eliminada.');
            } catch (err) {
              Alert.alert('Error', 'No se pudo eliminar la etapa.');
            }
          }
        }
      ]
    );
  }, [etapasArr, stageIndex, mariposaId, reload]);

  return { handleSaveStage, handleDeleteStage };
}
