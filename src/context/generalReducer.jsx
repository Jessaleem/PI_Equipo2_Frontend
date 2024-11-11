export const initialState = {
    isLoginModalOpen: false,
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
        default:
            return state
    }
}