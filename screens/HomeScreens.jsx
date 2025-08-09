import { AuthContext } from "./theme/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useState, useMemo } from "react";
import { useFavorites } from "../hooks/useFavorites";
import { useMariposas } from "../hooks/useMariposas";
import { useTheme } from "./theme/ThemeContext";
import {
  CardList,
  FilterTabs,
  Header,
  SearchBars
} from '../components';
import { Text } from "react-native";

export default function HomeScreen() {
  const { theme } = useTheme();
  const { user } = useContext(AuthContext);
  const [filter, setFilter] = useState("all"); // 'all' o 'favorites'

  // Usar hooks personalizados
  const { mariposas, loading } = useMariposas();
  const favorites = useFavorites(user?.uid, filter === "favorites");

  const filteredMariposas = useMemo(
    () =>
      filter === "favorites"
        ? mariposas.filter((m) => favorites.includes(m.id))
        : mariposas,
    [filter, mariposas, favorites]
  );

  return (
    <SafeAreaView
      style={[
        { backgroundColor: theme.background },
        // Platform.OS === 'android' &&
        // { paddingTop: StatusBar.currentHeight }
      ]}
      edges={["top", "bottom"]}
    >
      <Header />
      <FilterTabs
        filter={filter}
        setFilter={setFilter}
        user={user}
        theme={theme}
      />
      <SearchBars />
      {filter === "favorites" && !user ? (
        <Text style={{ color: theme.text, textAlign: 'center', marginTop: 32, fontSize: 16, fontWeight: '500' }}>
          Debes iniciar sesión para marcar y ver tus mariposas favoritas.
        </Text>
      ) : loading ? null : (
        <CardList data={filteredMariposas} />
      )}
    </SafeAreaView>
  );
}
