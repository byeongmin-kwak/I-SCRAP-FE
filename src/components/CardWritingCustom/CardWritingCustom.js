import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PhotoModal from '../PhotoModal/PhotoModal';
import FlippedButton from '../../assets/flipped-button.svg';
import './CardWritingCustom.css';

export default function CardWritingCustom() {
    const popName = useSelector((state) => state.backInfo.popName);
    const place = useSelector((state) => state.backInfo.place);
    const savedCardImage = useSelector((state) => state.card.savedCardImage);
    const savedBackImage = useSelector((state) => state.card.savedBackImage);
    const [isFlipped, setIsFlipped] = useState(false);  // 카드가 뒤집혔는지 여부를 관리하는 상태
    const [isModalOpen, setIsModalOpen] = useState(false);  // 모달 상태 관리

    const handleFlip = () => {
        setIsFlipped(!isFlipped);  // 클릭할 때마다 상태를 변경하여 카드가 뒤집히도록 함
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='card-writing'>
            <div className='card-writing-container'>
                <div className='making-card-text'>
                    <p>기록쓰기</p>
                    <p className='making-card-option'>{popName}</p>
                </div>
            </div>
            <div className='flipped-card-container'>
                <div className={`writing-card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
                    <div className="writing-card-front">
                        {savedCardImage ? (
                            <img src={savedCardImage} alt="Saved card front" className='writing-card-view' />
                        ) : (
                            <p>저장된 카드 이미지가 없습니다.</p>
                        )}
                    </div>
                    <div className="writing-card-back">
                        {savedBackImage ? (
                            <img src={savedBackImage} alt="Saved card back" className='writing-card-view' />
                        ) : (
                            <p>저장된 카드 뒷면 이미지가 없습니다.</p>
                        )}
                    </div>
                </div>
            </div>
            <div className='writing-info-container'>
                <div className='add-photo-container'>
                    <button className='add-photo' onClick={handleModalOpen}>사진추가</button>
                </div>
                <div className='popup-info'>
                    <div>
                        <div className='writing-date'>2024.07.04</div>
                        <input placeholder='제목' className='writing-title' />
                        <div className='writing-popName'>{popName}</div>
                        <div className='writing-place'>{place}</div>
                    </div>
                    <div className='writing-comment'>한줄 코멘트 어쩌구저쩌구 약 50자 정도 될 거 같음. 한줄 코멘트 어쩌구 저쩌구 약 50 </div>
                </div>
            </div>
            <input
                className='popup-writing'
                placeholder='팝업 스토어에서의 경험을 더 자세하게 글로 적어주세요.'>
            </input>
            {isModalOpen && <PhotoModal onClose={handleModalClose} />}
        </div>
    );
}
