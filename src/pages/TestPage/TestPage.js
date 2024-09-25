import React, { useState, useEffect } from 'react';
import styles from './TestPage.module.css';
import Background from '../../assets/test-background.svg';
import Question from '../../assets/speech-bubble.svg';

export default function TestPage() {
    const [showTextContainer, setShowTextContainer] = useState(false);
    const [showStartButton, setShowStartButton] = useState(false);
    const [text, setText] = useState('오!왔구나. 기다리고 있었어');

    useEffect(() => {
        // 0.5초 후에 텍스트 컨테이너를 보이게 함
        const textTimer = setTimeout(() => {
            setShowTextContainer(true);
        }, 500);

        // 텍스트 컨테이너가 보이고 1초 후에 Start 버튼을 보이게 함
        const buttonTimer = setTimeout(() => {
            setShowStartButton(true);
        }, 1000);

        // 타이머 정리
        return () => {
            clearTimeout(textTimer);
            clearTimeout(buttonTimer);
        };
    }, []); // 의존성 배열을 빈 배열로 설정하여 처음에만 실행되도록 함

    const handleTextChange = () => {
        setText('드디어 마음의 준비는 끝난거야?');
    };

    return (
        <div className={styles.container}>
            <img src={Background} className={styles.img} />
            <div className={styles.questionContainer}>
                <div className={`${styles.textContainer} ${showTextContainer ? styles.show : ''}`}>
                    <img src={Question} className={styles.question} />
                    <div className={styles.text}>{text}</div>
                </div>
                <div
                    className={`${styles.circleButton1} ${showStartButton ? styles.show : ''}`}
                    onClick={handleTextChange}
                >
                    <div className={styles.circleButton2}>
                        START
                    </div>
                </div>
            </div>
        </div>
    );
}
