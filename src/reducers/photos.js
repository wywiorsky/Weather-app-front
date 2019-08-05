import {
  LOAD_PHOTOS
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_PHOTOS:
      return {
        ...action.payload[0].photos
      };
    default:
      return state;
  }
};
