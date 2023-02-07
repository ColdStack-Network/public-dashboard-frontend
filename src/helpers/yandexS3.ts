import { ISearchedFilesListData } from "actions/interfaces";
import S3 from "aws-sdk/clients/s3";
import { aws4Interceptor } from "aws4-axios";
import axios, { AxiosResponse } from "axios";
import { VersioningBucketStatus } from "components/Table/types";
import { IBucket } from "Redux/buckets/reducer";
import { baseUrl, isFull, throwError, uriEncode } from "./common";
import { STORAGE_CLASSES_MAP } from "./constants";

let clientApi = axios.create({
  baseURL: baseUrl,
});

export const defaultRegion = "eu-central-1";

export let s3 = { client: null as S3 | null };

export const initSDK = ({ accessKeyId, secretAccessKey, region }) => {
  return new Promise((resolve, reject) => {
    clientApi = axios.create({
      baseURL: baseUrl,
    });
    s3 = { client: null as S3 | null };
    s3.client = new S3({
      signatureVersion: "v4",
      region: region,
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      endpoint: baseUrl,
    });
    clientApi.interceptors.request.use(
      aws4Interceptor(
        {
          region: defaultRegion,
          service: "s3",
        },
        {
          accessKeyId: accessKeyId,
          secretAccessKey: secretAccessKey,
        }
      )
    );
    setTimeout(() => {
      resolve(true);
    }, 100);
  });
};
export interface IFetchClientApiParams {
  url: string;
  query?: any;
  headers?: any;
  noFormat?: boolean;
}
export const fetchClientApi = async (method: string, codeSuccess = "200", params: IFetchClientApiParams) => {
  const { url, query, headers, noFormat } = params;

  try {
    let paramsFormed = noFormat ? {} : { format: "json" };
    if (isFull(query)) {
      paramsFormed = { ...paramsFormed, ...query };
    }
    const response = await clientApi(url, {
      method: method?.toUpperCase() as any,
      headers: { ...headers },
      params: paramsFormed,
    });

    if (+response.status !== +codeSuccess && +response.status !== 200) {
      throwError({ status: response.status, message: response?.data?.message });
    }
    return response;
  } catch (error) {
    if (error?.response) {
      console.log(
        "fetchClientApi error.response",
        error.response,
        "error.response?.data?.Error?.Message",
        error.response?.data?.Error?.Message,
        "error.response.status",
        error.response.status
      );
      throwError({
        status: error.response.status,
        message: error.response?.data?.Error?.Message || error?.response?.statusText,
      });
      /* The request was made and the server responded with a status code that falls out of the range of 2xx*/
    } else if (error?.request) {
      /* The request was made but no response was received, `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in Node.js*/
      throwError({ status: "", message: "No response" });
    } else if (error?.status) {
      // todo1: check for working correctly
      throwError({ status: error?.status, message: error?.message });
    } else {
      // Something happened in setting up the request and triggered an Error
      throwError({ status: "", message: error });
    }
  }
};

export interface ICheckCanUpload {
  CanUpload: boolean;
  Message?: string;
}

export const checkCanUpload = async () => {
  const response: AxiosResponse<ICheckCanUpload> | undefined = await fetchClientApi("get", "200", {
    url: "/?canUpload",
    noFormat: true,
  });
  return response?.data;
};

export interface ICheckCanDownload {
  CanDownload: boolean;
  Message?: string;
}

export const checkCanDownload = async () => {
  const response: AxiosResponse<ICheckCanDownload> | undefined = await fetchClientApi("get", "200", {
    url: "/?canDownload",
    noFormat: true,
  });
  return response?.data;
};

export interface ISearchedFile {
  Key: string;
  FileType: string;
  Bucket: string;
  FileName: string;
}

export interface ISearchFilesResult {
  Query: {
    perPage: number;
    page: number;
  };
  Files: ISearchedFile[];
}

export interface IGetSearchedFilesList {
  SearchFilesResult: ISearchFilesResult;
}

export const getSearchedFilesList = async ({ filename, pagination }: ISearchedFilesListData) => {
  const response: AxiosResponse<IGetSearchedFilesList> | undefined = await fetchClientApi("get", "200", {
    url: "/?searchFiles",
    query: {
      filename: filename,
      format: "json",
      page: pagination.Page,
      perPage: pagination.PerPage,
    },
  });
  return response?.data?.SearchFilesResult;
};

export interface IListAllMyBucketsExtendedResult {
  PerPage: number;
  Page: number;
  Owner: {
    ID: string;
    DisplayName: string;
  };
  Buckets: IBucket[];
}

export interface IGetListBuckets {
  ListAllMyBucketsExtendedResult: IListAllMyBucketsExtendedResult;
}
// List the photo albums that exist in the bucket
export const getListBuckets = async () => {
  const response: AxiosResponse<IGetListBuckets> | undefined = await fetchClientApi("get", "200", {
    url: "/?extendedBuckets",
  });
  return response?.data?.ListAllMyBucketsExtendedResult;
};

export interface getFilesProps {
  nameBucket: string;
  pathFolder: string;
  Page: number;
  PerPage: number;
  allTree?: boolean;
}

export interface ICommonPrefixes {
  Prefix: string;
  Size: string;
  SizeReadable: string;
  LastModified: string;
  ACL: string;
}

export interface IFoldersList extends ICommonPrefixes {
  Key: string;
}

export interface IContentsFile {
  Key: string;
  LastModified: string;
  ETag: string;
  Size: string;
  SizeReadable: string;
  StorageClass: string;
  StorageClassReadable: string;
  ContentType: string;
  ACL: string;
  FileType: string;
}

export interface IListExtendedObjects {
  Name: string;
  PerPage: number;
  Page: number;
  PagesCount: number;
  Prefix: string;
  KeyCount: number;
  AvailableKeyCount: number;
  Delimiter: string;
  IsTruncated: boolean;
  Contents: IContentsFile[];
  CommonPrefixes: ICommonPrefixes[];
}

export interface IGetListFiles {
  ListExtendedObjects: IListExtendedObjects;
}

export const getListFiles = async ({ nameBucket, pathFolder, Page, PerPage, allTree }: getFilesProps) => {
  let params = {
    format: "json",
    perPage: PerPage,
    page: Page,
    prefix: pathFolder ? `${pathFolder}/` : "",
  } as any;
  if (!allTree) {
    params.delimiter = "/";
  }
  const response: AxiosResponse<IGetListFiles> | undefined = await fetchClientApi("get", "200", {
    url: `/${nameBucket}?extendedObjects`,
    query: params,
  });
  return response?.data;
};

export interface IObjectExtendedInfo {
  CacheControl: string;
  ContentDisposition: string;
  ContentEncoding: string;
  ContentLanguage: string;
  Expires: string;
  ContentType: string;
  FileType: string;
  ETag: string;
  Size: number;
  SizeReadable: string;
  LastModified: string;
  StorageClass: string;
  StorageClassReadable: string;
  Metadata: Record<string, string>;
  ACL: "private" | "public-read";
  Owner: {
    ID: string;
    DisplayName: string;
  };
  VersionId: string;
}

export interface IFileInfo {
  ObjectExtendedInfo: IObjectExtendedInfo;
}

export const getFileInfoFunc = async ({
  nameFile,
  nameBucket,
  pathFolder,
}): Promise<IObjectExtendedInfo | undefined> => {
  const pathFolderEncoded = pathFolder ? uriEncode(pathFolder, false) : "";
  const nameEncoded = uriEncode(nameFile, false);
  let url = `/${nameBucket}/${pathFolderEncoded ? pathFolderEncoded : ""}${
    pathFolderEncoded ? "/" : ""
  }${nameEncoded}?extendedInfo`;
  url = url.replace("//", "/");
  const response: AxiosResponse<IFileInfo> | undefined = await fetchClientApi("get", "200", {
    url: url,
  });
  return response?.data?.ObjectExtendedInfo;
};

export const renameFileFunc = async ({ nameBucket, pathFolder, name, newName }) => {
  const pathFolderEncoded = pathFolder ? uriEncode(pathFolder, false) : "";
  const nameEncoded = uriEncode(name, false);
  const newNameEncoded = uriEncode(newName, false);

  let url = `/${nameBucket}/${pathFolderEncoded ? pathFolderEncoded : ""}${pathFolderEncoded ? "/" : ""}${nameEncoded}`;
  url = url.replace("//", "/");

  const response = await fetchClientApi("move", "204", {
    url: url,
    headers: {
      Destination: `${pathFolder ? pathFolderEncoded : ""}${pathFolder ? "/" : ""}${newNameEncoded}`,
    },
  });
  return response;
};

export const renameFolderFunc = async ({ nameBucket, pathFolder, name, newName }) => {
  const pathFolderEncoded = pathFolder ? uriEncode(pathFolder, false) : "";
  const nameEncoded = uriEncode(name, false);
  const newNameEncoded = uriEncode(newName, false);

  let url = `/${nameBucket}/${pathFolderEncoded ? pathFolderEncoded : ""}${
    pathFolderEncoded ? "/" : ""
  }${nameEncoded}/`;
  url = url.replace("//", "/");

  const response = await fetchClientApi("move", "200", {
    url: url,
    headers: {
      Destination: `${pathFolder ? pathFolderEncoded : ""}${pathFolder ? "/" : ""}${newNameEncoded}/`,
      "X-ColdStack-Prefix": "true",
    },
  });

  return response;
};
export const renameBucketFunc = async ({ nameBucket, name }) => {
  let url = `/${nameBucket}`;
  const response = await fetchClientApi("move", "204", {
    url: url,
    headers: {
      Destination: name,
    },
  });
  return response;
};

export type PutVersioningBucketReply = {
  Name: string;
  VersioningStatus: VersioningBucketStatus;
};
const getAwsClient = () => {
  if (s3 === null) throw new Error("Aws client not inited");
  return s3.client as S3;
};
export const putVersioningBucket = async (
  VersioningStatus: VersioningBucketStatus,
  Name: string
): Promise<PutVersioningBucketReply> => {
  const rep = await getAwsClient()
    ?.putBucketVersioning({
      Bucket: Name,
      VersioningConfiguration: { Status: VersioningStatus },
    })
    .promise();
  const error = rep.$response.error;
  if (error) throw new Error(error.message);
  return { Name, VersioningStatus };
};

export const privacyFileFunc = async ({ nameBucket, pathFolder, name, typePrivacy }) => {
  const pathFolderEncoded = pathFolder;
  let url = `${pathFolderEncoded ? pathFolderEncoded : ""}${pathFolderEncoded ? "/" : ""}${name}`;
  url = url.replace("//", "/");

  const data = await s3?.client
    ?.putObjectAcl({
      Bucket: nameBucket,
      Key: url,
      ACL: typePrivacy,
    })
    .promise();
  return data;
};

export const metadataFileFunc = async ({ nameBucket, nameFile, pathFolder, CopySource, Metadata }) => {
  const data = await s3?.client
    ?.copyObject({
      Bucket: nameBucket,
      Key: pathFolder ? pathFolder + "/" + nameFile : nameFile,
      CopySource: uriEncode(CopySource, false),
      Metadata: Metadata,
      MetadataDirective: "REPLACE",
    })
    .promise();
  return data;
};

export const deleteFileFunc = async ({ nameBucket, pathFolder, name }) => {
  const pathFolderEncoded = pathFolder;
  let url = `${pathFolderEncoded ? pathFolderEncoded : ""}${pathFolderEncoded ? "/" : ""}${name}`;
  url = url.replace("//", "/");

  const data = await s3?.client
    ?.deleteObject({
      Bucket: nameBucket,
      Key: url,
    })
    .promise();
  return data;
};
export const deleteMultiplyFilesFunc = async ({
  nameBucket,
  pathFolder,
  items,
}: {
  nameBucket: string;
  pathFolder: string;
  items: { name: string; type: string }[];
}) => {
  const firstPartUrl = `${pathFolder ? pathFolder : ""}${pathFolder ? "/" : ""}`;
  const urls = items.map((i) => ({ Key: `${firstPartUrl}${i.name}`.replace("//", "/") }));
  const data = await s3?.client
    ?.deleteObjects({
      Bucket: nameBucket,
      Delete: { Objects: urls },
    })
    .promise();
  return data;
};

export const deleteBucketFunc = async ({ nameBucket }) => {
  return new Promise((resolve, reject) => {
    console.log("deleteBucketFunc", nameBucket);
    const data = s3?.client?.deleteBucket(
      {
        Bucket: nameBucket,
      },
      function (err, data) {
        if (err) {
          console.log("Error s3.deleteBucketFunc", err);
          reject(err);
        } else {
          console.log("Success s3.deleteBucketFunc", data);
          resolve(data);
        }
      }
    );
    console.log("deleteBucketFunc data: ", data);
    return data;
  });
};

export const createFolderS3 = async ({ nameFolder, nameBucket, pathFolder }) => {
  return new Promise((resolve, reject) => {
    const data = s3?.client?.putObject(
      {
        Key: `${pathFolder ? pathFolder : ""}${pathFolder ? "/" : ""}${nameFolder}`,
        Bucket: nameBucket,
      },
      function (err, data) {
        if (err) {
          console.log("Error s3.createFolder", err);
          reject(err);
        } else {
          console.log("Success s3.createFolder", data);
          resolve(data);
        }
      }
    );
    console.log("s3.createFolder S3 data", data);
  });
};

export const createBucketS3 = async (name) => {
  return new Promise((resolve, reject) => {
    const res = s3?.client?.createBucket({ Bucket: name }, function (err, data) {
      if (err) {
        console.log("Error s3.createBucket", err, "Code", err?.code, err?.statusCode);
        reject(err);
      } else {
        console.log("Success s3.createBucket", data);
        resolve(data);
      }
    });
    console.log("res createBucket", res);
  });
};

export const uploadFileS3 = async (props) => {
  const { nameBucket, path, file, storageClass, onProgress, saveUploadInstance } = props;
  return new Promise((resolve, reject) => {
    console.log("uploadFileS3 file", props);
    const upload = new S3.ManagedUpload({
      params: {
        Bucket: nameBucket,
        Key: path,
        Body: file,
        ContentType: file.type,
        StorageClass: STORAGE_CLASSES_MAP[storageClass],
      },
      service: s3?.client as any,
    });
    saveUploadInstance(upload);
    upload.on("httpUploadProgress", function (progress) {
      //console.log("progress", progress);
      onProgress(progress);
    });
    const promise = upload.promise();

    return promise.then(
      function (data) {
        console.log("Successfully uploaded photo.", data);

        resolve(data);
      },
      function (err) {
        console.error("There was an error uploading your file: ", err?.message);
        if (err?.code === "RequestAbortedError") {
          resolve(err);
        } else {
          reject(err);
        }
      }
    );
  });
};

export const getDownloadLinkS3 = async ({ nameBucket, nameFile, pathFolder }) => {
  console.log("getDownloadLinkS3", nameBucket, nameFile);
  const nameEncoded = nameFile;
  const pathFolderEncoded = pathFolder ? pathFolder : "";
  let key = `${pathFolderEncoded ? pathFolderEncoded : ""}${pathFolderEncoded ? "/" : ""}${nameEncoded}`;
  key = key.replace("//", "/");

  const link = await s3?.client?.getSignedUrl("getObject", {
    Bucket: nameBucket,
    Key: key,
    ResponseContentDisposition: `attachment; filename="${nameEncoded}"`,
  });
  console.log("link download", link);
  return { link: link, name: nameFile };
};
