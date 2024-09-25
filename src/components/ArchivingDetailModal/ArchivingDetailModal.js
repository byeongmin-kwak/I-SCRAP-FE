import React, { useState } from 'react';
import './ArchivingDetailModal.css';

export default function ArchivingDetailModal({ id, title, frontImage, backImage, name, date, isOpen, onClose }) {
    const [isFlipped, setIsFlipped] = useState(false);

    if (!isOpen) return null;

    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="archiving-modal-overlay" onClick={onClose}>
            <div className="archiving-modal-container" onClick={(e) => e.stopPropagation()}>
                <button className="archiving-close-button" onClick={onClose}>
                    &times;
                </button>
                <div className='archiving-modal-content'>
                    <div className={`archiving-card ${isFlipped ? 'flipped' : ''}`}>
                        <div className='archiving-card-inner'>
                            <div className='archiving-card-front'>
                                <img src={frontImage} alt="Front" className='archiving-modal-image' />
                            </div>
                            <div className='archiving-card-back'>
                                <img src={backImage} alt="Back" className='archiving-modal-image' />
                            </div>
                        </div>
                        <button className='flipped-card' onClick={handleCardClick} >카드뒤집</button>
                    </div>
                    <div className='archiving-modal-info'>
                        <div className='archiving-modal-date'>2024.{date}</div>
                        <div className='archiving-modal-name'>{name}</div>
                        <div className='archiving-modal-open'>공개</div>
                        <div className='archiving-modal-coment'>
                            "한줄 코멘트 어쩌구저쩌구 약 50자 정도 될 거 같음. 한줄 코멘트 어쩌구 저쩌구 약 50 "
                        </div>
                        <div className='archiving-modal-detail'>
                            Bibendum ut pharetra sed sem augue arcu vestibulum. Vel tellus enim mi viverra...
                            <div className='archiving-more'>자세히 보러가기</div>
                        </div>
                        <div className='archiving-modal-button-container'>
                            <button className='archiving-modal-edit'>수정하기</button>
                            <button className='archiving-modal-delete'>삭제하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
