import {takeLatest, call, put, all} from 'redux-saga/effects'

import { firestore, convertCollectionSnapshopToMap } from '../../firebase/firebase.utils'

import {
    fetchCollectionsSuccess,
    fetchCollectionsFailure
} from './shop.actions'

export function* fetchCollectionsAsync() {
    try {
        const collectionRef = firestore.collection('collections')
        const snapshot = yield collectionRef.get()
        const collectionMap = yield call(convertCollectionSnapshopToMap, snapshot)
        //put is like disoatch
        yield put(fetchCollectionsSuccess(collectionMap))
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message))
    }

    // collectionRef.get().then(snapshot => {
    //     const collectionsMap = convertCollectionSnapshopToMap(snapshot)
    //     dispatch(fetchCollectionsSuccess(collectionsMap))
    // }).catch(error => dispatch(fetchCollectionsFailure(error.message)) )
}

export function* fetchCollectionsStart() {
    yield takeLatest('FETCH_COLLECTIONS_START', fetchCollectionsAsync)
}

export function* shopSagas() {
    yield all([
        call(fetchCollectionsStart)
    ])
}
