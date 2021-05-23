import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import PlaceItem from '../components/PlaceItem';

const PlacesListScreen = ({ navigation }) => {
  const places = useSelector((state) => state.places.all);
  const placeItem = ({ item }) => {
    return (
      <PlaceItem
        image={item.image}
        title={item.title}
        address={null}
        onSelect={() => navigation.navigate('PlaceDetail', { title: item.title, id: item.id })}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList keyExtractor={(item) => item.id} data={places} renderItem={placeItem} />
    </View>
  );
};

export default PlacesListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
});
