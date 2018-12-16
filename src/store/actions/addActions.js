import { getFirestore } from "redux-firestore";

export const addRestaurant = (info) => {
    return ( dispatch, getState, { fireFirebase, fireStore}) => {
        //sync z baza danych 
        const firestore = getFirestore();
        firestore.collection('restaurants').add({
            ...info,
        }).then(() => {
            dispatch({ type: "ADD_RESTAURANT", info});
        })
    }
};