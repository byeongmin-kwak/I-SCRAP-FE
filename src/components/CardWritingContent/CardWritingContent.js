import React, { useState } from 'react';
import FlippedButton from '../../assets/flipped-button.svg';
import { useSelector } from 'react-redux';
import './CardWritingContent.css';

export default function CardWritingContent() {
    const savedCardImage = useSelector((state) => state.card.savedCardImage);
    const savedBackImage = useSelector((state) => state.card.savedBackImage);
    const [isFlipped, setIsFlipped] = useState(false);  // 카드가 뒤집혔는지 여부를 관리하는 상태

    const handleFlip = () => {
        setIsFlipped(!isFlipped);  // 클릭할 때마다 상태를 변경하여 카드가 뒤집히도록 함
    };

    return (
        <div className='card-writing'>
            <div className='card-and-info'>
                <div className='writing-card-container'>
                    <div className='making-card-text'>
                        <div>기록쓰기</div>
                        <div className='making-card-option'>팝업명</div>
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
                </div>
                <div>
                    <div className='add-photo-container'>
                        <button className='add-photo'>사진추가</button>
                    </div>
                    <div className='popup-info'>
                        <div style={{ color: 'black', fontSize: 24, fontFamily: 'Noto Sans KR', fontWeight: '400', wordWrap: 'break-word' }}>기록 제목</div>
                        <div style={{ color: 'black', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '400', wordWrap: 'break-word' }}>2024.07.04</div>
                        <div style={{ color: 'black', fontSize: 18, fontFamily: 'Noto Sans KR', fontWeight: '300', lineHeight: 4, wordWrap: 'break-word' }}>관람 장소: DDP 동대문 역사 박물관</div>
                        <div style={{ color: 'rgba(0, 0, 0, 0.50)', fontSize: 18, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: 8, wordWrap: 'break-word' }}>한줄 코멘트 어쩌구저쩌구 약 50자 정도 될 거 같음. 한줄 코멘트 어쩌구 저쩌구 약 50 </div>
                    </div>
                </div>
            </div>
            <textarea
                className='popup-writing'
                placeholder='팝업 스토어에서의 경험을 더 자세하게 글로 적어주세요.'>
            </textarea>
        </div>
    );
}
