import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyCfuhKAlqvqul_KvXQszBqEES0Dqa75MXI",
    authDomain: "crwn-db-7294f.firebaseapp.com",
    databaseURL: "https://crwn-db-7294f-default-rtdb.firebaseio.com",
    projectId: "crwn-db-7294f",
    storageBucket: "crwn-db-7294f.appspot.com",
    messagingSenderId: "104610329486",
    appId: "1:104610329486:web:ac2df8bdcd849f1b9caadf"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapshot = await userRef.get()

    if(!snapshot.exists) {
        const {displayName, email} = userAuth
        const createdAt = new Date()

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error!!', error.message)
        }
    }

    return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ promp: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
