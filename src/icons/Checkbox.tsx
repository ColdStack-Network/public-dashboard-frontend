import * as React from "react";

export const SvgCheckboxChecked = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="14" height="14" rx="2" fill="#1FCF90" stroke="#1FCF90" strokeWidth="2" />
      <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" />
    </svg>
  );
};

export const SvgCheckboxUnChecked = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="14" height="14" rx="2" stroke="#CCD2E3" strokeWidth="2" />
    </svg>
  );
};

export const SvgCheckboxCheckedGray = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="14" height="14" rx="2" stroke="#5A5D65" strokeWidth="2" />
      <path d="M8 12L11 15L16 9" stroke="#5A5D65" strokeWidth="2" />
    </svg>
  );
};
export const SvgCheckboxCheckedDisabled = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="14" height="14" rx="2" stroke="#A6B4CE" strokeWidth="2" />
      <path d="M8 12L11 15L16 9" stroke="#A6B4CE" strokeWidth="2" />
    </svg>
  );
};
