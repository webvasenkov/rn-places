import React from 'react';
import { View, Pressable, Text, StyleSheet, Image, Platform } from 'react-native';
import { color } from '../constants/styleGuide';

const PlaceItem = ({ image, title, address, onSelect }) => {
  return (
    <Pressable style={styles.container} onPress={onSelect}>
      <Image style={styles.img} source={{ uri: image }} />
      <View style={styles.infoContainer}>
        <Text style={styles.text}>{title}</Text>
        <Text style={[styles.text, styles.textAddress]}>{address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.accent,
    borderRadius: 7.5,
    padding: 15,
    flexDirection: 'row',
    overflow: 'hidden',
    flex: 1,
    marginVertical: 3.25,
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  infoContainer: {
    marginLeft: 7.5,
  },
  text: {
    fontSize: 18,
    color: color.primary,
  },
  textAddress: {
    marginTop: 3.25,
  },
});
