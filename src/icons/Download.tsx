import * as React from "react";

function SvgDownload() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="15" width="14" height="4" rx="2" fill="#7E869E" fillOpacity="0.25" />
      <path
        d="M12 14L11.5757 14.4243L12 14.8485L12.4243 14.4243L12 14ZM12.6 5C12.6 4.66863 12.3314 4.4 12 4.4C11.6686 4.4 11.4 4.66863 11.4 5L12.6 5ZM6.57574 9.42426L11.5757 14.4243L12.4243 13.5757L7.42426 8.57574L6.57574 9.42426ZM12.4243 14.4243L17.4243 9.42426L16.5757 8.57574L11.5757 13.5757L12.4243 14.4243ZM12.6 14L12.6 5L11.4 5L11.4 14L12.6 14Z"
        fill="#CCD2E3"
      />
      <path
        d="M5 16L5 17C5 18.1046 5.89543 19 7 19L17 19C18.1046 19 19 18.1046 19 17V16"
        stroke="#CCD2E3"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export default SvgDownload;

const SvgDownloadDark = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 14L11.2929 14.7071L12 15.4142L12.7071 14.7071L12 14ZM13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44771 11 5L13 5ZM6.29289 9.70711L11.2929 14.7071L12.7071 13.2929L7.70711 8.29289L6.29289 9.70711ZM12.7071 14.7071L17.7071 9.70711L16.2929 8.29289L11.2929 13.2929L12.7071 14.7071ZM13 14L13 5L11 5L11 14L13 14Z"
        fill="#333333"
      />
      <path
        d="M5 16L5 17C5 18.1046 5.89543 19 7 19L17 19C18.1046 19 19 18.1046 19 17V16"
        stroke="#333333"
        strokeWidth="2"
      />
    </svg>
  );
};

const SvgDownloadWhite = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 14L11.2929 14.7071L12 15.4142L12.7071 14.7071L12 14ZM13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44771 11 5L13 5ZM6.29289 9.70711L11.2929 14.7071L12.7071 13.2929L7.70711 8.29289L6.29289 9.70711ZM12.7071 14.7071L17.7071 9.70711L16.2929 8.29289L11.2929 13.2929L12.7071 14.7071ZM13 14L13 5L11 5L11 14L13 14Z"
        fill="white"
      />
      <path
        d="M5 16L5 17C5 18.1046 5.89543 19 7 19L17 19C18.1046 19 19 18.1046 19 17V16"
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  );
};
export { SvgDownloadDark, SvgDownloadWhite };
