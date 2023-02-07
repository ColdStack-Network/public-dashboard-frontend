import { SvgFileAudio, SvgFileDoc, SvgFileFolder, SvgFileImage, SvgFileVideo } from "../../icons/FileTypes";

export enum TBucketFiles {
  folder = "folder",
  image = "image",
  file = "file",
  video = "video",
  audio = "audio",
}

export type VersioningBucketStatus = "Disabled" | "Enabled" | "Suspended";

export const iconsFiles = {
  [TBucketFiles.folder]: <SvgFileFolder />,
  [TBucketFiles.image]: <SvgFileImage />,
  [TBucketFiles.file]: <SvgFileDoc />,
  [TBucketFiles.video]: <SvgFileVideo />,
  [TBucketFiles.audio]: <SvgFileAudio />,
};

export enum TStorageClasses {
  frequentAccess = "Frequent Access",
  infrequentAccess = "Infrequent Access",
  coldStorage = "Cold Storage",
  aITiering = "AI Tiering",
  deepArchive = "Deep Archive",
}

export interface IBucketListItem {
  CreationDate: any;
  Name: string;
  ObjectsWithoutFoldersCount: string;
  VersioningStatus: VersioningBucketStatus;
}

export interface IAccessKeyListItem {
  user: string;
  key: string;
  status: string;
  time: number;
}

export interface IStorageClassesListItem {
  "Glacier Deep Archive": string;
  "Glacier Flexible Retrieval": string;
  "Glacier Instant Retrieval": string;
  "Intelligent-Tiering": string;
  Standard: string;
  "Standard-IA": string;
  name: string;
}
