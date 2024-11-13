export const initialState = {
    isLoginModalOpen: false,
    isLoggedIn: false,
    userData: {
     firstName: '',
     password: '',
     role: 3
    }
}

export const reducer = (state, action) => {
    console.log('test')
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