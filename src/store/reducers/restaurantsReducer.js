const initState = {
    restaurants: [
        {id: '1', name: 'mcdonalds'},
        {id: '2', name: 'kfc'},
        {id: '3', name: 'tacos'},
    ]
};

const restaurantsReducer = (state = initState, action) => {
    switch(action.type) {
        case "GET_RESTAURANTS":
            console.log(action.restaurants);
        default:
            return state;
    }
    
};

export default restaurantsReducer;