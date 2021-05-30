import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { ENV } from '../../env';

const MapPreview = ({ lat, lng }) => {
  return (
    <Image
      source={{
        uri: `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=12&size=400x200&maptype=roadmap&markers=color:red%7Clabel:C%7C${lat},${lng}&key=${ENV.GOOGLE_API_KEY}`,
      }}
      style={styles.img}
    />
  );
};

export default MapPreview;

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: '100%',
  },
});
