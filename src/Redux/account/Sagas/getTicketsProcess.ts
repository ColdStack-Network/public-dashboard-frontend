import { call, put } from 'redux-saga/effects';
import { apiUrl, fetchApi } from '../../../helpers/common';
import { setCommonError } from '../../../modules/user/actions';
import { defaultError } from '../../../helpers/errorHandler';
import { IGetTickets } from '../../../actions/accountActionTypes';
import { setTickets } from '../Actions/accountActions';

export function* getTicketsProcess({payload}: IGetTickets) {
	const {status, afterLoad} = payload;
	try {
		const tickets = yield call(fetchApi, 'get', "200", {
			url: "/tickets/by-user",
			mainUrl: apiUrl,
			query: {status: status, page: 1, perPage: 10000000}
		});
		yield put(setTickets(tickets?.data));
		afterLoad();
	} catch (err) {
		if (err?.code || err?.message) {
			yield put(setCommonError({message: err?.message ? `Get tickets: ${err?.message}` : err?.code, isBottomText: false}))
		} else {
			yield put(setCommonError({message: defaultError, isBottomText: true}))
		}
	}
}
