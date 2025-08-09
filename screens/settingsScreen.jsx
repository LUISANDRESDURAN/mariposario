// screens/SettingsScreen.js
import React, { useState, useContext } from 'react';
import { StyleSheet, Text, Platform, StatusBar, View, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext, useTheme } from './theme/ThemeContext';
import { getAuth, updateProfile } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export default function SettingsScreen() {
  const { user, setUser } = useContext(AuthContext);
  const { theme } = useTheme();

  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || null);
  const [loading, setLoading] = useState(false);
  const [career, setCareer] = useState(user?.career || '');
  const [username, setUsername] = useState(user?.username || '');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled && result.assets && result.assets[0].uri) {
      setPhotoURL(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const auth = getAuth();
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });
      // Guardar datos adicionales en Firestore
      if (user?.uid) {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
          name: displayName,
          username,
          career,
        });
      }
      // Actualizar el usuario en contexto
      setUser({ ...auth.currentUser, displayName, photoURL, career, username });
      Alert.alert('Perfil actualizado', 'Tus datos han sido guardados.');
    } catch (e) {
      Alert.alert('Error', 'No se pudo actualizar el perfil.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      <Text style={[styles.title, { color: theme.text }]}>Editar Perfil</Text>
      <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
        {photoURL ? (
          <Image source={{ uri: photoURL }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatarPlaceholder, { backgroundColor: theme.border }]}> 
            <Text style={{ fontSize: 32, color: theme.subtext }}>+</Text>
          </View>
        )}
        <Text style={[styles.avatarText, { color: theme.text }]}>Cambiar foto</Text>
      </TouchableOpacity>
      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: theme.text }]}>Nombre</Text>
        <TextInput
          style={[styles.input, { color: theme.text, backgroundColor: theme.input, borderColor: theme.border }]}
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Nombre"
          placeholderTextColor={theme.subtext}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: theme.text }]}>Usuario</Text>
        <TextInput
          style={[styles.input, { color: theme.text, backgroundColor: theme.input, borderColor: theme.border }]}
          value={username}
          onChangeText={setUsername}
          placeholder="Usuario"
          placeholderTextColor={theme.subtext}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: theme.text }]}>Carrera</Text>
        <TextInput
          style={[styles.input, { color: theme.text, backgroundColor: theme.input, borderColor: theme.border }]}
          value={career}
          onChangeText={setCareer}
          placeholder="Carrera"
          placeholderTextColor={theme.subtext}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: theme.text }]}>Email</Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.disabled, color: theme.subtext, borderColor: theme.border }]}
          value={user?.email || ''}
          editable={false}
          placeholder="Email"
          placeholderTextColor={theme.subtext}
        />
      </View>
      <TouchableOpacity 
      style={[styles.button, { backgroundColor: theme.subtext }]}
      onPress={handleSave} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : 
        <Text 
        style={[theme.background, {color: theme.header, fontWeight: 'bold'}]}>
        Guardar cambios</Text>}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggle: {
    marginTop: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  avatarContainer: { alignItems: 'center', marginBottom: 24 },
  avatar: { width: 90, height: 90, borderRadius: 45, marginBottom: 8 },
  avatarPlaceholder: { width: 90, height: 90, borderRadius: 45, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  avatarText: { fontSize: 14 },
  formGroup: { marginBottom: 18 },
  label: { fontSize: 16, marginBottom: 6 },
});