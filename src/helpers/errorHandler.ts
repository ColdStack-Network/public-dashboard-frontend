export const processError = (error: any, method)=>{
  const code = error?.code;
  let result = "";
  if (method === "createBucket"){
    switch(code){
      case "BucketAlreadyExists":{
        result = "Bucket already exists";
        break;
      }
      case "InvalidBucketName":{
        result = "Invalid bucket name";
        break;
      }
      case "InvalidRequest":{
        result = "You can not have more than 100 buckets";
        break;
      }
      default:{}
    }
  }
  if (method === "renameBucket"){
    switch(code){
      case "BucketAlreadyExists":{
        result = "Bucket already exists";
        break;
      }
      case "InvalidBucketName":{
        result = "Invalid bucket name";
        break;
      }
      default:{}
    }
  }
  if (method === "getObject"){
    switch(code){
      case "NoSuchKey":{
        result = "The requested object was not found";
        break;
      }
      case "InternalError":{
        result = "Internal Error";
        break;
      }
      default:{}
    }
  }
  if (method === "putObject"){
    switch(code){
      case "InternalError":{
        result = "Internal Error";
        break;
      }
      default:{}
    }
  }

  if (result?.length === 0){
    if (code?.length > 0){
      result = code;
    }
  }

  return result;
}

export enum methods{
  createBucket = "createBucket",
  renameBucket = "renameBucket",
  getObject = "getObject",
  putObject= "putObject"
}

export const defaultError = "Something went wrong."