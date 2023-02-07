import { ICloudPrice } from "../actions/interfaces";

export type PriceLandingPayloadType = {
  standard: {
    coldstack: ICloudPrice;
    amazonS3: ICloudPrice;
    googleCloud: ICloudPrice;
  };
  intelligentTiering: {
    coldstack: ICloudPrice;
    amazonS3: ICloudPrice;
    googleCloud: ICloudPrice;
  };
  standardIA: {
    coldstack: ICloudPrice;
    amazonS3: ICloudPrice;
    googleCloud: ICloudPrice;
  };
  glacier: {
    coldstack: ICloudPrice;
    amazonS3: ICloudPrice;
    googleCloud: ICloudPrice;
  };
  deepArchive: {
    coldstack: ICloudPrice;
    amazonS3: ICloudPrice;
    googleCloud: ICloudPrice;
  };
};
