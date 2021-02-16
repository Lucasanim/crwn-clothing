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

export const addCollectionAndItems = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey)
    
    //makes a big request, because if any request fail, all fails
    const batch = firestore.batch()
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc()
        batch.set(newDocRef, obj)
    })

    return await batch.commit()
}

export const convertCollectionSnapshopToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const {title, items} = doc.data()

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    })

    return transformedCollection.reduce( (accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection
        return accumulator
    }, {})
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe()
            resolve(userAuth)
        }, reject)
    })
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

export const googleProvider = new firebase.auth.GoogleAuthProvider()
googleProvider.setCustomParameters({ promp: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

export default firebase
