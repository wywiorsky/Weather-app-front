import {
  LOAD_WEATHER,
  LOAD_WEATHER_STATS,
  LOAD_WEATHER_HISTORY
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_WEATHER:
      return {
        ...state,
        main: action.payload[0]
      };
    case LOAD_WEATHER_STATS:
      return {
        ...state,
        stats: action.payload[0]
      };
      case LOAD_WEATHER_HISTORY:
      return {
        ...state,
        history: action.payload[0]
      };
    default:
      return state;
  }
};
