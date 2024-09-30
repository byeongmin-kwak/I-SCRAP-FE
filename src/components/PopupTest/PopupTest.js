import React, { useState, useEffect } from 'react';
import Arrow from '../../assets/arrow.svg';
import styles from './PopupTest.module.css';
import Icon from '../../assets/test-icon.svg';

export default function PopupTest() {
    // 각 질문에 대한 선택 상태를 저장하는 배열
    const [answers, setAnswers] = useState([null, null, null, null]);
    const [step, setStep] = useState(1);

    // 답변 선택 핸들러
    const handleAnswer = (questionIndex, answerIndex) => {
        const updatedAnswers = [...answers];
        updatedAnswers[questionIndex] = answerIndex; // 선택한 답변 저장
        setAnswers(updatedAnswers);
    };

    // 버튼에 스타일을 적용해주는 함수
    const getButtonStyle = (questionIndex, answerIndex) => {
        return answers[questionIndex] === answerIndex ? styles.selectedOptionButton : styles.optionButton;
    };

    useEffect(() => {
        console.log(answers);
    }, [answers]);

    useEffect(() => {
        if (step === 5) {
            // 5초 후에 step 7로 변경
            const timer = setTimeout(() => {
                setStep(6);
            }, 3000); // 5초 동안 애니메이션 실행 후 step 7로 이동

            return () => clearTimeout(timer); // 컴포넌트가 unmount 되면 타이머를 정리
        }
    }, [step]);

    return (
        <div>
            {step === 1 &&
                <div className={styles.mainContainer}>
                    <div className={styles.mainText}>
                        1. 갑자기 내일 성수동에 있는 팝업스토어에 <br></br> 같이 가자는 친구의 연락이 왔다.
                    </div>
                    <div className={styles.testAnswer}>
                        <div className={styles.arrowContainer}>
                            <img src={Arrow} />
                            <div>이전으로</div>
                        </div>
                        <div className={styles.optionButtons}>
                            <button
                                className={getButtonStyle(0, 0)}
                                onClick={() => handleAnswer(0, 0)}
                            >
                                ‘응? 갑자기? 나랑 다른 할 일 약속 잡혔는데...<br></br>
                                다음에 가자고 해야겠다.’
                            </button>
                            <button
                                className={getButtonStyle(0, 1)}
                                onClick={() => handleAnswer(0, 1)}
                            >
                                ‘오, 내일 할 일은,, 다음에 하지 뭐~<br></br>
                                마침 심심했는데 잘됐다!’
                            </button>
                        </div>
                        <div className={styles.arrowContainer} onClick={() => setStep(2)}>
                            <div>다음으로</div>
                            <img src={Arrow} className={styles.flippedArrow} />
                        </div>
                    </div>
                </div>}
            {step === 2 &&
                <div className={styles.mainContainer}>
                    <div className={styles.mainText}>
                        2. 포토존에서 사진을 찍고 싶은데<br></br>
                        사람이 너무 많다. 이때 나의 선택은?
                    </div>
                    <div className={styles.testAnswer}>
                        <div className={styles.arrowContainer} onClick={() => setStep(1)}>
                            <img src={Arrow} />
                            <div>이전으로</div>
                        </div>
                        <div className={styles.optionButtons}>
                            <button
                                className={getButtonStyle(1, 0)}
                                onClick={() => handleAnswer(1, 0)}
                            >
                                '다들 지켜보니까 사진찍기 부끄러워..<br></br>
                                그냥 다른 곳에서 찍자'
                            </button>
                            <button
                                className={getButtonStyle(1, 1)}
                                onClick={() => handleAnswer(1, 1)}
                            >
                                '오~ 여기가 핫한 스팟인가 보네!!<br></br>
                                사진 많이 찍고야겠다!'
                            </button>
                        </div>
                        <div className={styles.arrowContainer} onClick={() => setStep(3)}>
                            <div>다음으로</div>
                            <img src={Arrow} className={styles.flippedArrow} />
                        </div>
                    </div>
                </div>}
            {step === 3 &&
                <div className={styles.mainContainer}>
                    <div className={styles.mainText}>
                        3. 친구가 굿즈를 보여주며 어떠냐고 물어본다.<br></br>돈 주고 살 정도는 아닌 것 같은데...
                    </div>
                    <div className={styles.testAnswer}>
                        <div className={styles.arrowContainer} onClick={() => setStep(2)}>
                            <img src={Arrow} />
                            <div>이전으로</div>
                        </div>
                        <div className={styles.optionButtons}>
                            <button
                                className={getButtonStyle(2, 0)}
                                onClick={() => handleAnswer(2, 0)}
                            >
                                “어.. 그 것도 괜찮은데<br></br>
                                다른 게 더 잘 어울릴 것 같은데??”
                            </button>
                            <button
                                className={getButtonStyle(2, 1)}
                                onClick={() => handleAnswer(2, 1)}
                            >
                                “오.. 나였으면 다른 거 산다 ㅋㅋㅋㅋ”
                            </button>
                        </div>
                        <div className={styles.arrowContainer} onClick={() => setStep(4)}>
                            <div>다음으로</div>
                            <img src={Arrow} className={styles.flippedArrow} />
                        </div>
                    </div>
                </div>}
            {step === 4 &&
                <div className={styles.mainContainer}>
                    <div className={styles.mainText}>
                        4. 팝업스토어 체험 부스에서 신기한 경험을 했다.<br></br>
                        이 때 드는 생각은?
                    </div>
                    <div className={styles.testAnswer}>
                        <div className={styles.arrowContainer} onClick={() => setStep(3)}>
                            <img src={Arrow} />
                            <div>이전으로</div>
                        </div>
                        <div className={styles.optionButtons}>
                            <button
                                className={getButtonStyle(3, 0)}
                                onClick={() => handleAnswer(3, 0)}
                            >
                                '우와.. 이런 건 어떻게 만드는 거지?<br></br>
                                누가 만든 거지? 신기하다!'
                            </button>
                            <button
                                className={getButtonStyle(3, 1)}
                                onClick={() => handleAnswer(3, 1)}
                            >
                                '우와 신기하다!'
                            </button>
                        </div>
                        <div className={styles.arrowContainer} onClick={() => setStep(5)}>
                            <div>다음으로</div>
                            <img src={Arrow} className={styles.flippedArrow} />
                        </div>
                    </div>
                </div>}
            {step === 5 &&
                <div className={styles.iconContainer}>
                    <img src={Icon} className={styles.animatedIcon} />
                </div>
            }
             {step === 6 &&
                <div>
                    캐릭터 선택페이지, 아예 페이지로 넘아가게 구현하겠음
                    그 캐릭터 창 틀은 그림으로 따고
                    배경색은 캐릭터에 따라 바꾸게,아래 그림도
                </div>
            }
        </div>
    );
}
