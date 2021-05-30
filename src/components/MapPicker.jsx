import React, { useState, useCallback } from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { color } from '../constants/styleGuide';
import * as Location from 'expo-location';
import MapPreview from './MapPreview';
import Button from './Button';

const MapPicker = ({ onLocationTaken, route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(null);

  const handleGetLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return;
    setIsLoading(true);
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync();

    setLocation({ latitude, longitude });
    onLocationTaken({ latitude, longitude });
    setIsLoading(false);
  };

  const handlePressPreview = () => {
    navigation.navigate('Map', { currentLocation: location });
  };

  useFocusEffect(
    useCallback(() => {
      if (route.params?.location) {
        setLocation(route.params.location);
        onLocationTaken(route.params.location);
      }
    }, [route.params?.location])
  );

  const pickMap = location ? (
    <MapPreview lat={location.latitude} lng={location.longitude} />
  ) : (
    <Text style={styles.text}>No map picker yet : (</Text>
  );

  const preloader = <ActivityIndicator size={21} color={color.accent} />;

  return (
    <>
      <Pressable style={styles.preview} onPress={handlePressPreview}>
        {isLoading ? preloader : pickMap}
      </Pressable>
      <Button style={styles.btn} title='Get Location' color={color.accent} onPress={handleGetLocation} />
    </>
  );
};

export default MapPicker;

const styles = StyleSheet.create({
  preview: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: color.accent,
    borderRadius: 7.5,
    overflow: 'hidden',
  },
  text: {
    fontSize: 18,
  },
  btn: {
    marginVertical: 7.5,
  },
});
