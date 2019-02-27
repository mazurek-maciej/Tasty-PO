const initState = {
  authError: null,
  userRated: false,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
      return {
        ...state,
        authError: 'Podaj poprawne dane',
      };
    case 'LOGIN_SUCCESS':
      console.log('login success');
      return {
        ...state,
        authError: null,
      };
    case 'SIGNOUT_SUCCESS':
      console.log('signout success');
      return state;
    case 'SIGNUP_SUCCESS':
      console.log('signup success');
      return {
        ...state,
        authError: null,
      };
    case 'SIGNUP_ERROR':
      console.log('signup error');
      return {
        ...state,
        authError: action.err.message,
        passwordError:
          'Sprawdź czy hasło zawiera minimum 6 znaków, oraz czy mail jest poprawnie wpisany',
      };
    case 'ADD_FAVOURITES':
      console.log('added to favourite list');
      return {
        ...state,
        authError: null,
      };
    case 'ADD_RATING':
      console.log('rating succeed');
      return {
        ...state,
        authError: null,
      };
    case 'ADD_RATING_TO_USER_PROFILE':
      console.log('rating successfuly added to user profile');
      return {
        ...state,
        authError: null,
        userRated: true,
      };
    case 'ADD_COMMENT':
      console.log('comment successfuly added to comments');
      return {
        ...state,
        authError: null,
      };
    default:
      return state;
  }
};

export default authReducer;
