import { firestore, convertCollectionSnapshopToMap } from '../../firebase/firebase.utils'

export const fetchCollectionStart = () => ({
    type: 'FETCH_COLLECTIONS_START'
})

export const fetchCollectionsSuccess = collectionsMap => ({
    type: 'FETCH_COLLECTIONS_SUCCESS',
    payload: collectionsMap
})

export const fetchCollectionsFailure = errorMessage => ({
    type: 'FETCH_COLLECTIONS_FAILURE',
    payload: errorMessage
})

export const fetchCollectionStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections')

        dispatch(fetchCollectionStart())

        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionSnapshopToMap(snapshot)
            dispatch(fetchCollectionsSuccess(collectionsMap))
        }).catch(error => dispatch(fetchCollectionsFailure(error.message)) )
    }
}
