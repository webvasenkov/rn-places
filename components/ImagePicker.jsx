import React, { useState } from 'react';
import { View, Image, Text, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { color } from '../constants/styleGuide';
import Button from './Button';
import * as ImgPicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const ImagePicker = ({ onImageTaken }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);

  const verifyPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY, Permissions.CAMERA);

    if (status !== 'granted') {
      Alert.alert('Insufficient permissions', 'You need to grant camera permissions to use this app.', [
        { text: 'Okay' },
      ]);
      return false;
    }

    return true;
  };

  const handleTakeImage = async () => {
    const hasPermissions = await verifyPermissions();
    if (!hasPermissions) return;

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
    <View style={styles.container}>
      <View style={styles.preview}>{isLoading ? preloader : pickImage}</View>
      <Button style={styles.btn} title='Take Image' onPress={handleTakeImage} color={color.accent} />
    </View>
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
  },
  text: {
    fontSize: 18,
  },
  imgPreview: {
    width: '100%',
    height: '100%',
  },
  btn: {
    margin: 7.5,
  },
});
