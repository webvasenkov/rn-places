import React, { useState } from 'react';
import { View, Image, Text, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { color } from '../constants/styleGuide';
import Button from './Button';
import * as ImgPicker from 'expo-image-picker';

const ImagePicker = ({ onImageTaken }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);

  const handleTakeImage = async () => {
    const { status } = await ImgPicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Insufficient permissions', 'You need to grant camera permissions to use this app.', [
        { text: 'Okay' },
      ]);
      return;
    }

    setIsLoading(true);

    const image = await ImgPicker.launchCameraAsync({
      quality: 0.5,
      allowsEditing: true,
      aspect: [16, 9],
    });

    onImageTaken(image.uri);
    setImage(image.uri);
    setIsLoading(false);
  };

  const pickImage = image ? (
    <Image style={styles.imgPreview} source={{ uri: image }} />
  ) : (
    <Text style={styles.text}>No image picker yet :(</Text>
  );

  const preloader = <ActivityIndicator size={21} color={color.accent} />;

  return (
    <>
      <View style={styles.preview}>{isLoading ? preloader : pickImage}</View>
      <Button style={styles.btn} title='Take Image' onPress={handleTakeImage} color={color.accent} />
    </>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  preview: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: color.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7.5,
    overflow: 'hidden',
  },
  text: {
    fontSize: 18,
  },
  imgPreview: {
    width: '100%',
    height: '100%',
  },
  btn: {
    marginVertical: 7.5,
  },
});
