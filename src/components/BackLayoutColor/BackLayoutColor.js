import React from 'react';
import { useDispatch } from 'react-redux';
import { setBackLayoutColor } from '../../store/backLayoutSlice';
import './BackLayoutColor.css';

export default function BackLayoutColor() {
    const dispatch = useDispatch();

    // 배경색을 클릭했을 때 실행되는 함수
    const handleColorClick = (color) => {
        dispatch(setBackLayoutColor(color)); // 클릭한 색상을 Redux로 디스패치
        console.log(color);
    };

    return (
        <div className='background-color-container'>
            <div className='layout-text'>레이아웃 색</div>
            <div className='back-background-colors'>
                <div className='back-background-color1' onClick={() => handleColorClick('#F8CDCC')}></div>
                <div className='back-background-color3' onClick={() => handleColorClick('#E2D4F4')}></div>
                <div className='back-background-color5' onClick={() => handleColorClick('#CEE2F5')}></div>
                <div className='back-background-color7' onClick={() => handleColorClick('#D1E8E5')}></div>
                <div className='back-background-color9' onClick={() => handleColorClick('#FBF0CF')}></div>
                <div className='back-background-color11' onClick={() => handleColorClick('#E9DBD0')}></div>
                <div className='back-background-color2' onClick={() => handleColorClick('#FE6F96')}></div>
                <div className='back-background-color4' onClick={() => handleColorClick('#6F69AC')}></div>
                <div className='back-background-color6' onClick={() => handleColorClick('#719FAF')}></div>
                <div className='back-background-color8' onClick={() => handleColorClick('#95DAC1')}></div>
                <div className='back-background-color10' onClick={() => handleColorClick('#FFFFFF')}></div>
                <div className='back-background-color12' onClick={() => handleColorClick('#000000')}></div>
            </div>
        </div>

    );
}

