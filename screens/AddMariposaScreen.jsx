import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTheme } from './theme/ThemeContext';
import { db, storage } from '../config/firebaseConfig';
import { collection, addDoc, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function AddMariposaScreen({ navigation, route }) {
  const { theme } = useTheme();
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [cientifico, setCientifico] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [colores, setColores] = useState('');
  const [imagen, setImagen] = useState('');
  const [uploading, setUploading] = useState(false);
  const [distribucion, setDistribucion] = useState([]); // Multi-select
  const [dieta, setDieta] = useState(''); // Opcional
  const [editId, setEditId] = useState(route?.params?.id || null); // NUEVO: id de edición
  // Opciones de distribución (puedes ajustar según tus necesidades)
  const opcionesDistribucion = [
    'América del Norte',
    'Centroamérica',
    'Sudamérica',
    'Europa',
    'África',
    'Asia',
    'Oceanía',
  ];
  // Puedes agregar más campos según lo necesites

  // Selección de imagen
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });
    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  // Si hay id, cargar la data de la mariposa y llenar el formulario
  useEffect(() => {
    const fetchMariposa = async () => {
      if (editId) {
        try {
          const docRef = doc(db, 'mariposas', editId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const d = docSnap.data();
            setNombre(d.nombre || '');
            setCientifico(d.cientifico || '');
            setDescripcion(d.descripcion || '');
            setColores(Array.isArray(d.colores) ? d.colores.join(', ') : (d.colores || ''));
            setImagen(d.imagen || '');
            setDistribucion(Array.isArray(d.distribucion) ? d.distribucion : []);
            setDieta(d.dieta || '');
          }
        } catch (e) {
          alert('Error al cargar la mariposa: ' + e.message);
        }
      }
    };
    fetchMariposa();
  }, [editId]);

  const handleSubmit = async () => {
    if (!nombre || !cientifico || !descripcion || distribucion.length === 0 || !colores || !imagen) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }
    setUploading(true);
    let imageUrl = '';
    try {
      // Subir imagen si hay una local
      if (imagen && imagen.startsWith('file')) {
        const response = await fetch(imagen);
        const blob = await response.blob();
        const filename = `${Date.now()}_${nombre.replace(/\s+/g, '_')}.jpg`;
        const storageRef = ref(storage, `mariposas/${filename}`);
        await uploadBytes(storageRef, blob);
        imageUrl = await getDownloadURL(storageRef);
      } else {
        imageUrl = imagen; // Si es un link externo
      }
      const coloresArray = colores.split(',').map(c => c.trim()).filter(Boolean);
      const nuevaMariposa = {
        nombre,
        cientifico,
        descripcion,
        distribucion,
        dieta,
        colores: coloresArray,
        imagen: imageUrl,
        updatedAt: new Date()
      };
      if (editId) {
        // Editar mariposa existente
        const docRef = doc(db, 'mariposas', editId);
        await updateDoc(docRef, nuevaMariposa);
        alert('¡Mariposa actualizada exitosamente!');
      } else {
        // Crear nueva mariposa
        nuevaMariposa.createdAt = new Date();
        await addDoc(collection(db, 'mariposas'), nuevaMariposa);
        alert('¡Mariposa guardada exitosamente!');
      }
      // ...resetear estados solo si no es edición
      if (!editId) {
        setNombre('');
        setCientifico('');
        setDescripcion('');
        setColores('');
        setImagen('');
        setDistribucion([]);
        setDieta('');
      }
      if (navigation) navigation.goBack();
    } catch (error) {
      alert('Error al guardar: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!editId) return;
    try {
      await deleteDoc(doc(db, 'mariposas', editId));
      alert('Mariposa eliminada exitosamente.');
      if (navigation) navigation.goBack();
    } catch (error) {
      alert('Error al eliminar: ' + error.message);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={{ padding: 20 }}>
      <Text style={[styles.label, { color: theme.text }]}>Nombre común</Text>
      <TextInput
        style={[styles.input, { color: theme.text, borderColor: theme.border }]}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Nombre de la mariposa"
        placeholderTextColor={theme.subtext}
      />
      <Text style={[styles.label, { color: theme.text }]}>Nombre científico</Text>
      <TextInput
        style={[styles.input, { color: theme.text, borderColor: theme.border }]}
        value={cientifico}
        onChangeText={setCientifico}
        placeholder="Nombre científico"
        placeholderTextColor={theme.subtext}
      />
      <Text style={[styles.label, { color: theme.text }]}>Descripción</Text>
      <TextInput
        style={[styles.input, { color: theme.text, borderColor: theme.border }]}
        value={descripcion}
        onChangeText={setDescripcion}
        placeholder="Descripción"
        placeholderTextColor={theme.subtext}
        multiline
      />
      <Text style={[styles.label, { color: theme.text }]}>Colores (separados por coma)</Text>
      <TextInput
        style={[styles.input, { color: theme.text, borderColor: theme.border }]}
        value={colores}
        onChangeText={setColores}
        placeholder="#FFA500, #000000"
        placeholderTextColor={theme.subtext}
      />
      <Text style={[styles.label, { color: theme.text }]}>Imagen</Text>
      <View style={{ alignItems: 'center', marginBottom: 16 }}>
        {imagen ? (
          <Image source={{ uri: imagen }} style={{ width: 120, height: 90, borderRadius: 8, marginBottom: 8 }} />
        ) : null}
        <TouchableOpacity onPress={pickImage} style={{ backgroundColor: theme.header, padding: 10, borderRadius: 8 }}>
          <Text style={{ color: theme.text }}>Seleccionar imagen</Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.label, { color: theme.text }]}>Distribución</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 }}>
        {opcionesDistribucion.map((opcion) => (
          <TouchableOpacity
            key={opcion}
            style={{
              backgroundColor: distribucion.includes(opcion) ? theme.primary || '#007AFF' : theme.cardBackground,
              borderColor: theme.border,
              borderWidth: 1,
              borderRadius: 16,
              paddingHorizontal: 12,
              paddingVertical: 6,
              margin: 4,
            }}
            onPress={() => {
              setDistribucion((prev) =>
                prev.includes(opcion)
                  ? prev.filter((d) => d !== opcion)
                  : [...prev, opcion]
              );
            }}
          >
            <Text style={{ color: distribucion.includes(opcion) ? '#fff' : theme.text }}>{opcion}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={[styles.label, { color: theme.text }]}>Dieta (opcional)</Text>
      <TextInput
        style={[styles.input, { color: theme.text, borderColor: theme.border }]}
        value={dieta}
        onChangeText={setDieta}
        placeholder="Ej: Néctar de flores, hojas de asclepia"
        placeholderTextColor={theme.subtext}
      />
      {uploading ? (
        <ActivityIndicator size="large" color={theme.primary || '#007AFF'} style={{ marginBottom: 16 }} />
      ) : null}
      {/* Aquí puedes agregar más campos para etapas, lifespan, etc. */}
      <Button title="Guardar Mariposa" onPress={handleSubmit} color={theme.primary || '#007AFF'} />
      {editId && (
        <View style={{ marginTop: 12 }}>
          <Button
            title="Eliminar Mariposa"
            color="#d00"
            onPress={handleDelete}
          />
        </View>
      )}
      <View style={{ height: 40 }}> 
        {/* Margen extra para evitar solapamiento con botones del sistema */}
        <Text style={{ color: theme.text }}></Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  label: { fontSize: 16, marginTop: 16, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 8,
  },
});
