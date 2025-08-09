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

const SCREEN_WIDTH = Dimensions.get('window').width;

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

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { paddingBottom: 32 },

  topImageContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    position: 'relative',
  },
  topImage: {
    width: '100%',
    height: 260,
    resizeMode: 'cover',
  },
  floatingCard: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: -24, // antes -36, ahora sobresale menos
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 40, // menos padding vertical
    paddingHorizontal: 18,
    borderRadius: 18,
    elevation: 6,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    zIndex: 10,
    backgroundColor: '#fff',
    gap: 12,
  },
  favoriteCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 2,
    marginLeft: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 56,
    minHeight: 0,
    backgroundColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
  },
  headerText: { flex: 1 },
  name: { fontSize: 28, fontWeight: '700' },
  scientific: { fontSize: 16, marginTop: 4 },
  star: { marginHorizontal: 8 },
  image: { width: 60, height: 60, borderRadius: 30 },
  imageLarge: { width: 100, height: 100, borderRadius: 50, marginRight: 16, backgroundColor: '#EEE' },
  stageImage: { width: 120, height: 90, borderRadius: 12, marginRight: 12, marginBottom: 8, backgroundColor: '#EEE', borderWidth: 1, borderColor: '#eee' },
  galleryImage: { width: 80, height: 60, borderRadius: 10, margin: 4, backgroundColor: '#EEE', borderWidth: 1, borderColor: '#eee' },

  section: {
    marginHorizontal: 16,
    marginTop: 32,
    borderRadius: 18,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  stageTitle: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  descriptionText: { fontSize: 15, lineHeight: 22 },
  infoRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },

  stagesTabRow: { flexDirection: 'row', marginBottom: 8, justifyContent: 'center', gap: 8 },
  stageTab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 16,
    marginHorizontal: 2,
    borderWidth: 1.5,
    flexDirection: 'column',
    minWidth: 70,
    minHeight: 54,
    elevation: 1,
  },
  stageTabActive: {
    backgroundColor: '#f7c873',
    borderColor: '#f7c873',
    elevation: 2,
    shadowColor: '#f7c873',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  stageCard: {
    marginHorizontal: 16, // igual que section
    marginTop: 32,
    borderRadius: 22,
    paddingVertical: 24,
    paddingHorizontal: 0,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  stageNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 2,
  },
  arrowBtn: {
    padding: 6,
    borderRadius: 20,
  },
  arrowBtnDisabled: {
    opacity: 0.3,
  },
  stageLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 6,
  },
  stageNameBox: {
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  stageName: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
    textTransform: 'capitalize',
  },
  addStageBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    // backgroundColor: 'red',
  },
  addStageText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
  },
  stageCarouselArea: {
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 0,
    minHeight: 160,
  },
  stageImageWrapper: {
    width: SCREEN_WIDTH - 32, // respeta margen horizontal
    height: 260,
    borderRadius: 0,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  stageImageLarge: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // mostrar imagen completa sin recortar
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 2,
  },
  dotActive: {
    backgroundColor: '#f7c873',
    width: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  }
})

