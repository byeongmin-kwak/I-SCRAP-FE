// SearchPopup.js
import React from 'react';
import './SearchPopupResult.css'; // 스타일 분리

export default function SearchPopupResult({ imgSrc, name, dueDate, className, onClick }) {
    return (
        <div className={`search-popup ${className}`}>
            <img src={imgSrc} className='search-popup-img' alt={name} onClick={onClick} />
            <div className='search-popup-info'>
                <div className='search-popup-name'>{name}</div>
                <div className='search-popup-duedate'>{dueDate}</div>
            </div>
        </div>
    );
}
