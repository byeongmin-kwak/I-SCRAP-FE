import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedFontColor } from '../../store/fontSlice';
import './FontColor.css';

export default function FontColor() {
    const dispatch = useDispatch();

    // 배경색을 클릭했을 때 실행되는 함수
    const handleColorClick = (color) => {
        dispatch(setSelectedFontColor(color)); // 클릭한 색상을 Redux로 디스패치
        console.log(color);
    };

    return (
        <div className='font-background-color-container'>
            <div className='color-text'>색상</div>
            <div className='font-background-colors'>
                <div className='font-background-color1' onClick={() => handleColorClick('#F8CDCC')}></div>
                <div className='font-background-color2' onClick={() => handleColorClick('#FE6F96')}></div>
                <div className='font-background-color3' onClick={() => handleColorClick('#E2D4F4')}></div>
                <div className='font-background-color4' onClick={() => handleColorClick('#6F69AC')}></div>
                <div className='font-background-color5' onClick={() => handleColorClick('#CEE2F5')}></div>
                <div className='font-background-color6' onClick={() => handleColorClick('#719FAF')}></div>
                <div className='font-background-color7' onClick={() => handleColorClick('#D1E8E5')}></div>
                <div className='font-background-color8' onClick={() => handleColorClick('#95DAC1')}></div>
                <div className='font-background-color9' onClick={() => handleColorClick('#FBF0CF')}></div>
                <div className='font-background-color10' onClick={() => handleColorClick('white')}></div>
                <div className='font-background-color11' onClick={() => handleColorClick('#E9DBD0')}></div>
                <div className='font-background-color12' onClick={() => handleColorClick('black')}></div>
            </div>
        </div>
    );
}
