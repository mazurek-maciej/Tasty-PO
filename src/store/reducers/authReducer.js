const initState = {
    authError: null,
};

const authReducer = (state = initState, action) => {
    switch(action.type) {
        case 'LOGIN_ERROR':
            return {
                ...state,
                authError: 'Login failed'
            };
        case 'LOGIN_SUCCESS':
            console.log('login success');
            return {
                ...state,
                authError: null
            };
        case 'SIGNOUT_SUCCESS':
            console.log('signout success');
            return state;
        case 'SIGNUP_SUCCESS':
            console.log('signup success');
            return {
                ...state,
                authError: null
            };
        case 'SIGNUP_ERROR':
            console.log('signup error');
            return {
                ...state,
                authError: action.err.message
            };
        case 'ADD_FAVOURITES':
            console.log('added to favourite list');
            return {
                ...state,
                authError: null
            }
        case 'ADD_RATING':
            console.log('rating succeed');
            return {
                ...state,
                authError: null
            };
        case 'ADD_RATING_TO_USER_PROFILE':
            console.log('rating successfuly added to user profile');
            return {
                ...state,
                authError: null
            };
        default:
            return state;
    }
};

export default authReducer;