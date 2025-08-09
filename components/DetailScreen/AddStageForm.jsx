// Componente AddStageForm para agregar una nueva etapa
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';

export default function AddStageForm({
  newStage,
  setNewStage,
  setShowAddStageForm,
  onSave,
  theme,
  styles,
  isEditMode,
  etapasExistentes = [] // NUEVO: recibe las etapas ya existentes
}) {
  // Manejo de imagen local (solo uri)
  const handleImagePick = async () => {
    // Pide permisos si es necesario
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permiso para acceder a la galería es necesario.');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setNewStage(s => ({ ...s, imagen: result.assets[0].uri }));
    }
  };

  // Validación de campos obligatorios
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!newStage.nombreEtapa) newErrors.nombreEtapa = 'Este campo es obligatorio';
    if (!newStage.descripcionEtapa) newErrors.descripcionEtapa = 'Este campo es obligatorio';
    if (!newStage.duracion) newErrors.duracion = 'Este campo es obligatorio';
    if (!newStage.imagen) newErrors.imagen = 'La imagen es obligatoria';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onSave();
    }
  };

  // Opciones posibles
  const opcionesEtapas = [
    { label: 'Huevo', value: 'huevo' },
    { label: 'Larva', value: 'larva' },
    { label: 'Crisálida', value: 'crisálida' },
    { label: 'Mariposa', value: 'mariposa' },
  ];
  // Filtrar opciones para que no se repitan, excepto si estamos editando esa misma etapa
  const opcionesFiltradas = opcionesEtapas.filter(opt => {
    if (isEditMode && newStage.nombreEtapa === opt.value) return true;
    return !etapasExistentes.includes(opt.value);
  });

  return (
    <View style={[styles.section, { backgroundColor: theme.cardBackground, marginTop: 12, borderColor: isEditMode ? theme.primary : theme.border, borderWidth: isEditMode ? 2 : 1 }]}> 
      <Text style={{ color: theme.text, fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>
        {isEditMode ? 'Editar etapa' : 'Nueva etapa'}
      </Text>
      {/* Si está en modo edición, muestra un aviso visual */}
      {isEditMode && (
        <Text style={{ color: theme.primary || '#007AFF', marginBottom: 8, fontWeight: 'bold' }}>
          Estás editando una etapa existente
        </Text>
      )}
      {/* Dropdown para nombre de etapa */}
      <View style={{ marginBottom: 12 }}>
        <Text style={{ color: theme.text, marginBottom: 4 }}>Nombre de la etapa</Text>
        <View style={{ borderWidth: 1, borderColor: theme.border, borderRadius: 8, overflow: 'hidden' }}>
          <Picker
            selectedValue={newStage.nombreEtapa}
            onValueChange={t => { setNewStage(s => ({ ...s, nombreEtapa: t })); setErrors(e => ({ ...e, nombreEtapa: undefined })); }}
            style={{ color: theme.text, backgroundColor: theme.cardBackground }}
            dropdownIconColor={theme.text}
          >
            <Picker.Item label="Selecciona una etapa..." value="" color={theme.subtext} />
            {opcionesFiltradas.map(opt => (
              <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
            ))}
          </Picker>
        </View>
        {errors.nombreEtapa && <Text style={{ color: 'red', marginTop: 2 }}>{errors.nombreEtapa}</Text>}
      </View>
      <TextInput
        style={[styles.input, { color: theme.text, borderColor: theme.border }]}
        placeholder="Descripción de la etapa"
        placeholderTextColor={theme.subtext}
        value={newStage.descripcionEtapa}
        onChangeText={t => { setNewStage(s => ({ ...s, descripcionEtapa: t })); setErrors(e => ({ ...e, descripcionEtapa: undefined })); }}
        multiline
      />
      {errors.descripcionEtapa && <Text style={{ color: 'red', marginBottom: 6 }}>{errors.descripcionEtapa}</Text>}
      <TextInput
        style={[styles.input, { color: theme.text, borderColor: theme.border }]}
        placeholder="Duración (ej: 3-5 días)"
        placeholderTextColor={theme.subtext}
        value={newStage.duracion}
        onChangeText={t => { setNewStage(s => ({ ...s, duracion: t })); setErrors(e => ({ ...e, duracion: undefined })); }}
      />
      {errors.duracion && <Text style={{ color: 'red', marginBottom: 6 }}>{errors.duracion}</Text>}
      <TextInput
        style={[styles.input, { color: theme.text, borderColor: theme.border }]}
        placeholder="Hospedador (opcional)"
        placeholderTextColor={theme.subtext}
        value={newStage.hospedador}
        onChangeText={t => setNewStage(s => ({ ...s, hospedador: t }))}
      />
      {/* Input de imagen */}
      <View style={{ marginBottom: 12 }}>
        <Text style={{ color: theme.text, marginBottom: 4 }}>Imagen de la etapa</Text>
        {newStage.imagen ? (
          <Image source={{ uri: newStage.imagen }} style={{ width: 100, height: 70, borderRadius: 8, marginBottom: 6 }} />
        ) : null}
        <TouchableOpacity onPress={handleImagePick} style={{ backgroundColor: theme.primary || '#007AFF', padding: 8, borderRadius: 8 }}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>{newStage.imagen ? 'Cambiar imagen' : 'Seleccionar imagen'}</Text>
        </TouchableOpacity>
        {errors.imagen && <Text style={{ color: 'red', marginTop: 4 }}>{errors.imagen}</Text>}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 12 }}>
        <TouchableOpacity onPress={() => setShowAddStageForm(false)} style={{ marginRight: 16 }}>
          <Text style={{ color: theme.subtext }}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave}>
          <Text style={{ color: theme.primary || '#007AFF', fontWeight: 'bold' }}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
