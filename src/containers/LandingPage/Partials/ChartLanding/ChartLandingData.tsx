import amazonS3MiniLogo from "images/amazonS3MiniLogo.png";
import coldstackMiniLogo from "images/coldstackMiniLogo.png";
import googleCloudMiniLogo from "images/googleCloudMiniLogo.png";
import microsoftAzyreMiniLogo from "images/microsoftAzyreMiniLogo.png";

export const data = (coldstack, azure, amazon, google) => [
  {
    cloud: "Coldstack",
    value: coldstack,
    icon: coldstackMiniLogo,
    columnSettings: { fill: "rgba(0, 83, 241, 0.6)" },
    color: "#0053F1",
  },
  {
    cloud: "Microsoft Azure",
    value: azure,
    icon: microsoftAzyreMiniLogo,
    columnSettings: { fill: "rgba(35, 115, 186, 0.6)" },
    color: "#0089D6",
  },
  {
    cloud: "Amazon S3",
    value: amazon,
    icon: amazonS3MiniLogo,
    columnSettings: { fill: "rgba(255, 153, 0, 0.6)" },
    color: "#FF9900",
  },
  {
    cloud: "Google Cloud",
    value: google,
    icon: googleCloudMiniLogo,
    columnSettings: { fill: "rgba(234, 67, 53, 0.6)" },
    color: "#EA4335",
  },
];
