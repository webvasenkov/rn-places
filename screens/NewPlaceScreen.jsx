import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { color } from '../constants/styleGuide';
import { useDispatch } from 'react-redux';
import { addPlace } from '../store/reducers/placesReducer';
import Button from '../components/Button';
import ImagePicker from '../components/ImagePicker';

const NewPlaceScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const handleAddPlace = () => {
    dispatch(addPlace(title, selectedImage));
    navigation.goBack();
  };

  const handleImageTaken = (image) => setSelectedImage(image);

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      </View>
      <ImagePicker onImageTaken={handleImageTaken} />
      <Button style={styles.btn} title='Add Place' color={color.accent} onPress={handleAddPlace} />
    </View>
  );
};

export default NewPlaceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  field: {
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
  },
  input: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: color.accent,
  },
  btn: {
    marginTop: 7.5,
  },
});
