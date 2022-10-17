import * as React from "react";

const SvgMessage = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="6" width="16" height="12" rx="2" stroke="#333333" strokeWidth="2"/>
      <path d="M4 9L11.1056 12.5528C11.6686 12.8343 12.3314 12.8343 12.8944 12.5528L20 9" stroke="#333333" strokeWidth="2"/>
    </svg>

  );
}

const SvgMessageOpen = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 10.4721C4 9.26932 4 8.66791 4.2987 8.18461C4.5974 7.7013 5.13531 7.43234 6.21115 6.89443L10.2111 4.89443C11.089 4.45552 11.5279 4.23607 12 4.23607C12.4721 4.23607 12.911 4.45552 13.7889 4.89443L17.7889 6.89443C18.8647 7.43234 19.4026 7.7013 19.7013 8.18461C20 8.66791 20 9.26932 20 10.4721V16C20 17.8856 20 18.8284 19.4142 19.4142C18.8284 20 17.8856 20 16 20H8C6.11438 20 5.17157 20 4.58579 19.4142C4 18.8284 4 17.8856 4 16V10.4721Z" stroke="#5A5D65" strokeWidth="2"/>
      <path d="M4 10L6.41421 12.4142C6.78929 12.7893 7.29799 13 7.82843 13H16.1716C16.702 13 17.2107 12.7893 17.5858 12.4142L20 10" stroke="#5A5D65" strokeWidth="2" strokeLinecap="round"/>
    </svg>

  );
}

export {SvgMessage, SvgMessageOpen}
