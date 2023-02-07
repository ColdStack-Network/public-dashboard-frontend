import { IMetadataFile } from "actions/actionTypes";
import { call, put } from "redux-saga/effects";
import { metadataFileFunc } from "helpers/yandexS3";
import { getFileInfo } from "../Actions/bucketsActions";

export function* metadataFileProcess({ payload }: IMetadataFile) {
  const { nameBucket, nameFile, CopySource, Metadata, pathFolder } = payload;
  try {
    yield call(metadataFileFunc, { nameBucket, nameFile, pathFolder, CopySource, Metadata });
    yield put(
      getFileInfo({
        nameFile,
        nameBucket,
        pathFolder,
        afterLoad: () => {},
      })
    );
  } catch (err) {}
}
