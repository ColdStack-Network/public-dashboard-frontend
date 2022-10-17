import {call, put} from 'redux-saga/effects';
import {apiUrl, fetchApi} from '../../../helpers/common';
import {getTickets} from '../Actions/accountActions';
import {setCommonError} from '../../../modules/user/actions';
import {defaultError} from '../../../helpers/errorHandler';
import {ISetStatusTicket} from '../../../actions/accountActionTypes';

export function* setStatusTicketProcess({payload}: ISetStatusTicket) {
	try {
		const {id, status} = payload;
		const statusFetch = status === "open" ? "close" : "open";
		yield call(fetchApi, 'put', '200', {url: `/tickets/${id}/status`, mainUrl: apiUrl, body: {status: status}});
		yield put(getTickets({
			status: statusFetch, afterLoad: () => {
			}
		}))
	} catch (err) {
		if (err?.code || err?.message) {
			yield put(setCommonError({message: err?.message ? `Change ticket status: ${err?.message}` : err?.code, isBottomText: false}))
		} else {
			yield put(setCommonError({message: defaultError, isBottomText: true}))
		}
	}
}
