import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBackgroundColor } from '../../store/frontLayoutSlice';
import './BackGroundColor.css';

export default function BackGroundColor() {
    const dispatch = useDispatch();
    const selectedLayout = useSelector((state) => state.frontLayout.selectedLayout);

    // 배경색을 클릭했을 때 실행되는 함수
    const handleColorClick = (color) => {
        if (selectedLayout === 'layout6' && (color !== '#FFFFFF' && color !== '#000000')) {
            return; // layout6일 때 흰색, 검정 외의 색상 선택 불가
        }
        dispatch(setBackgroundColor(color)); // 클릭한 색상을 Redux로 디스패치
    };

    // layout6일 때 불투명 회색 레이어를 표시하기 위한 함수
    const isDisabled = (color) => {
        return selectedLayout === 'layout6' && (color !== '#FFFFFF' && color !== '#000000');
    };

    return (
        <div className='background-colors'>
            <div className={`background-color1 ${isDisabled('#F8CDCC') ? 'disabled' : ''}`} onClick={() => handleColorClick('#F8CDCC')}></div>
            <div className={`background-color2 ${isDisabled('#FE6F96') ? 'disabled' : ''}`} onClick={() => handleColorClick('#FE6F96')}></div>
            <div className={`background-color3 ${isDisabled('#E2D4F4') ? 'disabled' : ''}`} onClick={() => handleColorClick('#E2D4F4')}></div>
            <div className={`background-color4 ${isDisabled('#6F69AC') ? 'disabled' : ''}`} onClick={() => handleColorClick('#6F69AC')}></div>
            <div className={`background-color5 ${isDisabled('#CEE2F5') ? 'disabled' : ''}`} onClick={() => handleColorClick('#CEE2F5')}></div>
            <div className={`background-color6 ${isDisabled('#719FAF') ? 'disabled' : ''}`} onClick={() => handleColorClick('#719FAF')}></div>
            <div className={`background-color7 ${isDisabled('#D1E8E5') ? 'disabled' : ''}`} onClick={() => handleColorClick('#D1E8E5')}></div>
            <div className={`background-color8 ${isDisabled('#95DAC1') ? 'disabled' : ''}`} onClick={() => handleColorClick('#95DAC1')}></div>
            <div className={`background-color9 ${isDisabled('#FBF0CF') ? 'disabled' : ''}`} onClick={() => handleColorClick('#FBF0CF')}></div>
            <div className={`background-color10 ${isDisabled('#FFFFFF') ? 'disabled' : ''}`} onClick={() => handleColorClick('#FFFFFF')}></div>
            <div className={`background-color11 ${isDisabled('#E9DBD0') ? 'disabled' : ''}`} onClick={() => handleColorClick('#E9DBD0')}></div>
            <div className={`background-color12 ${isDisabled('#000000') ? 'disabled' : ''}`} onClick={() => handleColorClick('#000000')}></div>
        </div>
    );
}
