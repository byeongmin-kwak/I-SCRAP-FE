import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './CardBackCustom.css';
import BackInfo from '../BackInfo/BackInfo';
import CardBackLayout from '../CardBackLayout/CardBackLayout';
import CardBackLayoutRender from '../CardBackLayoutRender/CardBackLayoutRender';
import html2canvas from 'html2canvas';
import { setSavedBackImage } from '../../store/cardSlice';  // Redux 액션 임포트

export default function CardBackCustom() {
    const dispatch = useDispatch();
    const selectedLayout = useSelector((state) => state.backLayout.selectedLayout);
    const selectedColor = useSelector((state) => state.backLayout.backgroundColor);
    const [activeButton, setActiveButton] = useState('info');
    const backViewRef = useRef(null); // 캡처할 영역 참조

    const handleCapture = () => {
        if (backViewRef.current) {
            html2canvas(backViewRef.current, { scale: 2 }).then((canvas) => {
                const imageData = canvas.toDataURL('image/png');

                // 캡처한 이미지를 전역 상태에 저장
                dispatch(setSavedBackImage(imageData));

            });
        }
    };

    useEffect(() => {
        handleCapture();  // 처음 렌더링 시 캡처 실행
    }, []);

    // selectedLayout 또는 selectedColor가 변경될 때마다 이미지 캡처
    useEffect(() => {
        const observer = new MutationObserver(() => {
            handleCapture();
        });

        if (backViewRef.current) {
            observer.observe(backViewRef.current, { attributes: true, childList: true, subtree: true });
        }

        return () => {
            if (backViewRef.current) {
                observer.disconnect();
            }
        };
    }, [selectedLayout, selectedColor]);




    return (
        <div className='card-back'>
            <div className='card-back-container'>
                <div className='making-card-text'>
                    <p>팝업카드 만들기</p>
                    <p className='making-card-option'>Back</p>
                </div>
                <div className='making-back-view' ref={backViewRef}>
                    {/* 캡처할 영역 */}
                    <CardBackLayoutRender selectedLayout={selectedLayout} selectedColor={selectedColor} />
                </div>
            </div>
            <div className='back-custom-canvas-container'>
                <div className='back-custom-canvas'>
                    {activeButton === 'info' && <BackInfo />}
                    {activeButton === 'layout' && <CardBackLayout />}
                </div>
                <div className='back-custom-button-container'>
                    <button className={`back-custom-button-a ${activeButton === 'info' ? 'active' : ''}`} onClick={() => setActiveButton('info')}>정보</button>
                    <button className={`back-custom-button-b ${activeButton === 'layout' ? 'active' : ''}`} onClick={() => setActiveButton('layout')}>레이아웃</button>
                </div>
            </div>
        </div>
    );
}
