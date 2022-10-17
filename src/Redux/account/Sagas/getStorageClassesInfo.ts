import { call, put } from 'redux-saga/effects';
import { apiUrl, fetchApi } from 'helpers/common';
import { setCommonError } from 'modules/user/actions';
import { defaultError } from 'helpers/errorHandler';
import { setStorageClassesInfo } from '../Actions/accountActions';

export function* getStorageClassesInfo() {
	try {
		const classes = yield call(fetchApi, 'get', "200", {url: `/storage-classes`, mainUrl: apiUrl});
		yield put(setStorageClassesInfo(classes));
	} catch (err) {
		console.error(err);
		if (err?.code || err?.message) {
			yield put(setCommonError({message: err?.message ? err.message : err?.code, isBottomText: false}))
		} else {
			yield put(setCommonError({message: defaultError, isBottomText: true}))
		}
	}
}
