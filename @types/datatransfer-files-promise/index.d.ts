declare module "datatransfer-files-promise" {
  export function getFilesFromDataTransferItems(items: DataTransferItemList): Promise<File[]>;
}
