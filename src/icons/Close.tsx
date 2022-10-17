import * as React from "react";

function SvgCloseIcon({color = "#5A5D65"}) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 6L18 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

  );
}

export default SvgCloseIcon;

function SvgCloseRound() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4L4 12" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 4L12 12" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export {SvgCloseRound};