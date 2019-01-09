export const addRatingToUserProfile = (restaurantId, id) => {
    return ( dispatch, getState, { getFirebase, getFirestore}) => {
        //sync z baza danych
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const profileRatingsArray = getState().firebase.profile.userRatings;
        const userId = getState().firebase.auth.uid;
        const favours = getState().firebase.profile.favourites; // 1
        firestore.collection("users").doc(id).update({
            // wcześniej przypisana zostaje tablica z ulubionymi lokalami pobrana z firestore Ad.1
            // dla stałej favours. Następnie poniżej nowe elementy, czyli nowo kliknięte lokale
            // zostają dołączone do tablicy. Dzięki czemu nie jest ona nadpisywana
            favourites: favours,
            userRatings: profileRatingsArray.concat(restaurantId),
            name: profile.name,
            surname: profile.surname
        }).then(() => {
            dispatch({ type: "ADD_RATING_TO_USER_PROFILE", restaurantId});
        })
    }
}