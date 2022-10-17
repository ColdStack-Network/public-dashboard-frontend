import { all, call, put } from 'redux-saga/effects';
import { apiUrl, fetchApi } from '../../../helpers/common';
import { setCommonError } from '../../../modules/user/actions';
import { defaultError } from '../../../helpers/errorHandler';
import { IGetSupportData } from '../../../actions/accountActionTypes';
import { setSupportData } from '../Actions/accountActions';

export function* getSupportDataProcess({payload}: IGetSupportData) {
	const {status, afterLoad} = payload;
	try {
		const data = yield all([
			call(fetchApi, 'get', "200", {url: "/tickets/by-user", mainUrl: apiUrl, query: {status: status, page: 1, perPage: 10000000}}),
			call(fetchApi, 'get', '200', {url: "/handbook/tickets", mainUrl: apiUrl})]);
		yield put(setSupportData(data));
		afterLoad();
	} catch (err) {
		if (err?.code || err?.message) {
			yield put(setCommonError({message: err?.message ? `Get support data: ${err?.message}` : err?.code, isBottomText: false}))
		} else {
			yield put(setCommonError({message: defaultError, isBottomText: true}))
		}
	}
}
