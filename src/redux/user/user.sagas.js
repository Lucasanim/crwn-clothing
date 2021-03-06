import {takeLatest, put, all, call} from 'redux-saga/effects'

import {
    googleProvider,
    auth,
    createUserProfileDocument,
    getCurrentUser,
} from '../../firebase/firebase.utils'

import {
    signInSuccess,
    signInFailure,
    signOutFailure,
    signOutSuccess,
    createUserFailure,
    createUserSuccess
} from './user.actions'

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData)
        const userSnapshot = yield userRef.get()
        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data() }))
    } catch (error) {
        yield put(signInFailure(error.message))
    }
}

export function* signInWithGoogle() {
    try {
        const {user} = yield auth.signInWithPopup(googleProvider)
        yield getSnapshotFromUserAuth(user)
    } catch (error) {
        yield put(signInFailure(error.message))
    }
}

export function* signInWithEmail({payload: {email, password}}) {
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email, password)
        yield getSnapshotFromUserAuth(user)
    } catch (error) {
        yield put(signInFailure(error.message))

    }
}

export function* isUserAuthenticated() {
     try {
         const userAuth = yield getCurrentUser()
         if (!userAuth) return
         yield getSnapshotFromUserAuth(userAuth)
     } catch (error) {
         yield put(signInFailure(error))
     }
}

export function* signOut() {
    try {
        yield auth.signOut()
        yield put(signOutSuccess())
    } catch (error) {
        yield put(signOutFailure(error))
    }
}

export function* createUser({ payload: {email, password, displayName} }) {
    try {
        const {user} = yield auth.createUserWithEmailAndPassword(email, password)
        // yield getSnapshotFromUserAuth(user)
        yield put(signInSuccess({ user, additionalData: {displayName}}))
    } catch (error) {
        yield put(createUserFailure(error))   
    }
}

export function* signInAfterCreateUser({payload: {user, additionalData}}) {
    yield getSnapshotFromUserAuth(user, additionalData)
}

export function* onGoogleSignInStart() {
    yield takeLatest('GOOGLE_SIGN_IN_START', signInWithGoogle)
}

export function* onEmailSignInStart() {
    yield takeLatest('EMAIL_SIGN_IN_START', signInWithEmail)
}

export function* onCheckUserSession() {
    takeLatest('CHECK_USER_SESSION', isUserAuthenticated)
}

export function* onSignOutStart() {
    yield takeLatest('SIGN_OUT_START', signOut)
}

export function* onCreateUserStart() {
    yield takeLatest('CREATE_USER_START', createUser)
}

export function* onSignUpSuccess() {
    yield takeLatest('CREATE_USER_SUCCESS', signInAfterCreateUser)
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(isUserAuthenticated),
        call(onSignOutStart),
        call(onCreateUserStart),
        call(onSignUpSuccess)
    ])
}
