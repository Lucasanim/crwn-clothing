const INITIAL_STATE = {
    currentUser: null,
    error: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'GOOGLE_SIGN_IN_SUCCESS':
        case 'EMAIL_SIGN_IN_SUCCESS':
            return {
                ...state,
                currentUser: action.payload,
                error: null
            }
        case 'SIGN_OUT_SUCCESS':
            return {
                ...state,
                currentUser: null,
                error: null
            }
        case 'GOOGLE_SIGN_IN_FAILURE':
        case 'EMAIL_SIGN_IN_FAILURE':
        case 'SIGN_OUT_FAILURE':
        case 'CREATE_USER_FAILURE':
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export default userReducer
