import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme, AuthContext } from './theme/ThemeContext';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../config/firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function LoginScreen({ navigation }) {
  const { theme } = useTheme();
  const { setUser } = React.useContext(AuthContext);
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [career, setCareer] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    if (isRegister) {
      if (!email || !password || !name || !username || !confirmPassword) {
        alert('Por favor completa todos los campos obligatorios');
        return;
      }
      if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(user, { displayName: name });
        // Guardar datos adicionales en Firestore
        await setDoc(doc(db, 'users', user.uid), {
          name,
          username,
          career,
          email,
          createdAt: new Date()
        });
        // Obtener datos extra y setear en contexto
        setUser({ ...user, displayName: name, email, username, career });
        alert('Registro exitoso. ¡Bienvenido!');
        setIsRegister(false);
      } catch (error) {
        alert(error.message);
      }
    } else {
      if (!email || !password) {
        alert('Por favor completa todos los campos');
        return;
      }
      try {
        await signInWithEmailAndPassword(auth, email, password);
        // Obtener datos extra de Firestore
        const user = auth.currentUser;
        let extra = {};
        try {
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            extra = userSnap.data();
          }
        } catch (e) {}
        setUser({ ...user, ...extra });
        alert('Login exitoso');
        navigation.reset({ index: 0, routes: [{ name: 'Mariposas' }] });
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}> 
      <Text style={[styles.title, { color: theme.text }]}> 
        {isRegister ? 'Registro' : 'Iniciar Sesión'}
      </Text>
      {isRegister && (
        <>
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.border }]}
            placeholder="Nombre completo"
            placeholderTextColor={theme.subtext}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.border }]}
            placeholder="Nombre de usuario"
            placeholderTextColor={theme.subtext}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.border }]}
            placeholder="Carrera (opcional)"
            placeholderTextColor={theme.subtext}
            value={career}
            onChangeText={setCareer}
          />
        </>
      )}
      <TextInput
        style={[styles.input, { color: theme.text, borderColor: theme.border }]}
        placeholder="Correo electrónico"
        placeholderTextColor={theme.subtext}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={[styles.input, { color: theme.text, borderColor: theme.border }]}
        placeholder="Contraseña"
        placeholderTextColor={theme.subtext}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {isRegister && (
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: theme.border }]}
          placeholder="Confirmar contraseña"
          placeholderTextColor={theme.subtext}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      )}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.subtext }]}
        onPress={handleSubmit}
        activeOpacity={0.8}
      >
        <Text style={[styles.buttonText, { color: theme.header }]}> 
          {isRegister ? 'Registrarse' : 'Entrar'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
        <Text style={[styles.toggle, { color: theme.text }]}> 
          {isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
        </Text>
      </TouchableOpacity>
    </View>
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
});
