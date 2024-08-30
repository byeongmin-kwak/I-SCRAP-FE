import React, { useRef, useState } from 'react';
import Rayout1 from '../../assets/CardBackImages/rayout1.svg';
import Rayout2 from '../../assets/CardBackImages/rayout2.svg';
import Rayout3 from '../../assets/CardBackImages/rayout3.svg';
import Rayout4 from '../../assets/CardBackImages/rayout4.svg';
import Rayout5 from '../../assets/CardBackImages/rayout5.svg';
import './CardBackContent.css';

export default function CardBackContent() {
    const [selectedLayout, setSelectedLayout] = useState(Rayout1); // 기본값으로 Rayout1 설정
    const rayoutRef = useRef(null);
    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
        isDown = true;
        rayoutRef.current.classList.add('active');
        startX = e.pageX - rayoutRef.current.offsetLeft;
        scrollLeft = rayoutRef.current.scrollLeft;
    };

    const handleMouseLeaveOrUp = () => {
        isDown = false;
        rayoutRef.current.classList.remove('active');
    };

    const handleMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - rayoutRef.current.offsetLeft;
        const walk = (x - startX) * 2; // 드래그 속도 조정
        rayoutRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleLayoutClick = (layout) => {
        setSelectedLayout(layout); // 선택된 레이아웃을 상태로 설정
    };

    return (
        <div className='card-back'>
            <div className='card-container'>
                <div className='making-card-text'>
                    <p>팝업카드 만들기</p>
                    <p className='making-card-option'>Back</p>
                </div>
                <div className='making-back-view'>
                    <img src={selectedLayout} alt="Selected Layout" className='maked-back-card' /> {/* 선택된 레이아웃 이미지 표시 */}
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
                    <div className='back-rayout'>
                        <div style={{ color: 'black', fontSize: 15, fontFamily: 'Noto Sans KR', fontWeight: '400', wordWrap: 'break-word' }}>레이아웃</div>
                        <div className='rayouts'
                            ref={rayoutRef}
                            onMouseDown={handleMouseDown}
                            onMouseLeave={handleMouseLeaveOrUp}
                            onMouseUp={handleMouseLeaveOrUp}
                            onMouseMove={handleMouseMove}>
                            <img src={Rayout1} alt="Rayout 1" onClick={() => handleLayoutClick(Rayout1)} />
                            <img src={Rayout2} alt="Rayout 2" onClick={() => handleLayoutClick(Rayout2)} />
                            <img src={Rayout3} alt="Rayout 3" onClick={() => handleLayoutClick(Rayout3)} />
                            <img src={Rayout4} alt="Rayout 4" onClick={() => handleLayoutClick(Rayout4)} />
                            <img src={Rayout5} alt="Rayout 5" onClick={() => handleLayoutClick(Rayout5)} />
                        </div>
                    </div>
                    <div className='back-background '>
                        <div style={{ color: '#2E2E2E', fontSize: 15, fontFamily: 'Noto Sans KR', fontWeight: '500', wordWrap: 'break-word' }}>배경색</div>
                        <div className='background-colors'>
                            <div className='background-color1'></div>
                            <div className='background-color2'></div>
                            <div className='background-color3'></div>
                            <div className='background-color4'></div>
                            <div className='background-color5'></div>
                            <div className='background-color6'></div>
                            <div className='background-color7'></div>
                            <div className='background-color8'></div>
                            <div className='background-color9'></div>
                            <div className='background-color10'></div>
                            <div className='background-color11'></div>
                            <div className='background-color12'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
