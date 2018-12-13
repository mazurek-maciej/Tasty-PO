import { getFirestore } from "redux-firestore";

export const getRestaurants = (restaurant) => {
    return ( dispatch, getState, { fireFirebase, fireStore}) => {
        //sync z baza danych 
        const firestore = getFirestore();
        firestore.collection('restaurants')

        dispatch({ type: "GET_RESTAURANTS", restaurant})
    }
}