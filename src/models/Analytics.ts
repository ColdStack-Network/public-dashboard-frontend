export type StorageUsageAnalyticsRecord = {
  Timestamp: string | Date;
  UsedStorage: string;
  UsedStorageReadable: string;
};

export interface BandwidthAnalyticsRecord {
  Date: string | Date;
  Timestamp: string | Date;
  DownloadBandwidth: string;
  DownloadBandwidthReadable: string;
  UploadBandwidth: string;
  UploadBandwidthReadable: string;
}

export type StorageUsageAnalytics = {
  Records: StorageUsageAnalyticsRecord[];
};

export type GetStorageUsageAnalyticsRep = {
  StorageUsageAnalytics: StorageUsageAnalytics;
};

export interface BandwidthAnalytics {
  Records: BandwidthAnalyticsRecord[];
}

export interface GetBandwidthAnalyticsRep {
  BandwidthAnalytics: BandwidthAnalytics;
}
