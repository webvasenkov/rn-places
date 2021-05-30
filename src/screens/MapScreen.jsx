import React, { useState, useLayoutEffect, useEffect, useCallback } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { color } from '../constants/styleGuide';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = ({ route, navigation }) => {
  const [location, setLocation] = useState(null);

  const handleHeaderRight = useCallback(() => {
    if (route.params.readonly) return <></>;

    return (
      <Ionicons
        name='checkmark-outline'
        color={Platform.OS === 'android' ? color.primary : color.accent}
        size={26}
        style={{ marginRight: 15 }}
        onPress={() => navigation.navigate('NewPlace', { location })}
      />
    );
  }, [location]);

  useEffect(() => {
    if (route.params?.currentLocation) setLocation(route.params.currentLocation);
  }, [route.params?.currentLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: handleHeaderRight,
    });
  }, [navigation, handleHeaderRight]);

  const region = {
    latitude: location?.latitude ?? 37.78825,
    longitude: location?.longitude ?? -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const handleSelectLocation = (event) => {
    if (route.params.readonly) return;
    setLocation(event.nativeEvent.coordinate);
  };

  return (
    <MapView style={styles.container} region={region} onPress={handleSelectLocation}>
      {location && <Marker coordinate={location} />}
    </MapView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
