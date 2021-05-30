import { Place } from '../../models/place';
import { insert, fetchPlaces } from '../../helpers/db';
import { ENV } from '../../../env';
import * as FileSystem from 'expo-file-system';

const SET_PLACES = 'rn-places/places-reducer/SET_PLACES';
const ADD_PLACE = 'rn-places/places-reducer/ADD_PLACE';

const initialState = {
  all: [],
};

const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES:
      return {
        all: action.places.map(
          (pl) => new Place(pl.id.toString(), pl.title, pl.imageUri, pl.address, pl.latitude, pl.longitude)
        ),
      };
    case ADD_PLACE: {
      const newPlace = new Place(
        action.id.toString(),
        action.title,
        action.imageUri,
        action.address,
        action.latitude,
        action.longitude
      );
      return { all: state.all.concat(newPlace) };
    }
    default:
      return state;
  }
};

export default placesReducer;

// Action Creators
export const setPlacesAC = (places) => ({ type: SET_PLACES, places });
export const addPlaceAC = (id, title, imageUri, address, latitude, longitude) => ({
  type: ADD_PLACE,
  id,
  title,
  imageUri,
  address,
  latitude,
  longitude,
});

// Thunks
export const setPlaces = () => async (dispatch) => {
  try {
    const placesData = await fetchPlaces();
    dispatch(setPlacesAC(placesData.rows._array));
  } catch (err) {
    console.warn(err);
    throw err;
  }
};

export const addPlace = (title, imageUri, location) => async (dispatch) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${ENV.GOOGLE_API_KEY}`
  );

  if (!response.ok) throw new Error('Something went wrong!');
  const data = await response.json();
  if (!data.results) throw new Error('Something went wrong!');

  const address = data.results[0].formatted_address;
  const fileName = imageUri.split('/').pop();
  const newPath = FileSystem.documentDirectory + fileName;
  console.log('work');

  try {
    await FileSystem.moveAsync({
      from: imageUri,
      to: newPath,
    });

    const placeData = await insert(title, newPath, address, location.latitude, location.longitude);
    dispatch(addPlaceAC(placeData.insertId, title, newPath, address, location.latitude, location.longitude));
  } catch (err) {
    console.warn(err);
    throw err;
  }
};
