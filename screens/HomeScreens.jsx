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
      {loading ? null : <CardList data={filteredMariposas} />}
    </SafeAreaView>
  );
}
