// ArchivingPopup.js
import React from 'react';
import './ArchivingPopup.css';

export default function ArchivingPopup({ id, title, image, name, date, isDeleted, isSelected, onClick }) {
    const handleClick = () => {
        onClick(id);
    };
    return (
        <div
            className={`archiving-popup ${isDeleted ? 'deletable' : ''} ${isSelected ? 'selected' : ''}`}
            onClick={handleClick}
        >
            <div className='archiving-popup-title'>{title}</div>
            <div className='archiving-popup-info'>
                <img src={image} className='archiving-image' />
                <div className='archiving-popup-content'>
                    <div className='archiving-popup-name'>{name}</div>
                    <div className='archiving-visit-date'>{date}</div>
                </div>
            </div>
        </div>
    );
}
