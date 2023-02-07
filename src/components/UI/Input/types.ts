import {
  isMetadataKeyValid,
  isWithdrawValid,
  isFolderNameValid,
  isFull,
  validateBucketName,
  validateFolderName,
} from "../../../helpers/common";
import { ISelectCustom } from "../SelectCustom/types";

export interface IInputText {
  value: string;
  label?: string;
  error: string;
  isError: boolean;
  isSuccess: boolean;
}

export interface IFormInputs {
  [key: string]: IInputText | ISelectCustom;
}

export const updateInputs = <T>(inputs: IFormInputs, field: string, subfield: keyof IInputText, valToSet: T) => {
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
export type FormDataType = Record<string, IInputText | ISelectCustom>;
export const validateInputs = (
  inputs: FormDataType,
  whatToValidate: string[],
  balanceCLS?: string,
  minimumWithdrawal?: number
): [FormDataType, string[]] => {
  const updatedInputs = { ...inputs };
  const errors: string[] = [];

  Object.entries(inputs).forEach((field) => {
    if (!isValidatable(field[0], whatToValidate)) {
      return;
    }
    const validationResult = validateField(field[1]["value"], field[0], balanceCLS, minimumWithdrawal);

    if (validationResult.length > 0) {
      updatedInputs[field[0]] = {
        value: field[1]["value"],
        error: validationResult,
        isError: validationResult.length > 0,
        isSuccess: false,
        label: field[1]["label"]
      } as IInputText | ISelectCustom;
      errors.push(validationResult);
    } else {
      updatedInputs[field[0]] = {
        value: field[1]["value"],
        error: "",
        isError: false,
        isSuccess: true,
        label: field[1]["label"]
      } as IInputText | ISelectCustom;
    }
  });

  return [updatedInputs, errors];
};

export const validateField = (
  value: string | { id?: string | number; name?: string },
  name: string,
  balanceCLS?: string,
  minimumWithdrawal?: number
): string => {
  if (
    (typeof value === "string" && value.length === 0) ||
    (typeof value === "object" && (value?.name?.length === 0 || !isFull(value?.id)))
  ) {
    return "Fill the field";
  }
  let result = "";

  if (typeof value === "string") {
    switch (name) {
      case "date": {
        const isValid = true;
        if (isValid) {
          result = "";
        } else {
          result = "Invalid date";
        }
        break;
      }
      case "email": {
        if (!validateEmail(value)) {
          result = "Enter correct email";
        }
        break;
      }
      case "nameBucket": {
        result = validateBucketName(value);
        break;
      }
      case "nameFolder": {
        result = validateFolderName(value);
        break;
      }
      case "nameItem": {
        if (!isFolderNameValid(value)) {
          result = "File can't contain slash (/) in its name.";
        }
        break;
      }
      case "metadataKey": {
        if (!isMetadataKeyValid(value)) {
          result = "Enter correct key name";
        }
        break;
      }
      case "withdraw": {
        if (!isWithdrawValid(value, minimumWithdrawal)) {
          result = `Minimum amount is ${minimumWithdrawal} CLS`;
        }
        if (Number(value) > Number(balanceCLS)) {
          // dell "* 10
          result = "Insufficient funds in balance";
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
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
