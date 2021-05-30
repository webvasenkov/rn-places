import React from 'react';
import { ScrollView, Pressable, ImageBackground, View, Text, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import MapPreview from '../components/MapPreview';

const HEIGHT = Dimensions.get('window').height;

const PlaceDetailScreen = ({ route, navigation }) => {
  const place = useSelector((state) => state.places.all.find((pl) => pl.id === route.params.id));
  navigation.setOptions({ title: route.params.title });
  console.log(place);
  const handlePressMap = () => {
    navigation.navigate('Map', {
      currentLocation: { latitude: place.latitude, longitude: place.longitude },
      readonly: true,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <ImageBackground style={styles.img} source={{ uri: place.imageUri }}>
        <View style={styles.imgOverlay}>
          <Text style={styles.title}>{place.title}</Text>
          <Text style={styles.address}>{place.address}</Text>
        </View>
      </ImageBackground>
      <Pressable style={styles.mapContainer} onPress={handlePressMap}>
        <MapPreview lat={place.latitude} lng={place.longitude} />
      </Pressable>
    </ScrollView>
  );
};

export default PlaceDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: '100%',
    height: HEIGHT / 2,
  },
  imgOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  title: {
    fontSize: 48,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  address: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
  },
  mapContainer: {
    width: '100%',
    height: HEIGHT / 2,
  },
});
