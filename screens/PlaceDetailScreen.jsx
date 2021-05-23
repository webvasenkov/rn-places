import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PlaceDetailScreen = ({ route, navigation }) => {
  navigation.setOptions({ title: route.params.title });

  return (
    <View>
      <Text>PlaceDetailScreen</Text>
    </View>
  );
};

export default PlaceDetailScreen;

const styles = StyleSheet.create({});
