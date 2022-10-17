import AWS from "aws-sdk";
import axios from 'axios';
import {aws4Interceptor} from 'aws4-axios';
import {baseUrl,  isFull, throwError, uriEncode} from "./common";

let clientApi = axios.create({
  baseURL: baseUrl
});

export const defaultRegion = "eu-central-1";

export let s3 = {client: null as AWS.S3 | null};

export const initSDK = ({accessKeyId, secretAccessKey, region}) => {
  return new Promise((resolve, reject) => {
    clientApi = axios.create({
      baseURL: baseUrl
    });
    s3 = {client: null as AWS.S3 | null};
    //console.log("accessKeyId, secretAccessKey, region", accessKeyId, secretAccessKey, region);
    AWS.config.update({
      region: region,
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    });
    s3.client = new AWS.S3({
      endpoint: new AWS.Endpoint(baseUrl as string),
      signatureVersion: 'v4'
    })
    clientApi.interceptors.request.use(aws4Interceptor({
      region: defaultRegion,
      service: 's3',
    }, {
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    }));
    setTimeout(() => {
      resolve(true);
    }, 100)
  })
}
export interface IFetchClientApiParams {
  url: string,
  query?: any,
  headers?: any,
  noFormat?: boolean
}
export const fetchClientApi = async (method: string, codeSuccess = "200", params: IFetchClientApiParams) => {
  const {url, query, headers, noFormat} = params;

  try {
    let paramsFormed = noFormat ? {} : {format: 'json'};
    if (isFull(query)) {
      paramsFormed = {...paramsFormed, ...query}
    }
    const response = await clientApi(url, {
      method: method?.toUpperCase() as any,
      headers: {...headers},
      params: paramsFormed
    });
    console.log("fetchClientApi response", response);

    if (+response.status !== +codeSuccess && +response.status !== 200) {
      throwError({status: response.status, message: response?.data?.message})
    }
    return response
  }catch (error){
    if (error?.response) {
      console.log("fetchClientApi error.response", error.response, "error.response?.data?.Error?.Message", error.response?.data?.Error?.Message, "error.response.status", error.response.status);
      throwError({status: error.response.status, message: error.response?.data?.Error?.Message || error?.response?.statusText})
      /* The request was made and the server responded with a status code that falls out of the range of 2xx*/
    } else if (error?.request) {
      /* The request was made but no response was received, `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in Node.js*/
      throwError({status: '', message: "No response"})
    } else if (error?.status) { // todo1: check for working correctly
      throwError({status: error?.status, message: error?.message})
    } else {
      // Something happened in setting up the request and triggered an Error
      throwError({status: '', message: error});
    }
  }
}
export const getStatisticsHome = async () => {

  /*const response = await clientApi.get('/?statistics', {
    params: {format: 'json'}
  });*/
  const response = await fetchClientApi("get", "200", {url: '/?statistics'})
  return response?.data;


}
export const checkCanUpload = async () => {
  const response = await fetchClientApi("get", "200", {url: '/?canUpload', noFormat: true})
  return response?.data;
}
export const checkCanDownload = async () => {
  const response = await fetchClientApi("get", "200", {url: '/?canDownload', noFormat: true})
  return response?.data;
}
export const getBandwidthAnalytics = async (from, to) => {
  /*const response = await clientApi.get('/?bandwidthAnalytics', {
    params: {
      format: 'json',
    }
  });*/

  // const from = new Date();
  // from.setMonth(from.getMonth() - 1);

  const response = await fetchClientApi("get", "200",
    // {url: '/?bandwidthAnalytics',}
    {url: '/?bandwidthAnalytics', query: {format: 'json', fromDate: from, toDate: to}}
    // {url: '/?bandwidthAnalytics', query: {format: 'json', toDate: new Date()}}
    )
  return response?.data;
}

export const getStorageUsageAnalytics = async (from, to) => {
  /*const response = await clientApi.get('/?storageAnalytics', {
    params: {
      format: 'json',
    }
  });*/

  // const from = new Date();
  // from.setMonth(from.getMonth() - 1);


  // console.log("from",from)
  // console.log("to",to)


  const response = await fetchClientApi("get", "200",
    // {url: '/?storageAnalytics'}
    {url: '/?storageAnalytics', query: {format: 'json', fromDate: from, toDate: to}}
    // {url: '/?storageAnalytics', query: {format: 'json', toDate: new Date()}}

  )
  return response?.data
}

export const getSearchedFilesList = async ({filename, pagination}) => {
  /* const response = await clientApi.get('/?searchFiles', {
     params: {
       filename: filename,
       format: 'json',
       page: pagination.Page,
       perPage: pagination.PerPage,
     },
   });*/
  const response = await fetchClientApi("get", "200", {
    url: '/?searchFiles', query: {
      filename: filename,
      format: 'json',
      page: pagination.Page,
      perPage: pagination.PerPage,
    }
  })
  return response?.data?.SearchFilesResult;
}

// List the photo albums that exist in the bucket
export const getListBuckets = async () => {

  /* const response = await clientApi.get('/?extendedBuckets', {
     params: {
       format: 'json',
       PerPage: 1000000,
       Page: 1,
     },
   });*/
  const response = await fetchClientApi("get", "200", {
    url: '/?extendedBuckets'})
  return response?.data?.ListAllMyBucketsExtendedResult;


  /*return new Promise((resolve, reject) =>{
    try {

      const response = clientApi.get('/?extendedBuckets', {
        params: {
          format: 'json',
          perPage: 10,
          page: 1,
        },
      });

      const data = s3?.client?.listBuckets(function (err, data) {
        if (err) {
          console.log("Error s3.listBuckets", err);
          resolve("");
        } else {
          console.log("Success s3.listBuckets", data);
          resolve(data)
        }
      });
      console.log("s3.listBuckets S3 data", data);
    } catch (err: any) {
      console.log("There was an error s3.listBuckets: " + err);
      resolve("");

    }
  })*/
};

export interface getFilesProps {
  nameBucket: string,
  pathFolder: string,
  Page: number,
  PerPage: number,
  allTree?: boolean
}

export const getListFiles = async ({nameBucket, pathFolder, Page, PerPage, allTree}: getFilesProps) => {
  //console.log("Page, PerPage", Page, PerPage);
  let params = {
    format: 'json',
    perPage: PerPage,
    page: Page,
    prefix: pathFolder ? `${pathFolder}/` : "",
  } as any;
  if (allTree !== true) {
    params.delimiter = '/'
  }
 /* const response = await clientApi.get(`/${nameBucket}?extendedObjects`, {
    params: params
  });*/
  const response = await fetchClientApi("get", "200", {url: `/${nameBucket}?extendedObjects`, query: params})
  return response?.data

  /*return new Promise((resolve, reject)=>{
    try{
      const data = s3?.client?.listObjectsV2({Bucket: nameBucket, Delimiter: '/', MaxKeys: 10,  }, function (err, data) {
        if (err) {
          console.log("Error s3.getListFiles", err);
          resolve("");
        } else {
          console.log("Success s3.getListFiles", data);
          resolve(data)
        }
      })
      console.log("s3.getListFiles S3 data", data);
    }
    catch(err){
      console.log("There was an error s3.getListFiles: " + err);
      resolve("");
    }
  })*/
}

export const getFileInfoFunc = async ({nameFile, nameBucket, pathFolder}) => {
  const pathFolderEncoded = pathFolder ? uriEncode(pathFolder, false) : "";
  const nameEncoded = uriEncode(nameFile, false);
  let url = `/${nameBucket}/${pathFolderEncoded ? pathFolderEncoded : ""}${pathFolderEncoded ? "/" : ""}${nameEncoded}?extendedInfo`;
  url = url.replace("//", "/");
  /*const response = await clientApi.get(url, {
    params: {
      format: 'json',
    },
  });*/
  const response = await fetchClientApi("get", "200", {url: url})
  return response?.data?.ObjectExtendedInfo


  /*return new Promise((resolve, reject) =>{
    try {
      console.log("nameFile, nameBucket, pathFolder!!", nameFile, nameBucket, pathFolder);
      let url = `${pathFolder ? pathFolder : ""}${pathFolder ? "/" : ""}${nameFile}`;
      url.replace("//", "/");
      console.log("URL===",url);

      const data =  s3?.client?.headObject({
        Bucket: nameBucket,
        Key: url,
      }, function (err, data) {
        if (err){
          console.log("error s3.getFileInfo", err);
          resolve (err)
        }else{
          console.log("success s3.getFileInfo", data);
          resolve(data)
        }
      });
      console.log("s3.getFileInfo S3 data", data);
    }
    catch(err){
      console.log("There was an error s3.getFileInfo: " + err);
      resolve("");
    }
  });*/
}

export const renameFileFunc = async ({nameBucket, pathFolder, name, newName}) => {

  const pathFolderEncoded = pathFolder ? uriEncode(pathFolder, false) : "";
  const nameEncoded = uriEncode(name, false);
  const newNameEncoded = uriEncode(newName, false);
  // const newNameEncoded =  newName;

  // const pathFolderEncoded = pathFolder;
  // const nameEncoded = name;
  // const nameEncoded = decodeURIComponent(name);


  let url = `/${nameBucket}/${pathFolderEncoded ? pathFolderEncoded : ""}${pathFolderEncoded ? "/" : ""}${nameEncoded}`;
  url = url.replace("//", "/");

  /*const data = await clientApi(url, {
    method: 'MOVE' as any,
    headers: {
      'Destination': `${pathFolder ? pathFolderEncoded : ""}${pathFolder ? "/" : ""}${newNameEncoded}`
    },
    params: {format: 'json'}
  });*/
  const response = await fetchClientApi("move", "204", {
    url: url,
    headers: {
      'Destination': `${pathFolder ? pathFolderEncoded : ""}${pathFolder ? "/" : ""}${newNameEncoded}`
    }
  })
  return response;
}

export const renameFolderFunc = async ({nameBucket, pathFolder, name, newName}) => {

  const pathFolderEncoded = pathFolder ? uriEncode(pathFolder, false) : "";

  // const pathFolderEncoded = pathFolder ? pathFolder : "";
  const nameEncoded = uriEncode(name, false);
  const newNameEncoded = uriEncode(newName, false);
  // const nameEncoded = name;
  // const newNameEncoded =  newName;
  // const pathFolderEncoded = pathFolder;
  // const nameEncoded = decodeURIComponent(name);

  let url = `/${nameBucket}/${pathFolderEncoded ? pathFolderEncoded : ""}${pathFolderEncoded ? "/" : ""}${nameEncoded}/`;
  url = url.replace("//", "/");

  console.log("url", url)

  /*const response = await clientApi(url, {
    method: 'MOVE' as any,
    headers: {
      'Destination': `${pathFolder ? pathFolderEncoded : ""}${pathFolder ? "/" : ""}${newNameEncoded}/`,
      'X-ColdStack-Prefix': 'true',
    }
  });*/

  const response = await fetchClientApi("move", "200", {
    url: url,
    headers: {
      'Destination': `${pathFolder ? pathFolderEncoded : ""}${pathFolder ? "/" : ""}${newNameEncoded}/`,
      'X-ColdStack-Prefix': 'true',
    }
  })

  return response;
}
export const renameBucketFunc = async ({nameBucket, name}) => {
  let url = `/${nameBucket}`;
  /*  const data = await clientApi(url, {
      method: 'MOVE' as any,
      headers: {
        'Destination': name
      },
      params: {format: 'json'}
    });*/
  const response = await fetchClientApi("move", "204", {
    url: url,
    headers: {
      'Destination': name
    }
  })
  return response;
}

export const privacyFileFunc = async ({nameBucket, pathFolder, name, typePrivacy}) => {
  /*const pathFolderEncoded = pathFolder ? uriEncode(pathFolder, false) : "";
  const nameEncoded =  uriEncode(name, false);*/
  const pathFolderEncoded = pathFolder;
  const nameEncoded = name;
  let url = `${pathFolderEncoded ? pathFolderEncoded : ""}${pathFolderEncoded ? "/" : ""}${nameEncoded}`;
  url = url.replace("//", "/");

  const data = await s3?.client?.putObjectAcl({
    Bucket: nameBucket,
    Key: url,
    ACL: typePrivacy,
  }).promise();
  return data;
}

export const metadataFileFunc = async ({nameBucket, nameFile, pathFolder, CopySource, Metadata}) => {

  const data = await s3?.client?.copyObject({
    Bucket: nameBucket,
    Key: pathFolder ? pathFolder + '/' + nameFile : nameFile,
    CopySource: uriEncode(CopySource, false),
    Metadata: Metadata,
    MetadataDirective: 'REPLACE'
  }).promise();
  return data;
}

export const deleteFileFunc = async ({nameBucket, pathFolder, name}) => {
  /* const pathFolderEncoded = pathFolder ? uriEncode(pathFolder, false) : "";
   const nameEncoded =  uriEncode(name, false);*/
  const pathFolderEncoded = pathFolder;
  const nameEncoded = name;
  let url = `${pathFolderEncoded ? pathFolderEncoded : ""}${pathFolderEncoded ? "/" : ""}${nameEncoded}`;
  url = url.replace("//", "/");

  const data = await s3?.client?.deleteObject({
    Bucket: nameBucket,
    Key: url,
  }).promise();
  console.log("deleteFileFunc data: ", data);
  return data;


  /*return new Promise((resolve, reject)=>{
    try{
      const data = s3?.client?.deleteObject(
        {
          Bucket: nameBucket,
          Key: url
        }, function (err, data) {
        if (err) {
          console.log("Error s3.deleteFileFunc", err);
          resolve("");
        } else {
          console.log("Success s3.deleteFileFunc", data);
          resolve(data)
        }
      })
      console.log("s3.deleteFileFunc S3 data", data);
    }
    catch(err){
      console.log("There was an error s3.createFolder: " + err);
      console.log("error s3.createFolder: ", err);
      resolve("");
    }
  })*/

}
export const deleteBucketFunc = async ({nameBucket}) => {
  return new Promise((resolve, reject) => {
    console.log("deleteBucketFunc", nameBucket);
    const data = s3?.client?.deleteBucket({
      Bucket: nameBucket
    }, function (err, data) {
      if (err) {
        console.log("Error s3.deleteBucketFunc", err);
        reject(err);
      } else {
        console.log("Success s3.deleteBucketFunc", data);
        resolve(data)
      }
    });
    console.log("deleteBucketFunc data: ", data);
    return data;
  })
}

export const createFolderS3 = async ({nameFolder, nameBucket, pathFolder}) => {

  return new Promise((resolve, reject) => {
    const data = s3?.client?.putObject({
      Key: `${pathFolder ? pathFolder : ""}${pathFolder ? "/" : ""}${nameFolder}`,
      Bucket: nameBucket
    }, function (err, data) {
      if (err) {
        console.log("Error s3.createFolder", err);
        reject(err);
      } else {
        console.log("Success s3.createFolder", data);
        resolve(data)
      }
    })
    console.log("s3.createFolder S3 data", data);
  })
}

/*export const createBucketS3 = async (name) => {
  return new Promise((resolve, reject) => {
    try {
      const res = s3?.client?.createBucket({Bucket: name}, function (err, data) {
        if (err) {
          console.log("Error s3.createBucket", err);
          resolve("");
        } else {
          console.log("Success s3.createBucket", data);
          resolve(data)
        }
      });
      console.log("res createBucket", res);
    } catch (err) {
      console.log("There was an error s3.createBucket: " + err);
      console.log("error s3.createBucket: ", err);
      resolve("");
    }
  })
}*/
export const createBucketS3 = async (name) => {
  return new Promise((resolve, reject) => {
    const res = s3?.client?.createBucket({Bucket: name}, function (err, data) {
      if (err) {
        console.log("Error s3.createBucket", err, "Code", err?.code, err?.statusCode);
        reject(err);
      } else {
        console.log("Success s3.createBucket", data);
        resolve(data)
      }
    });
    console.log("res createBucket", res);

  })
}

/*file: File
filepath: "cirir.jpg"
lastModified: 1616409389833
lastModifiedDate: Mon Mar 22 2021 12:36:29 GMT+0200 (Восточная Европа, стандартное время) {}
name: "cirir.jpg"
size: 139713
type: "image/jpeg"
webkitRelativePath: ""
__proto__: File
nameBucket: "bucket11"
onProgress: progress => {…}
path: "folder2/cirir.jpg"
saveUploadInstance: instance => {…}

file:
  arrayBuffer: ƒ arrayBuffer()
filepath: "docotr.jpeg"
lastModified: 1620805204090
lastModifiedDate: {}
name: "docotr.jpeg"
size: 26002
slice: ƒ slice()
stream: ƒ stream()
text: ƒ text()
type: "image/jpeg"
webkitRelativePath: ""
__proto__: Object
nameBucket: "bucket11"
onProgress: progress => {…}
path: "folder2/docotr.jpeg"
saveUploadInstance: instance => {…}*/



export const uploadFileS3 = async (props) => {
  const {nameBucket, path, file, onProgress, saveUploadInstance} = props;

  // file.filepath = uriEncode(file.filepath)
  // file.name = uriEncode(file.name)


  return new Promise((resolve, reject) => {
    console.log("uploadFileS3 file", props);


    //const photoKey = path?.length > 0 ? path + "/" + file.name :  file.name;
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: nameBucket,
        Key: path,
        Body: file,
        ContentType: file.type
      },
      service: s3?.client as any,
    });
    saveUploadInstance(upload);
    upload.on("httpUploadProgress", function (progress) {
      console.log("progress", progress)
      onProgress(progress);
    })
    const promise = upload.promise();

    promise.then(
      function (data) {
        console.log("Successfully uploaded photo.", data);
        resolve(data)
      },
      function (err) {
        console.log("There was an error uploading your photo: ", err?.message);
        reject(err)
      }
    );
    /*const upload = s3?.client?.upload({
        Bucket: nameBucket,
        Key: photoKey,
        Body: file
    }, function (err, data) {
      if (err) {
        console.log("Error addPhotoS3", err);
        resolve("");
      } else {
        console.log("Success addPhotoS3", data);
        resolve(data)
      }
    });*/
    // console.log("s3.upload S3 data", upload);
  })
}

export const getDownloadLinkS3 = async ({nameBucket, nameFile, pathFolder}) => {
  console.log("getDownloadLinkS3", nameBucket, nameFile);
  // const nameEncoded = uriEncode(nameFile, false);
  const nameEncoded = nameFile;
  // const pathFolderEncoded = pathFolder ? uriEncode(pathFolder, false) : "";
  const pathFolderEncoded = pathFolder ? pathFolder : "";
  let key = `${pathFolderEncoded ? pathFolderEncoded : ""}${pathFolderEncoded ? "/" : ""}${nameEncoded}`;
  key = key.replace("//", "/");

  const link = await s3?.client?.getSignedUrl('getObject', {
    Bucket: nameBucket,
    Key: key,
    ResponseContentDisposition: `attachment; filename="${nameEncoded}"`,
  });
  console.log("link download", link);
  return {link: link, name: nameFile};
}

/*
export async function addFile(albumName, file) {
  console.log("addFile", file);
  const name = file?.name;
  const type = file?.type;
  const size = file?.size;
  console.log("addFile name", name);
  const tmp = name.split(".");
  const type2 = tmp?.[tmp.length - 1];
  const fileName = `${uuidv4()}.${type2}`;
  const albumPhotosKey = encodeURIComponent(albumName) + "/";
  const photoKey = albumPhotosKey + fileName;

  const upload = s3.client.upload({
    Bucket: albumBucketName,
    Key: photoKey,
    Body: file,
  });

  const promise = upload.promise();

  return promise.then(
    function (data) {
      console.log("upload data", data, "name", name);
      return {
        success: true,
        error: "",
        location: data?.Location,
        name: name,
        type: type,
        size: size,
      };
    },
    function (err) {
      return {
        success: false,
        error: err.message,
        location: "",
        name: "",
        type: "",
        size: 0,
      };
    }
  );
}*/
