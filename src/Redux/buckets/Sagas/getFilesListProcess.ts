import { IGetFiles } from "actions/actionTypes";
import { call, put } from "redux-saga/effects";
import { getListFiles, IContentsFile, IGetListFiles } from "helpers/yandexS3";
import { setFilesList } from "../Actions/bucketsActions";
import { defaultError } from "helpers/errorHandler";
import { setCommonError } from "../../user/Actions/userActions";

export function* getFilesListProcess({ payload }: IGetFiles) {
  const { pagination, nameBucket, pathFolder, afterLoad } = payload;
  const { Page, PerPage } = pagination;
  try {
    const data: IGetListFiles = yield call(getListFiles, { nameBucket, pathFolder, Page, PerPage });
    const list = data?.ListExtendedObjects;
    const filesListNotEmpty = list?.Contents.filter((el) => {
      return el?.Key !== list.Prefix;
    });
    const filesList: IContentsFile[] = filesListNotEmpty
      ? filesListNotEmpty.map((el) => {
          let key = el?.Key;
          const folder = `${pathFolder}/`;
          if (key.indexOf(folder) === 0) {
            key = key.replace(folder, "");
          }
          return { ...el, Key: key };
        })
      : [];

    const foldersList = list?.CommonPrefixes
      ? list?.CommonPrefixes.map((el) => {
          let key = el?.Prefix;
          const folder = `${pathFolder}/`;
          if (key.indexOf(folder) === 0) {
            key = key.replace(folder, "");
          }
          return { ...el, Key: key };
        })
      : [];
    const pagination = {
      page: list?.Page > list?.PagesCount ? list?.PagesCount : list?.Page,
      perPage: list?.PerPage,
      pagesCount: list?.PagesCount,
    };
    yield put(
      setFilesList({
        filesList: filesList,
        foldersList: foldersList,
        nameBucket: nameBucket,
        pathFolder: pathFolder,
        pagination: pagination,
      })
    );

    afterLoad();
  } catch (err) {
    if (err?.code || err?.message) {
      yield put(setCommonError({ message: err?.message ? err.message : err?.code, isBottomText: false }));
    } else {
      yield put(setCommonError({ message: defaultError, isBottomText: true }));
    }
    afterLoad();
  }
}
