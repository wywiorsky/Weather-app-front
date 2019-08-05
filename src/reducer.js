import weather from './reducers/weather';
import photos from './reducers/photos';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  weather,
  photos,
  router: routerReducer
});
