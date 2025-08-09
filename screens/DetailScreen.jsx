import { AuthContext, useTheme } from './theme/ThemeContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useContext, useState, useRef, useMemo } from 'react'
import { useEtapasActions } from '../hooks/useEtapasActions';
import { useEtapasMariposa } from '../hooks/useEtapasMariposa';
import { useIsFavorite } from '../hooks/useIsFavorite';
import { useMariposaDetail } from '../hooks/useMariposaDetail';
import Icon from 'react-native-vector-icons/Ionicons'
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View as RNView,
  View,
} from 'react-native'
import {
  AddStageForm,
  FloatingCard,
  GallerySection,
  ResumenSection,
  StageCarousel,
} from '../components';

import stylesDetail from './theme/detailScreenStyles'; // Importar estilos desde el archivo de estilos

export default function DetailScreen({ route, navigation }) {
  const { theme } = useTheme();
  const { user } = useContext(AuthContext);
  const [stageIndex, setStageIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [showAddStageForm, setShowAddStageForm] = useState(false);
  const [newStage, setNewStage] = useState({ nombreEtapa: '', descripcionEtapa: '', duracion: '', hospedador: '' });
  const [editingStageIndex, setEditingStageIndex] = useState(null); // NUEVO: para saber si estamos editando
  const stageCarouselRef = useRef(null);

  // Hook para cargar datos de mariposa
  const { data, loading, error, reload } = useMariposaDetail(route?.params?.id, typeof mockData !== 'undefined' ? mockData : undefined);
  const favorite = useIsFavorite(user?.uid, route?.params?.id);
  const mainImage = useMemo(() => data?.imagen || null, [data]);
  const imagenesObj = useMemo(() => (
    data && typeof data.imagenes === 'object' && data.imagenes !== null ? data.imagenes : {}
  ), [data]);
  const etapas = useMemo(() => Object.keys(imagenesObj), [imagenesObj]);
  const etapasArrRaw = useMemo(() => Array.isArray(data?.etapas) ? data.etapas : [], [data]);
  const { etapasArr, mostrarAddStage, etapasConPlus } = useEtapasMariposa(etapasArrRaw);

  // Hook para acciones de etapas
  const { handleSaveStage, handleDeleteStage } = useEtapasActions({
    mariposaId: route?.params?.id,
    etapasArr,
    stageIndex,
    newStage,
    setShowAddStageForm,
    setNewStage,
    setEditingStageIndex,
    reload,
    editingStageIndex
  });

  // Mostrar loading o error antes de acceder a data
  if (loading || !data) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }]}> 
        <Text style={{ color: theme.text, fontSize: 18 }}>
          {loading ? 'Cargando...' : 'No se encontraron datos de la mariposa.'}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>      
      <ScrollView contentContainerStyle={styles.container}>
        {/* Imagen destacada */}
        <View style={styles.topImageContainer}>
          {mainImage ? (
            <Image source={{ uri: mainImage }} style={styles.topImage} />
          ) : (
            <View style={[styles.topImage, { backgroundColor: '#EEE', alignItems: 'center', justifyContent: 'center' }]}>
              <Icon name="image-outline" size={64} color={theme.border} />
            </View>
          )}
          {/* Botón editar mariposa */}
          <TouchableOpacity
            style={{ position: 'absolute', top: 18, right: 18, backgroundColor: theme.primary || '#007AFF', borderRadius: 20, padding: 8, elevation: 3 }}
            onPress={() => {
              // Navegar a la pantalla de edición, pasando el id
              if (route?.params?.id) {
                // navigation está disponible por props
                if (typeof navigation !== 'undefined') {
                  navigation.navigate('AddMariposaScreen', { id: route.params.id });
                }
              }
            }}
          >
            <Icon name="create-outline" size={22} color="#fff" />
          </TouchableOpacity>
          {/* Tarjeta flotante mejorada */}
          <FloatingCard
            nombre={data.nombre}
            cientifico={data.cientifico}
            favorite={favorite}
            onToggleFavorite={null}
            theme={theme}
            styles={styles}
            mariposaId={route?.params?.id}
          />
        </View>

        {/* Resumen con íconos */}
        <ResumenSection
          descripcion={data.descripcion}
          distribucion={data.distribucion}
          dieta={data.dieta}
          theme={theme}
          styles={styles}
        />

        {/* Etapas de vida (Carrusel de etapas) */}
        <StageCarousel
          etapasConPlus={etapasConPlus}
          etapas={etapas}
          stageIndex={stageIndex}
          setStageIndex={setStageIndex}
          showAddStageForm={showAddStageForm}
          setShowAddStageForm={setShowAddStageForm}
          newStage={newStage}
          setNewStage={setNewStage} // <-- PASAR PROP
          setEditingStageIndex={setEditingStageIndex} // <-- PASAR PROP
          stageCarouselRef={stageCarouselRef}
          theme={theme}
          styles={styles}
          imagenesObj={imagenesObj}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          onDeleteStage={handleDeleteStage}
          onEditStage={() => {
            setShowAddStageForm(true);
            setNewStage(etapasArr[stageIndex]);
            setEditingStageIndex(stageIndex); // NUEVO: guardar el índice de la etapa a editar
          }}
        /> 

        {/* Formulario para nueva etapa (en tarjeta separada) */}
        {showAddStageForm && (
          <AddStageForm
            newStage={newStage}
            setNewStage={setNewStage}
            setShowAddStageForm={setShowAddStageForm}
            onSave={handleSaveStage}
            theme={theme}
            styles={styles}
            isEditMode={editingStageIndex !== null}
            etapasExistentes={etapasArr.map(e => (e.nombreEtapa || '').toLowerCase())} // PASA nombres ya usados
          />
        )}

        {/* Galería de imágenes */}
        <GallerySection
          etapas={etapas}
          imagenesObj={imagenesObj}
          theme={theme}
          styles={styles}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = stylesDetail;

