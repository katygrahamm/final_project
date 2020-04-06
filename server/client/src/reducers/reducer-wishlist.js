import { FETCH_WISHLIST } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_WISHLIST :
        console.log('reducer-spaces', action.payload)
      return action.payload
    default:
      return state;
  }
}