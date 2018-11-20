import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import authReducer from './authReducer'
import restaurantsReducer from './restaurantsReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    restaurant: restaurantsReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;