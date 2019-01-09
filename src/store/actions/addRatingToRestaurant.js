export const addRatingToRestaurant = (rate, count, id) => {
    return ( dispatch, getState, { getFirebase, getFirestore}) => {
        //sync z baza danych
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const userId = getState().firebase.auth.uid;
        let ratingValue = getState().firestore.data.restaurants[id].rating
        firestore.collection("restaurants").doc(id).update({
            // wcześniej przypisana zostaje tablica z ulubionymi lokalami pobrana z firestore Ad.1
            // dla stałej favours. Następnie poniżej nowe elementy, czyli nowo kliknięte lokale
            // zostają dołączone do tablicy. Dzięki czemu nie jest ona nadpisywana
            rating: rate,
            ratingCount: count
        }).then(() => {
            dispatch({ type: "ADD_RATING", rate});
            console.log(ratingValue)
        })
    }
}