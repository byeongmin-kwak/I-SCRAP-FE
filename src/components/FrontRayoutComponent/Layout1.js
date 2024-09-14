import React from 'react';

const Layout1 = ({ fill }) => {
  return (
    <svg width="290" height="430" viewBox="0 0 290 430" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_1439_2928)">
        <g filter="url(#filter0_i_1439_2928)">
          <path 
            fillRule="evenodd" 
            clipRule="evenodd" 
            d="M15 0C6.71573 0 0 6.71574 0 15V415C0 423.284 6.71573 430 15 430H275C283.284 430 290 423.284 290 415V15C290 6.71573 283.284 0 275 0H15ZM30 21C24.4772 21 20 25.4772 20 31V340C20 345.523 24.4772 350 30 350H260C265.523 350 270 345.523 270 340V31C270 25.4772 265.523 21 260 21H30Z" 
            fill={fill} // fill 값을 전달받아 적용
          />
        </g>
      </g>
      <defs>
        <filter id="filter0_i_1439_2928" x="-2" y="-3" width="292" height="433" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="-2" dy="-3" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1439_2928" />
        </filter>
        <clipPath id="clip0_1439_2928">
          <rect width="290" height="430" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Layout1;
