import React from 'react';
import ISTJ from '../../assets/TestResults/ISTJ.svg';
import ISTP from '../../assets/TestResults/ISTP.svg';
import ISFP from '../../assets/TestResults/ISFP.svg';
import ISFJ from '../../assets/TestResults/ISFJ.svg';
import INTP from '../../assets/TestResults/INTP.svg';
import INFP from '../../assets/TestResults/INFP.svg';
import INTJ from '../../assets/TestResults/INTJ.svg';
import INFJ from '../../assets/TestResults/INFJ.svg';
import ENFJ from '../../assets/TestResults/ENFJ.svg';
import ENFP from '../../assets/TestResults/ENFP.svg';
import ENTP from '../../assets/TestResults/ENTP.svg';
import ESTP from '../../assets/TestResults/ESTP.svg';
import ESTJ from '../../assets/TestResults/ESTJ.svg';
import ENTJ from '../../assets/TestResults/ENTJ.svg';
import ESFJ from '../../assets/TestResults/ESFJ.svg';
import ESFP from '../../assets/TestResults/ESFP.svg';

import './TestResultPage1.css'; // CSS 파일을 임포트하여 스타일 적용
import { useParams } from 'react-router-dom';

export default function TestResultPage1() {
    const { answers } = useParams();

    return (
        <div className="test-result-page">
            {answers === 'ISTJ' &&  <img src={ISTJ} className='test-image' alt="ISTJ" />}
            {answers === 'ISTP' &&  <img src={ISTP} className='test-image' alt="ISTP" />}
            {answers === 'ISFP' &&  <img src={ISFP} className='test-image' alt="ISFP" />}
            {answers === 'ISFJ' &&  <img src={ISFJ} className='test-image' alt="ISFJ" />}
            {answers === 'INTP' &&  <img src={INTP} className='test-image' alt="INTP" />}
            {answers === 'INFP' &&  <img src={INFP} className='test-image' alt="INFP" />}
            {answers === 'INTJ' &&  <img src={INTJ} className='test-image' alt="INTJ" />}
            {answers === 'INFJ' &&  <img src={INFJ} className='test-image' alt="INFJ" />}
            {answers === 'ENFJ' &&  <img src={ENFJ} className='test-image' alt="ENFJ" />}
            {answers === 'ENFP' &&  <img src={ENFP} className='test-image' alt="ENFP" />}
            {answers === 'ENTP' &&  <img src={ENTP} className='test-image' alt="ENTP" />}
            {answers === 'ESTP' &&  <img src={ESTP} className='test-image' alt="ESTP" />}
            {answers === 'ESTJ' &&  <img src={ESTJ} className='test-image' alt="ESTJ" />}
            {answers === 'ENTJ' &&  <img src={ENTJ} className='test-image' alt="ENTJ" />}
            {answers === 'ESFJ' &&  <img src={ESFJ} className='test-image' alt="ESFJ" />}
            {answers === 'ESFP' &&  <img src={ESFP} className='test-image' alt="ESFP" />}
        </div>
    );
}
