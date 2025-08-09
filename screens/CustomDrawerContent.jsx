import { View, Text, Switch, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useTheme } from "./theme/ThemeContext";
import { useContext } from "react";
import { AuthContext } from "./theme/ThemeContext";
import { getAuth, signOut } from "firebase/auth";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function CustomDrawerContent({ navigation }) {
  const { theme, isDark, setIsDark } = useTheme();
  const { user } = useContext(AuthContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View
        style={[
          styles.header,
          { backgroundColor: theme.header, borderBottomColor: theme.border },
        ]}
      >
        <View style={styles.avatar}>
          {user && user.photoURL ? (
            <Image
              source={{ uri: user.photoURL }}
              style={{ width: 80, height: 80, borderRadius: 40 }}
            />
          ) : (
            <Ionicons name="person-circle" size={70} color={theme.text} />
          )}
        </View>
        <Text style={[styles.name, { color: theme.text }]}>
          {user ? user.displayName || user.email : "Invitado"}
        </Text>
        <Text style={[styles.email, { color: theme.subtext }]}>
          {user ? user.email : ""}
        </Text>
      </View>
      <DrawerContentScrollView>
        <DrawerItem
          label="Mariposas"
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name={
                navigation.getState &&
                navigation.getState().routes[navigation.getState().index]
                  .name === "Mariposas"
                  ? "butterfly"
                  : "butterfly-outline"
              }
              size={size}
              color={theme.text}
            />
          )}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: "Mariposas" }],
            });
          }}
          labelStyle={{ color: theme.text }}
        />
        <DrawerItem
          label="Agregar Mariposa"
          icon={({ color, size }) => (
            <Ionicons
              name="add-circle-outline"
              size={size}
              color={theme.text}
            />
          )}
          onPress={() => navigation.navigate("AddMariposaScreen")}
          labelStyle={{ color: theme.text }}
        />
        {user && (
          <DrawerItem
            label="Configuración"
            icon={({ color, size }) => (
              <Ionicons
                name={
                  navigation.getState &&
                  navigation.getState().routes[navigation.getState().index]
                    .name === "Configuración"
                    ? "settings"
                    : "settings-outline"
                }
                size={size}
                color={theme.text}
              />
            )}
            onPress={() => navigation.navigate("Configuración")}
            labelStyle={{ color: theme.text }}
          />
        )}
        <View style={styles.toggleRow}>
          <Text style={[styles.toggleLabel, { color: theme.text }]}>
            Modo Oscuro
          </Text>
          <Switch value={isDark} onValueChange={setIsDark} />
        </View>
        <View style={[styles.divider, { backgroundColor: theme.border }]} />
        {user && (
          <DrawerItem
            label="Cerrar sesión"
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="logout" size={size} color="#d00" />
            )}
            onPress={async () => {
              const auth = getAuth();
              await signOut(auth);
            }}
            labelStyle={{ color: "#d00" }}
          />
        )}
        {!user && (
          <DrawerItem
            label="Iniciar sesión"
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="login" size={size} color="#d00" />
            )}
            onPress={() => navigation.navigate("LoginScreen")}
            labelStyle={{ color: "#d00" }}
          />
        )}
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 32,
    alignItems: "center",
    borderBottomWidth: 1,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  name: { fontSize: 20, fontWeight: "700", marginBottom: 2 },
  email: { fontSize: 14, marginBottom: 6 },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 8,
  },
  toggleLabel: { fontSize: 16 },
  divider: { height: 1, marginVertical: 8, borderRadius: 1 },
});
