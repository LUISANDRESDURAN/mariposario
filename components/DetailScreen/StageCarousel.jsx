// Componente StageCarousel para mostrar las etapas de vida y navegación
import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageViewing from 'react-native-image-viewing';

export default function StageCarousel({
  etapasConPlus,
  etapas,
  stageIndex,
  setStageIndex,
  showAddStageForm,
  setShowAddStageForm,
  newStage,
  stageCarouselRef,
  theme,
  styles,
  imagenesObj,
  modalVisible,
  setModalVisible
}) {
  const SCREEN_WIDTH = styles.stageImageWrapper?.width || 360;

  const handlePrev = () => {
    if (stageIndex > 0) setStageIndex(stageIndex - 1);
    if (stageCarouselRef.current) {
      stageCarouselRef.current.scrollToIndex({ index: Math.max(stageIndex - 1, 0), animated: true });
    }
  };
  const handleNext = () => {
    if (stageIndex < etapasConPlus.length - 1) setStageIndex(stageIndex + 1);
    if (stageCarouselRef.current) {
      stageCarouselRef.current.scrollToIndex({ index: Math.min(stageIndex + 1, etapasConPlus.length - 1), animated: true });
    }
  };

  return (
    <View style={[styles.stageCard, { backgroundColor: theme.cardBackground }]}>        
      <View style={styles.stageNavRow}>
        <TouchableOpacity onPress={handlePrev} disabled={stageIndex === 0} style={[styles.arrowBtn, stageIndex === 0 && styles.arrowBtnDisabled]}>
          <Icon name="chevron-back" size={28} color={stageIndex === 0 ? theme.border : theme.text} />
        </TouchableOpacity>
        <View style={styles.stageLine} />
        <View style={styles.stageNameBox}>
          {stageIndex === etapasConPlus.length - 1 ? null : (
            <Text style={[styles.stageName, { color: theme.text }]}>{etapasConPlus[stageIndex].nombreEtapa || 'Nueva Etapa'}</Text>
          )}
        </View>
        <View style={styles.stageLine} />
        <TouchableOpacity onPress={handleNext} disabled={stageIndex === etapasConPlus.length - 1} style={[styles.arrowBtn, stageIndex === etapasConPlus.length - 1 && styles.arrowBtnDisabled]}>
          <Icon name="chevron-forward" size={28} color={stageIndex === etapasConPlus.length - 1 ? theme.border : theme.text} />
        </TouchableOpacity>
      </View>
      <View style={styles.stageCarouselArea}>
        <FlatList
          ref={stageCarouselRef}
          data={etapasConPlus}
          keyExtractor={(etapa, idx) => etapa.add ? 'add' : etapa.nombreEtapa + idx}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={e => {
            const idx = Math.round(e.nativeEvent.contentOffset.x / (SCREEN_WIDTH));
            setStageIndex(idx);
          }}
          renderItem={({ item: etapa, index }) => (
            etapa.add ? (
              <View style={[styles.stageImageWrapper, { justifyContent: 'center', alignItems: 'center', backgroundColor: theme.cardBackground }]}> 
                <TouchableOpacity style={styles.addStageBtn} onPress={() => setShowAddStageForm(true)}>
                  <Icon name="add-circle-outline" size={48} color={theme.text} />
                  <Text style={[styles.addStageText, { color: theme.text, fontSize: 18 }]}>añadir nueva etapa</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={[styles.stageImageWrapper, { backgroundColor: theme.cardBackground, justifyContent: 'center', alignItems: 'center' }]}> 
                <Text style={{ color: theme.text, fontSize: 14, marginBottom: 4 }}>{etapa.descripcionEtapa}</Text>
                <Text style={{ color: theme.subtext, fontSize: 13, marginBottom: 2 }}>Duración: {etapa.duracion}</Text>
                {etapa.hospedador ? <Text style={{ color: theme.subtext, fontSize: 13 }}>Hospedador: {etapa.hospedador}</Text> : null}
              </View>
            )
          )}
          style={{ flexGrow: 0 }}
          snapToInterval={SCREEN_WIDTH}
          decelerationRate={0.95}
          contentContainerStyle={{ paddingHorizontal: 0 }}
          initialScrollIndex={stageIndex}
          getItemLayout={(_, index) => ({ length: SCREEN_WIDTH, offset: (SCREEN_WIDTH) * index, index })}
          extraData={[stageIndex, showAddStageForm, newStage]}
        />
        {/* Dots */}
        <View style={styles.dotsRow}>
          {etapasConPlus.map((_, idx) => (
            <View key={idx} style={[styles.dot, stageIndex === idx && styles.dotActive]} />
          ))}
        </View>
        {/* Modal de imagen con zoom */}
        {stageIndex !== etapasConPlus.length - 1 && (
          <ImageViewing
            images={imagenesObj[etapas[stageIndex]] ? [{ uri: imagenesObj[etapas[stageIndex]][0] }] : []}
            imageIndex={0}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
            backgroundColor="#000"
          />
        )}
      </View>
    </View>
  );
}
