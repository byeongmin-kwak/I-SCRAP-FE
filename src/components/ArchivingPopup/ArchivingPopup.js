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
        >   {title ? <div className='archiving-popup-title'>{title}</div> : <div className='archiving-popup-title-none'>글로 기록을 남겨보세요!</div>}
            
            <div className='archiving-popup-info'>
                <img src={image} className='archiving-image' alt="Popup" />
                <div className='archiving-popup-content'>
                    <div className='archiving-popup-name-wrapper'>
                        <div className='archiving-popup-name'>{name}</div>
                    </div>
                    <div className='archiving-visit-date'>{date}</div>
                </div>
            </div>
        </div>
    );
}
