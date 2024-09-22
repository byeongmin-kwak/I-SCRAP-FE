// src/components/CardBackContent/CardBackContent.js
import React from 'react';
import './CardBackContent.css';

export default function CardBackContent() {
    return (
        <div className='card-back'>
            <div className='card-container'>
                <div className='making-card-text'>
                    <p>팝업카드 만들기  </p>
                    <p className='making-card-option'>Back</p>
                </div>
                <div className='making-back-view'>
                    <div className='maked-back-card'>만드는 카드 그림</div>
                </div>
            </div>
            <div className='card-back-options'>
                <div className='card-back-popname'>시크릿 쥬쥬</div>
                <div className='place-date'>
                    <div className='back-place'>관람 장소</div>
                    <div className='back-date'>관람 날짜</div>
                </div>
                <div className='price-with-star'>
                    <div className='back-price'>금액</div>
                    <div className='back-with'>동행인</div>
                    <div className='back-star'>별점</div>
                </div>
                <div className='rayout-background'>
                    <div className='back-rayout'>레이아웃</div>
                    <div className='back-background'>배경색</div>
                </div>

            </div>
        </div>
    );
}
