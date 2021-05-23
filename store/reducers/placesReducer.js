import { Place } from '../../models/place';
import * as FileSystem from 'expo-file-system';

const ADD_PLACE = 'rn-places/places-reducer/ADD_PLACE';

const initialState = {
  all: [],
};

const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE: {
      const newPlace = new Place(Date.now().toString(), action.title, action.image);
      return { all: state.all.concat(newPlace) };
    }
    default:
      return state;
  }
};

export default placesReducer;

// Action Creators
export const addPlaceAC = (title, image) => ({ type: ADD_PLACE, title, image });

// Thunks
export const addPlace = (title, image) => async (dispatch) => {
  const fileName = image.split('/').pop();
  const newPath = FileSystem.documentDirectory + fileName;

  try {
    await FileSystem.moveAsync({
      from: image,
      to: newPath,
    });
  } catch (err) {
    console.warn(err);
    throw err;
  }

  dispatch(addPlaceAC(title, image));
};
