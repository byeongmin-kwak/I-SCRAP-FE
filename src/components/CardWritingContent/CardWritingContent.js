import React from 'react';
import './CardWritingContent.css';

export default function CardWritingContent() {
    return (
        <div className='card-writing'>
            <div className='card-and-info'>
                <div className='card-container'>
                    <div className='making-card-text'>
                        <p>기록쓰기  </p>
                        <p className='making-card-option'>팝업명</p>
                    </div>
                    <div className='writing-card-view'>
                        <div>만든카드</div>
                    </div>
                </div>
                <div>
                    <div className='add-photo-container'>
                        <button className='add-photo'>사진추가</button>
                    </div>
                    <div className='popup-info'>
                        <div style={{color: 'black', fontSize: 24, fontFamily: 'Noto Sans KR', fontWeight: '400', wordWrap: 'break-word'}}>기록 제목</div>
                        <div style={{color: 'black', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '400', wordWrap: 'break-word'}}>2024.07.04</div>
                        <div style={{color: 'black', fontSize: 18, fontFamily: 'Noto Sans KR', fontWeight: '300', lineHeight: 4, wordWrap: 'break-word'}}>관람 장소: DDP 동대문 역사 박물관</div>
                        <div style={{color: 'rgba(0, 0, 0, 0.50)', fontSize: 18, fontFamily: 'Noto Sans KR', fontWeight: '500', lineHeight: 8, wordWrap: 'break-word'}}>한줄평</div>
                    </div>
                </div>
            </div>
            <textarea
                className='popup-writing'
                placeholder='팝업 스토어에서의 경험을 더 자세하게 글로 적어주세요.'>
            </textarea>
        </div>
    )
}
