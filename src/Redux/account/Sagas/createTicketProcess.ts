import {call, put} from 'redux-saga/effects';
import {apiUrl, fetchApi} from '../../../helpers/common';
import {getTickets} from '../Actions/accountActions';
import {setCommonError} from '../../../modules/user/actions';
import {defaultError} from '../../../helpers/errorHandler';
import {ICreateTicket} from '../../../actions/accountActionTypes';

export function* createTicketProcess({payload}: ICreateTicket) {
	try {
		const {fields, onSuccess} = payload;
		yield call(fetchApi, 'post', '201', {url: "/tickets", mainUrl: apiUrl, body: fields});
		onSuccess();
		yield put(getTickets({
			status: 'open', afterLoad: () => {
			}
		}))
	} catch (err) {
		if (err?.code || err?.message) {
			yield put(setCommonError({message: err?.message ? `Create ticket: ${err?.message}` : err?.code, isBottomText: false}))
		} else {
			yield put(setCommonError({message: defaultError, isBottomText: false}))
		}
	}
}
