import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTheme } from './theme/ThemeContext';
import { db, storage } from '../config/firebaseConfig';
import { collection, addDoc, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import WheelColorPicker from 'react-native-wheel-color-picker';

export default function AddMariposaScreen({ navigation, route }) {
  const { theme } = useTheme();
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [cientifico, setCientifico] = useState('');
  const [descripcion, setDescripcion] = useState('');
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
  // Color picker visual
  const [colorActual, setColorActual] = useState('#FFA500');
  const [coloresArray, setColoresArray] = useState([]);

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
            const colores = Array.isArray(d.colores) ? d.colores : (d.colores ? [d.colores] : []);
            setColoresArray(colores);
            // Seleccionar el primer color guardado si existe
            if (colores.length > 0) {
              setColorActual(colores[0]);
            }
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

  const handleAddColor = () => {
    if (colorActual && !coloresArray.includes(colorActual)) {
      setColoresArray([...coloresArray, colorActual]);
    }
  };

  const handleRemoveColor = (color) => {
    setColoresArray(coloresArray.filter(c => c !== color));
  };

  const handleSubmit = async () => {
    if (!nombre || !cientifico || !descripcion || distribucion.length === 0 || coloresArray.length === 0 || !imagen) {
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
        setColoresArray([]);
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
      <Text style={[styles.label, { color: theme.text }]}>Colores</Text>
      <View style={{ alignItems: 'center', marginBottom: 8 }}>
        <WheelColorPicker
          color={colorActual}
          onColorChange={setColorActual}
          thumbStyle={{ borderColor: theme.primary, borderWidth: 2 }}
          wheelHidden={false}
          style={{ width: 200, height: 200 }}
          useNativeDriver={true}
          sliderHidden={false}
        />
        <TouchableOpacity
          onPress={handleAddColor}
          style={{
            marginTop: 90,
            backgroundColor: 'gray',
            paddingVertical: 10,
            paddingHorizontal: 28,
            borderRadius: 24,
            borderWidth: 1,
            borderColor: 'gray',
            alignItems: 'center',
            flexDirection: 'row',
            gap: 8
          }}
        >
          <View style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: colorActual, borderWidth: 1, borderColor: theme.text, marginRight: 8 }} />
          <Text style={{ color: theme.buttonText || '#fff', fontWeight: 'bold', fontSize: 16 }}>Agregar color</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
          {coloresArray.map((color, idx) => (
            <TouchableOpacity key={color+idx} onPress={() => handleRemoveColor(color)} style={{ margin: 4 }}>
              <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: color, borderWidth: 2, borderColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#000', fontSize: 12 }}>✕</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={{ color: theme.subtext, fontSize: 12, marginTop: 4 }}>Toca un color para eliminarlo</Text>
      </View>
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
