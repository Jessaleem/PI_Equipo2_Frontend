export const initialState = {
    isLoginModalOpen: false,
    isLoggedIn: false,
    userData: {
     firstName: '',
     password: '',
     role: 0,
    }
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'OPEN_LOGIN_MODAL':
					return {
						...state,
						isLoginModalOpen: true,
					}
        case 'CLOSE_LOGIN_MODAL':
					return {
						...state,
						isLoginModalOpen: false,
					}
        case 'USER_LOGGED_IN':
					return {
						...state,
						isLoggedIn: true,
					}
        case 'USER_LOGGED_OUT':
					return {
						...state,
						isLoggedIn: false,
						userData: {...initialState.userData}
					}
		case 'USER_DATA':
			return {
				...state,
				userData: action.payload,
			}
        default:
            return state
    }
}