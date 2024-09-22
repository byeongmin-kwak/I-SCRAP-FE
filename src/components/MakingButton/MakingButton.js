import React from 'react';
import './MakingButton.css'; 

export default function MakingButton({ isActive, onClick, imgSrc, activeImgSrc, text }) {
  return (
    <div
      className={`making-button ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <img
        className='making-button-img'
        src={isActive ? activeImgSrc : imgSrc}
        alt={text}
      />
      <div className={`making-button-text ${isActive ? 'active' : ''}`}>
        {text}
      </div>
    </div>
  );
}
