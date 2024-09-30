import React, { useState, useEffect } from 'react';
import styles from './TestPage.module.css';
import Background from '../../assets/test-background.svg';
import Question from '../../assets/speech-bubble.svg';
import Answer from '../../assets/answer-bubble.svg';
import Arrow from '../../assets/arrow.svg';
import PopupTest from '../../components/PopupTest/PopupTest';

export default function TestPage() {
    const [showTextContainer, setShowTextContainer] = useState(false);
    const [showStartButton, setShowStartButton] = useState(false);
    const [text, setText] = useState('오!왔구나. 기다리고 있었어');
    const [step, setStep] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);

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
    }, []);

    const handleTextChange1 = () => {
        setText('드디어 마음의 준비는 끝난거야?');
        setStep(1);
    };

    const handleTextChange2 = () => {
        setStep(2);
    };

    const handleTextChange3 = () => {
        setStep(4);
    };

    const handleTextChange4 = () => {
        setStep(6);
    };

    // step 2에서 자동으로 fade-out 후 step3로 전환
    useEffect(() => {
        if (step === 2) {
            setFadeOut(true);

            // 1초 후에 step 3으로 전환
            const fadeTimer = setTimeout(() => {
                setStep(3);
                setText("이제 너만의 캐릭터를 만들러 가볼까?");
                setFadeOut(false); // 다음 스텝에서는 다시 fade-in 효과를 위해
            }, 1200);

            return () => clearTimeout(fadeTimer);
        }
        if (step === 4) {
            setFadeOut(true);

            // 1초 후에 step 3으로 전환
            const fadeTimer = setTimeout(() => {
                setStep(5);
                setText("그럼 우리가 만든 테스트 하러 가자!");
                setFadeOut(false); // 다음 스텝에서는 다시 fade-in 효과를 위해
            }, 1200);

            return () => clearTimeout(fadeTimer);
        }
    }, [step]);

    return (
        <div className={styles.container}>
            <div className={styles.questionContainer}>
                {step !== 6 &&
                    <div className={`${styles.textContainer} ${showTextContainer ? styles.show : ''}`}>
                        <img src={Question} className={styles.question} />
                        <div className={styles.text}>{text}</div>
                    </div>

                }
                <div className={styles.answerContainer}>
                    {step === 0 &&
                        <div
                            className={`${styles.circleButton1} ${showStartButton ? styles.show : ''}`}
                            onClick={handleTextChange1}
                        >
                            <div className={styles.circleButton2}>
                                START
                            </div>
                        </div>}
                    {step === 1 &&
                        <div className={styles.buttonContainer}>
                            <button className={styles.answer} onClick={handleTextChange2}>응!</button>
                            <button className={styles.answer}>아니</button>
                        </div>}
                    {step === 2 &&
                        <div className={`${styles.answerShowContainer} ${fadeOut ? styles.fadeOut : styles.fadeIn}`}>
                            <img src={Answer} className={styles.answerShowBubble} />
                            <div className={styles.answerShowText}>응!</div>
                        </div>}
                    {step === 3 &&
                        <div className={styles.buttonContainer}>
                            <button className={styles.answer} onClick={handleTextChange3}>좋아!</button>
                            <button className={styles.answer}>아직..준비가 안됐어</button>
                        </div>}
                    {step === 4 &&
                        <div className={`${styles.answerShowContainer} ${fadeOut ? styles.fadeOut : styles.fadeIn}`}>
                            <img src={Answer} className={styles.answerShowBubble} />
                            <div className={styles.answerShowText}>좋아!</div>
                        </div>}
                    {step === 5 &&
                        <div
                            className={`${styles.startTest1} ${fadeOut ? styles.fadeOut : styles.fadeIn}`}
                            onClick={handleTextChange4}
                        >
                            <div className={styles.startTest2}>
                                START
                            </div>
                        </div>}
                </div>
                {step === 6 &&
                    <PopupTest/>
                }
            </div>
            <img src={Background} className={styles.img} />
        </div>
    );
}
