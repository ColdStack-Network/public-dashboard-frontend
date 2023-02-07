import { call, put } from "redux-saga/effects";
import { apiUrl, fetchApi } from "../../../helpers/common";
import { setCommonError } from "../../user/Actions/userActions";
import { defaultError } from "../../../helpers/errorHandler";
import {IMigrationForm} from "../../../actions/accountActionTypes";

export function* sendMigrationFormSaga({ payload }: IMigrationForm) {
    try {
        const { form, onSuccess } = payload;
        yield call(fetchApi, "post", "201", { url: "/seo", mainUrl: apiUrl, body: form });
        onSuccess();
    } catch (err) {
        if (err?.code || err?.message) {
            yield put(
                setCommonError({
                    message: err?.message ? `Send migration form: ${err?.message}` : err?.code,
                    isBottomText: false,
                })
            );
        } else {
            yield put(setCommonError({ message: defaultError, isBottomText: false }));
        }
    }
}
