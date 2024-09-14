import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import FontColor from '../FontColor/FontColor';
import TextType from '../TextType/TextType';
import './TextEditor.css';

export default function TextEditor({ onClick }) {
    // 세 개의 입력 필드를 배열로 관리
    const [texts, setTexts] = useState(['', '', '']);

    // 각 입력 필드의 변화 처리
    const handleChange = (index, value) => {
        const newTexts = [...texts];
        newTexts[index] = value; // 특정 입력 필드의 값을 업데이트
        setTexts(newTexts);      // 상태 업데이트
    };

    // 각 입력 필드의 값을 부모로 전달
    const handleAddClick = (index) => {
        onClick(texts[index]);  // 해당 인덱스의 값을 부모로 전달
        const newTexts = [...texts];
    
    };

    return (
        <div className='text-add-container'>
            <div className='text-add-text'>텍스트</div>
            {texts.map((text, index) => (
                <div className='text-add-input-container'>
                    <div key={index}>
                        <input
                            className='text-add-input'
                            placeholder='텍스트를 추가해주세요.'
                            value={text} // 각각의 입력 필드에 대응되는 state 값
                            onChange={(e) => handleChange(index, e.target.value)}
                        />
                        <button
                            className='text-add-button'
                            onClick={() => handleAddClick(index)} // 해당 인덱스의 값을 추가
                        >
                            추가하기
                        </button>
                    </div>
                </div>
            ))}
            <TextType />
            <FontColor/>
        </div>
    );
}
