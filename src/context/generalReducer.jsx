export const lsFavs = JSON.parse(localStorage.getItem('favs')) || [];
export const initialState = {
  isLoginModalOpen: false,
  isLoggedIn: false,
  userData: {
    firstName: '',
    password: '',
    role: 0,
  },
  tourData: [],
  favs: lsFavs,
  tourFavs: [],// ver si es necesario
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_LOGIN_MODAL':
      return {
        ...state,
        isLoginModalOpen: true,
      };
    case 'CLOSE_LOGIN_MODAL':
      return {
        ...state,
        isLoginModalOpen: false,
      };
    case 'USER_LOGGED_IN':
      return {
        ...state,
        isLoggedIn: true,
      };
    case 'USER_LOGGED_OUT':
      return {
        ...state,
        isLoggedIn: false,
        userData: { ...initialState.userData },
      };
    case 'USER_DATA':
      return {
        ...state,
        userData: action.payload,
      };
    case 'TOUR_DATA':
      return {
        ...state,
        tourData: action.payload,
      };
    case "ADD_FAV":
        return {...state, favs: [...state.favs,action.payload]};
    case "REMOVE_FAV":
        const filteredFavs = state.favs.filter((fav) => fav.id !== action.payload.id)
        return {...state,favs: filteredFavs};
    default:
      return state;
  }
};
