import {
  isMetadataKeyValid,
  isWithdrawValid,
  isFolderNameValid,
  isFull,
  validateBucketName
} from "../../../helpers/common";
import {ISelectCustom} from "../SelectCustom/types";

export interface IInputText {
  value: string;
  error: string;
  isError: boolean;
  isSuccess: boolean;
}

export interface IFormInputs { [key: string]: IInputText | ISelectCustom }

export const updateInputs = (
  inputs: IFormInputs,
  field: string,
  subfield: keyof IInputText,
  valToSet: any
) => {
  return {
    ...inputs,
    [field]: {
      ...inputs[field],
      [subfield]: valToSet,
    },
  };
};

const isValidatable = (field: string, whatToValidate: string[]): boolean => {
  return whatToValidate.find((item) => item === field) !== undefined;
};

export const validateInputs = (
  inputs: IFormInputs,
  whatToValidate: string[],
  balanceCLS? : string
): [IFormInputs, string[]] => {
  const updatedInputs = { ...inputs } as IFormInputs;
  const errors = [] as string[];
  //console.log("inputs!=", inputs);

  console.log("whatToValidate",whatToValidate)

  Object.entries(inputs).forEach((field) => {
    if (!isValidatable(field[0], whatToValidate)) {
      return;
    }
    const validationResult = validateField(field[1]["value"], field[0], balanceCLS );
    //console.log("validationResult", validationResult);

    if (validationResult.length > 0) {
      updatedInputs[field[0]] = {
        value: field[1]["value"],
        error: validationResult,
        isError: validationResult.length > 0,
        isSuccess: false,
      } as IInputText | ISelectCustom;
      errors.push(validationResult);
    } else {
      updatedInputs[field[0]] = {
        value: field[1]["value"],
        error: "",
        isError: false,
        isSuccess: true,
      } as IInputText | ISelectCustom;
    }
  });

  return [updatedInputs, errors];
};

export const validateField = (
  value: string | { id?: string | number; name?: string },
  name: string,
  balanceCLS?: string
): string => {
  if (
    (typeof value === "string" && value.length === 0) ||
    (typeof value === "object" &&
      (value?.name?.length === 0 || !isFull(value?.id)))
  ) {
    return "Fill the field";
  }
  let result = "";

  if (typeof value === "string") {
    switch (name) {
      case "date": {
        //const [day, month, year] = value.split("/");
        //const isValid = isValidDate(day, month, year);
        const isValid = true;
        if (isValid) {
          result = "";
        } else {
          result = "Invalid date";
        }
        break;
      }
      case "email":{
        if (!validateEmail(value)){
          result = "Enter correct email"
        }
        break;
      }
      case "nameBucket":{
        result = validateBucketName(value)
        break;
      }
      case "nameFolder":{
        if (!isFolderNameValid(value)){
          result = "Folder can't contain slash (/) in its name."
        }
        break;
      }
      case "nameItem":{
        if (!isFolderNameValid(value)){
          result = "File can't contain slash (/) in its name."
        }
        break;
      }
      case "metadataKey":{
        if (!isMetadataKeyValid(value)){
          result = "Enter correct key name"
        }
        break;
      }
      case "withdraw":{
        if (!isWithdrawValid(value)){
          result = "Minimum amount is 25 CLS"
        }
        if (Number(value) > Number(balanceCLS)){ // dell "* 10
          result = "Insufficient funds in balance"
        }
        break;
      }
      default: {
      }
    }
  }
  return result;
};

 export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
