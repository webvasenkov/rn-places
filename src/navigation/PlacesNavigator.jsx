import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { color } from '../constants/styleGuide';
import PlacesListScreen from '../screens/PlacesListScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import MapScreen from '../screens/MapScreen';

const Stack = createStackNavigator();

const PlacesNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: Platform.OS === 'android' ? color.primary : color.accent,
          headerStyle: { backgroundColor: Platform.OS === 'android' ? color.accent : color.primary },
        }}
      >
        <Stack.Screen
          name='PlacesList'
          component={PlacesListScreen}
          options={({ navigation }) => ({
            title: 'All Places',
            headerRight: () => (
              <Ionicons
                name='add-outline'
                color={Platform.OS === 'android' ? color.primary : color.accent}
                size={26}
                style={{ marginRight: 15 }}
                onPress={() => navigation.navigate('NewPlace')}
              />
            ),
          })}
        />
        <Stack.Screen name='PlaceDetail' component={PlaceDetailScreen} options={{ title: 'Place Detail' }} />
        <Stack.Screen name='NewPlace' component={NewPlaceScreen} options={{ title: 'New Place' }} />
        <Stack.Screen name='Map' component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default PlacesNavigator;
