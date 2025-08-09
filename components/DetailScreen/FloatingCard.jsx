// Componente FloatingCard para el nombre, científico y favorito
import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../../screens/theme/ThemeContext";
import { db } from "../../config/firebaseConfig";
import { doc, setDoc, deleteDoc } from "firebase/firestore";

export default function FloatingCard({
  nombre,
  cientifico,
  favorite,
  onToggleFavorite,
  theme,
  styles,
  mariposaId,
}) {
  const { user } = useContext(AuthContext);

  const handleToggleFavorite = async () => {
    if (!user) return;
    const favRef = doc(db, "users", user.uid, "favorites", mariposaId);
    try {
      if (favorite) {
        await deleteDoc(favRef);
      } else {
        await setDoc(favRef, { createdAt: new Date() });
      }
      if (onToggleFavorite) onToggleFavorite();
    } catch (e) {
      alert("Error al actualizar favorito");
    }
  };

  return (
    <View
      style={[
        styles.floatingCard,
        {
          backgroundColor: theme.cardBackground + "CC",
          shadowColor: theme.text,
        },
      ]}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={[
            styles.name,
            {
              color: theme.text,
              textAlign: "left",
              fontSize: 26,
              fontWeight: "bold",
              marginBottom: 2,
            },
          ]}
          numberOfLines={1}
        >
          {nombre}
        </Text>
        <Text
          style={[
            styles.scientifico,
            { color: theme.subtext, fontStyle: "italic", fontSize: 15 },
          ]}
          numberOfLines={1}
        >
          {cientifico}
        </Text>
      </View>
      {user && (
        <TouchableOpacity
          onPress={handleToggleFavorite}
          style={styles.favoriteCircle}
          disabled={!user}
        >
          <Icon
            name={favorite ? "star" : "star-outline"}
            size={26}
            color={favorite ? "#FFD700" : theme.subtext}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
