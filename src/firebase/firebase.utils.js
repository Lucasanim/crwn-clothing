import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyCfuhKAlqvqul_KvXQszBqEES0Dqa75MXI",
    authDomain: "crwn-db-7294f.firebaseapp.com",
    projectId: "crwn-db-7294f",
    storageBucket: "crwn-db-7294f.appspot.com",
    messagingSenderId: "104610329486",
    appId: "1:104610329486:web:ac2df8bdcd849f1b9caadf"
};

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ promp: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
