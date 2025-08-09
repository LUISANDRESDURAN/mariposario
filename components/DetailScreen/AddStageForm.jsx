// Componente AddStageForm para agregar una nueva etapa
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function AddStageForm({
  newStage,
  setNewStage,
  setShowAddStageForm,
  onSave,
  theme,
  styles
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

  return (
    <View style={[styles.section, { backgroundColor: theme.cardBackground, marginTop: 12 }]}> 
      <Text style={{ color: theme.text, fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>Nueva etapa</Text>
      <TextInput
        style={[styles.input, { color: theme.text, borderColor: theme.border }]}
        placeholder="Nombre de la etapa"
        placeholderTextColor={theme.subtext}
        value={newStage.nombreEtapa}
        onChangeText={t => setNewStage(s => ({ ...s, nombreEtapa: t }))}
      />
      <TextInput
        style={[styles.input, { color: theme.text, borderColor: theme.border }]}
        placeholder="Descripción de la etapa"
        placeholderTextColor={theme.subtext}
        value={newStage.descripcionEtapa}
        onChangeText={t => setNewStage(s => ({ ...s, descripcionEtapa: t }))}
        multiline
      />
      <TextInput
        style={[styles.input, { color: theme.text, borderColor: theme.border }]}
        placeholder="Duración (ej: 3-5 días)"
        placeholderTextColor={theme.subtext}
        value={newStage.duracion}
        onChangeText={t => setNewStage(s => ({ ...s, duracion: t }))}
      />
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
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 12 }}>
        <TouchableOpacity onPress={() => setShowAddStageForm(false)} style={{ marginRight: 16 }}>
          <Text style={{ color: theme.subtext }}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSave}>
          <Text style={{ color: theme.primary || '#007AFF', fontWeight: 'bold' }}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
