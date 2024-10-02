import React from 'react';
import ISTJ from '../../assets/TestResults/ISTJ.svg';
import './TestResultPage1.css'; // CSS 파일을 임포트하여 스타일 적용
import { useParams } from 'react-router-dom';

export default function TestResultPage1() {
    const { answers } = useParams();

    return (
        <div className="test-result-page">
            {answers === 'ISTJ' &&  <img src={ISTJ} className='test-image'/>}
        </div>
    );
}
