export type Statistics = {
  BucketsCount: number;
  ObjectsCount: number;
  UsedStorage: {
    UsedStorageBytes: string;
    UsedStorageReadableQuantity: string;
    UsedStorageReadableUnit: string;
  };
  Buckets: {
    Count: number;
  };
  Objects: {
    Count: number;
  };
  Bandwidth: {
    BandwidthBytes: string;
    BandwidthReadableQuantity: string;
    BandwidthReadableUnit: string;
  };
};

export type GetStatisticsRep = {
  Statistics: Statistics;
};
