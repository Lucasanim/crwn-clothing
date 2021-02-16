export const googleSignInStart = () => ({
    type: 'GOOGLE_SIGN_IN_START'
})

export const signInSuccess = (user) => ({
    type: 'GOOGLE_SIGN_IN_SUCCESS',
    payload: user
})

export const signInFailure = error => ({
    type: 'GOOGLE_SIGN_IN_FAILURE',
    payload: error
})

export const emailSignInStart = (emailAndPassword) => ({
    type: 'EMAIL_SIGN_IN_START',
    payload: emailAndPassword
})

export const checkUserSession = () => ({
    type: 'CHECK_USER_SESSION'
})

export const signOutStart = () => ({
    type: 'SIGN_OUT_START'
})

export const signOutSuccess = () => ({
    type: 'SIGN_OUT_SUCCESS'
})

export const signOutFailure = (error) => ({
    type: 'SIGN_OUT_FAILURE',
    payload: error
})

export const createUserStart = (email, password) => ({
    type: 'CREATE_USER_START',
    payload: {email, password}
})

export const createUserSuccess = ({user, additionalData}) => ({
    type: 'CREATE_USER_SUCCESS',
    payload: {user, additionalData}
})

export const createUserFailure = (error) => ({
    type: 'CREATE_USER_FAILURE',
    payload: error
})
