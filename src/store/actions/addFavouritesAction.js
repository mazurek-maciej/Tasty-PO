export const addFavourites = (info, id) => {
    return ( dispatch, getState, { getFirebase, getFirestore}) => {
        //sync z baza danych
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const userId = getState().firebase.auth.uid;
        const favours = getState().firebase.profile.favourites;
        firestore.collection("users").doc(id).update({
            favourites: favours.concat(info),
            name: profile.name,
            surname: profile.surname
        }).then(() => {
            dispatch({ type: "ADD_FAVOURITES", info});
        })
    }
}