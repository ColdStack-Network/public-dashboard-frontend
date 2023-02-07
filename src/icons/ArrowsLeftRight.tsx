import * as React from "react";

export const SvgArrowLeft = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 12L8.29289 11.2929L7.58579 12L8.29289 12.7071L9 12ZM14.2929 5.29289L8.29289 11.2929L9.70711 12.7071L15.7071 6.70711L14.2929 5.29289ZM8.29289 12.7071L14.2929 18.7071L15.7071 17.2929L9.70711 11.2929L8.29289 12.7071Z"
        fill="#5A5D65"
      />
    </svg>
  );
};

export const SvgArrowRight = ({ color }) => {
  const col = color === "secondary" ? "#0053F1" : "#5A5D65";
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 12L15.7071 11.2929L16.4142 12L15.7071 12.7071L15 12ZM9.70711 5.29289L15.7071 11.2929L14.2929 12.7071L8.29289 6.70711L9.70711 5.29289ZM15.7071 12.7071L9.70711 18.7071L8.29289 17.2929L14.2929 11.2929L15.7071 12.7071Z"
        fill={col}
      />
    </svg>
  );
};
