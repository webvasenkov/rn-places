import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setPlaces } from '../store/reducers/placesReducer';
import PlaceItem from '../components/PlaceItem';

const PlacesListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const places = useSelector((state) => state.places.all);
  const placeItem = ({ item }) => {
    return (
      <PlaceItem
        imageUri={item.imageUri}
        title={item.title}
        address={item.address}
        onSelect={() => navigation.navigate('PlaceDetail', { title: item.title, id: item.id })}
      />
    );
  };

  useEffect(() => {
    dispatch(setPlaces());
  }, [dispatch]);

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
